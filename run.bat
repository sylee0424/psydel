for /f "tokens=1,2,3 delims=_" %%i in ('dir /a:-d /o:n /b') do (
if exist %%i\%%j\ (
move "%%i_%%j_%%k" "%%i\%%j\%%k"
) else (

md %%i\%%j

move "%%i_%%j_%%k" "%%i\%%j\%%k"

) 



)