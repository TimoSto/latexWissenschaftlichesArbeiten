@echo off
IF "%1"=="dev" (
    echo "build dev..."
    go build -tags dev -o WA_LaTeX.exe ./src/cmd
) ELSE (
    echo "build prod..."
    go generate ./...
    go build -o WA_LaTeX.exe ./src/cmd
)
echo "success"