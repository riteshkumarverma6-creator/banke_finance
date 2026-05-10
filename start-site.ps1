$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

Write-Host "Starting local website at http://localhost:8000"
Write-Host "Press Ctrl+C to stop the server."

python -m http.server 8000
