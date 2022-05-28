@echo off



set proj=%1

set FilePath="./projects/%proj%/%proj%.tex"

echo "Kompiliere Datei %FilePath%"

pdflatex -halt-on-error  -output-directory ./projects/%proj% ./projects/%proj%/%proj%.tex

echo "%ERRORLEVEL%"

if "%ERRORLEVEL%"=="1" EXIT /B 1
