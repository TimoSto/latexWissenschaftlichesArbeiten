@echo off
IF "%1"=="dev" (
    echo "build dev..."
    set GOOS=windows
    go build -tags dev -o WA_LaTeX.exe ./src/cmd
) ELSE (
    echo "build prod..."
    go generate ./...
    set GOOS=windows
    go build -o WA_LaTeX.exe ./src/cmd
    set GOOS=linux
    go build -o WA_LaTeX ./src/cmd
)
echo "success"