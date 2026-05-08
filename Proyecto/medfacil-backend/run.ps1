# Arranca Spring Boot (puerto 8080 por defecto). No requiere mvn en PATH.
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
& .\mvnw.cmd @("spring-boot:run")
