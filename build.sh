#!/bin/sh

if [ "$1" == "dev" ]
then
    echo "build dev..."
    set GOOS=windows
    go build -tags dev -o WA_LaTeX.exe ./src/cmd
elif [ "$1" == "beta" ]
  then
  echo "build beta..."
  go generate ./...
  set GOOS=windows
  go build -o WA_LaTeX-beta.exe ./src/cmd
else
    echo "build prod..."
    go generate ./...
    set GOOS=windows
    go build -o WA_LaTeX.exe ./src/cmd
    set GOOS=linux
    go build -o WA_LaTeX ./src/cmd
fi
echo "success"