package server

import (
	"context"
	"crypto/tls"
	"fmt"
	"net"
	"net/http"
	"time"

	"WA_LaTeX/pkg/cert"
	"WA_LaTeX/pkg/logger"
)

type Config struct {
	Port      int
	Handler   http.Handler
	IsSecure  bool
	TLSConfig *tls.Config
}

// New returns an unstarted server.
func New(c *Config) (*Server, error) {
	if err := validateServerPort(c.Port); err != nil {
		return nil, err
	}
	// TODO(aweb): use the tls.config to determine the hostname/fqdn under which
	// the server will be started
	var fqdn string
	fqdn, err := resolveFQDN()
	if err != nil {
		return nil, err
	}

	if c.IsSecure && c.TLSConfig == nil {
		selfsignedCert := cert.NewSelfsignedCert(fqdn)
		c.TLSConfig = &tls.Config{
			MinVersion:   tls.VersionTLS12,
			Certificates: []tls.Certificate{selfsignedCert.TLS()},
		}
	}
	return &Server{
		fqdn:  fqdn,
		port:  fmt.Sprintf("%v", c.Port),
		https: c.IsSecure,
		srv: &http.Server{
			Handler:      c.Handler,
			TLSConfig:    c.TLSConfig,
			ReadTimeout:  60 * time.Second,
			WriteTimeout: 60 * time.Second,
		},
	}, nil
}

// Server returns an unstarted server which can serve http or https
type Server struct {
	fqdn string
	port string

	https bool // if true and srv.TLSConfig is unset, a self-signed cert will be issued
	srv   *http.Server

	srvURI string // will be set after server is started
}

// Start starts the server s.
// If s.srv.TLSConfig is not set, it will start an unsecure http server.
func (s *Server) Start(ctx context.Context, fin chan bool) {
	// We listen on all available networks (IPv4 and IPv6)
	socket, err := net.Listen("tcp", "0.0.0.0:"+s.port)
	if err != nil {
		panic(fmt.Sprintf("server: could not bind to socket (fqdn: %v, port: %v)", s.fqdn, s.port))
	}

	if s.srv.TLSConfig == nil {
		// start http server
		go func() {
			err := s.srv.Serve(socket)
			if err != nil {
				if err != http.ErrServerClosed {
					logger.LogError("http server has been closed unexpectedly: ", err.Error())
				}
				fin <- true
			}
		}()
	} else {
		// start https server, instead of cert- and keyFile, TLSConfig will be used
		go func() {
			err := s.srv.ServeTLS(socket, "", "")
			if err != nil {
				if err != http.ErrServerClosed {
					logger.LogError("http server has been closed unexpectedly: ", err.Error())
				}
				fin <- true
			}
		}()
	}
	go func() {
		select {
		case <-ctx.Done():
			if err := s.srv.Shutdown(context.Background()); err != nil {
				logger.LogError("http server could not be stopped: ", err.Error())
			}
			fin <- true
		}
	}()

	_, port, _ := net.SplitHostPort(socket.Addr().String())
	scheme := "http"
	if s.https {
		scheme = "https"
	}
	srvURI := fmt.Sprintf("%v://%v:%v", scheme, s.fqdn, port)
	s.srvURI = srvURI
}

// URL returns the uri of the (running?!) server
func (s *Server) URL() string {
	return s.srvURI
}

func validateServerPort(port int) error {
	if port < 0 || port > 65535 {
		return fmt.Errorf("server port out of range 0-65535: got %v", port)
	}
	return nil
}
