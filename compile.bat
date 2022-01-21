@echo off

SET PROJECTNAME=MY_PROJECT_NAME

IF "%1" == "--cleanup" cd ../../ & "Wa_LaTeX.exe" cleanupCites %PROJECTNAME% & cd "./projects/%PROJECTNAME%/"

SET FILE="%PROJECTNAME%.tex"

echo %FILE%

pdflatex %FILE%