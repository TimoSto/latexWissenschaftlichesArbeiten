#!/bin/sh

cd ./cmd/app

echo "build prod..."
set GOOS=windows
set GOARCH=amd64
echo "building windows..."
go build -o ../../out/windows/ThesorTeX.exe
set GOOS=linux
echo "building linux..."
go build -o ../../out/linux/Thesor_TeX
set GOOS=darwin
echo "building macOS amd64..."
go build -o ../../out/macOS_amd64/Thesor_TeX
set GOARCH=arm64
echo "building macOS arm64..."
go build -o ../../out/macOS_arm64/Thesor_TeX

echo "success"