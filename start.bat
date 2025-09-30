@echo off
REM ===============================
REM Start both API and Client
REM ===============================

echo Starting Charity Events Project...

REM 启动 API
cd SitongChengA2-api
start cmd /k "npm install && npm run start"

REM 启动静态客户端（用简单 http-server，如果有安装）
cd ..\SitongChengA2-clientside
if exist node_modules (
    start cmd /k "npx http-server -p 8080"
) else (
    echo To serve client, run: npm install -g http-server
    echo Then: cd SitongChengA2-clientside && http-server -p 8080
)

pause
