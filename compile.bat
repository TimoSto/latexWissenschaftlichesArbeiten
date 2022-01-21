SET PROJECTNAME=

IF "%1" == "--cleanup" "../../Wa_LaTeX.exe" cleanupCites %PROJECTNAME%

SET FILE="%PROJECTNAME%.tex"

echo %FILE%