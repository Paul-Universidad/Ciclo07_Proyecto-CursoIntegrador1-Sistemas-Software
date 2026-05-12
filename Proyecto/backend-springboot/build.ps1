# Compila e instala en el repositorio local Maven (.m2). No requiere mvn en PATH.
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
& .\mvnw.cmd @("clean", "install")
