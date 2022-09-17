package server

import (
	"fmt"
	"strings"
	"syscall"

	"golang.org/x/sys/windows"
)

// hostname tries to get the full qualified domain name of the current machine
// copied from x/sys/windows with the change to get the full physical FQDN.
func resolveFQDN() (name string, err error) {
	const format = windows.ComputerNamePhysicalDnsFullyQualified

	n := uint32(128)
	for {
		b := make([]uint16, n)
		err := windows.GetComputerNameEx(format, &b[0], &n)
		if err == nil {
			return strings.ToLower(syscall.UTF16ToString(b[:n])), nil
		}
		if err != syscall.ERROR_MORE_DATA {
			return "", fmt.Errorf("ComputerNameEx: %s", err)
		}

		// If we received an ERROR_MORE_DATA, but n doesn't get larger,
		// something has gone wrong and we may be in an infinite loop
		if n <= uint32(len(b)) {
			return "", fmt.Errorf("ComputerNameEx: %s", err)
		}
	}
}
