@echo off

SET PROJECTNAME=example

IF "%1" == "--cleanup" cd ../../ & "Wa_LaTeX.exe" cleanupCites %PROJECTNAME% & cd "./projects/%PROJECTNAME%/"

SET FILE="%PROJECTNAME%.tex"

echo %FILE%

pdflatex %FILE%
