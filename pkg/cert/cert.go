package cert

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/tls"
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"io/ioutil"
	"math/big"
	"net"
	"os"
	"path/filepath"
	"time"
)

const (
	keyFilename  = "cert.key"
	certFilename = "cert.pem"

	certValidFor     = 3600 * 24 * 365 * 1 * time.Second // 1 year
	certOrganization = "ThesorTex"
	privateKeyLength = 2048
)

var timeNow = time.Now // timeNow will be overwritten for testing

// NewRSAPrivateKey creates a new RSA PrivateKey with a length of 2048 bit.
func newRSAPrivateKey() (*rsa.PrivateKey, error) {
	key, err := rsa.GenerateKey(rand.Reader, privateKeyLength)
	if err != nil {
		return nil, fmt.Errorf("cert: could not generate private key: %v", err)
	}
	return key, nil
}

// NewSelfsignedCert creates a new self-signed certificate with the
// subject alternative name set to the hostname. If hostname is an ip address
// the corresponding field will be set.
// NewSelfsignedCert panics.
func NewSelfsignedCert(hostname string) *CertPair {
	if hostname == "" {
		panic("cert: empty hostname")
	}

	certTmpl := x509.Certificate{
		IsCA: true,
		//Subject: pkix.Name{
		//	Organization: []string{certOrganization},
		//},

		SerialNumber:       big.NewInt(time.Now().UnixNano()),
		SignatureAlgorithm: x509.SHA256WithRSA,

		NotBefore: time.Now(),
		// And test at start if certificate is still valid, otherwise renew?
		NotAfter:              time.Now().Add(certValidFor),
		ExtKeyUsage:           []x509.ExtKeyUsage{x509.ExtKeyUsageServerAuth, x509.ExtKeyUsageClientAuth},
		KeyUsage:              x509.KeyUsageCertSign | x509.KeyUsageDigitalSignature,
		BasicConstraintsValid: true,
	}

	if ip := net.ParseIP(hostname); ip != nil {
		certTmpl.IPAddresses = []net.IP{ip}
	} else {
		certTmpl.DNSNames = []string{hostname}
	}

	privKey, err := newRSAPrivateKey()
	if err != nil {
		panic(err)
	}

	certDER, err := x509.CreateCertificate(rand.Reader, &certTmpl, &certTmpl, &privKey.PublicKey, privKey)
	if err != nil {
		panic(fmt.Sprintf("cert: could not create x509 certificate: %v", err))
	}

	certPEM := pem.EncodeToMemory(&pem.Block{Type: "CERTIFICATE", Bytes: certDER})
	if certPEM == nil {
		panic("cert: could not encode certificate")
	}
	keyPEM := pem.EncodeToMemory(&pem.Block{Type: "RSA PRIVATE KEY", Bytes: x509.MarshalPKCS1PrivateKey(privKey)})
	if keyPEM == nil {
		panic("cert: could not encode key")
	}

	return &CertPair{
		privateKey: keyPEM,
		publicCert: certPEM,
	}
}

type CertPair struct {
	privateKey []byte // stored in PEM format
	publicCert []byte // stored in PEM format
}

// Store saves the private and public key/cert into the given directory dir.
// An error is returned if dir is no directory and/or if the files can't be saved.
func (c *CertPair) Store(dir string) error {
	keyFile := filepath.Join(dir, keyFilename)
	certFile := filepath.Join(dir, certFilename)

	if err := writeFile(keyFile, c.privateKey); err != nil {
		return err
	}
	if err := writeFile(certFile, c.publicCert); err != nil {
		return err
	}
	return nil
}

func writeFile(filename string, b []byte) error {
	f, err := os.OpenFile(filename, os.O_RDWR|os.O_CREATE|os.O_EXCL, 0400)
	if err != nil {
		return err
	}
	defer f.Close()
	if _, err := f.Write(b); err != nil {
		return err
	}
	return nil
}

func loadFromFile(filename string, pemType string) ([]byte, error) {
	b, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	// sanity check if file is valid pem format
	p, _ := pem.Decode(b)
	if p == nil || p.Type != pemType {
		return nil, fmt.Errorf("cert: could not decode file %v", filename)
	}
	return b, nil
}

const (
	pemKey  = "RSA PRIVATE KEY"
	pemCert = "CERTIFICATE"
)

// Load loads the private and public key/cert from the given directory dir.
// An error is returned if dir is no directory and/or if the files can't be opened.
func (c *CertPair) Load(dir string) error {
	key, err := loadFromFile(filepath.Join(dir, keyFilename), pemKey)
	if err != nil {
		return fmt.Errorf("cert: could not load key from dir %v: %v", dir, err)
	}
	cert, err := loadFromFile(filepath.Join(dir, certFilename), pemCert)
	if err != nil {
		return fmt.Errorf("cert: could not load cert from dir %v: %v", dir, err)
	}
	c.privateKey = key
	c.publicCert = cert
	return nil
}

// Valid checks if the certificate is still valid.
// The current implementation checks only the valid before and after fields.
func (c *CertPair) Valid() (bool, error) {
	p, _ := pem.Decode(c.publicCert)
	if p == nil {
		// invalid cert stored, should not happen
		panic("cert: invalid certificate, could not decode")
	}
	cert, err := x509.ParseCertificate(p.Bytes)
	if err != nil {
		// invalid cert stored, should not happen
		panic("cert: invalid certificate, could not parse")
	}
	if timeNow().After(cert.NotAfter) {
		return false, fmt.Errorf("cert: certificate is not valid after %v", cert.NotAfter)
	}
	if timeNow().Before(cert.NotBefore) {
		return false, fmt.Errorf("cert: certificate is not valid before %v", cert.NotBefore)
	}
	return true, nil
}

// Key returns the private key of c
func (c *CertPair) Key() []byte {
	return c.privateKey
}

// Cert returns the public key (certificate) of c
func (c *CertPair) Cert() []byte {
	return c.publicCert
}

func (c *CertPair) TLS() tls.Certificate {
	cert, err := tls.X509KeyPair(c.publicCert, c.privateKey)
	if err != nil {
		// should not happen
		panic("cert: could not create tls certificate")
	}
	return cert
}
