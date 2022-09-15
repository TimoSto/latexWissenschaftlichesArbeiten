#!/bin/sh

cd ./cmd/app

if [ "$1" == "dev" ]
then
    echo "build dev..."
    set GOOS=windows
    go build -tags dev -o ../../WA_LaTeX.exe
else
    echo "build prod..."
    go generate ./...
    set GOOS=windows
    go build -o ../../WA_LaTeX.exe
    set GOOS=linux
    go build -o ../../WA_LaTeX
fi
echo "success"