@echo off
chcp 65001 >nul
title Burger Guys - برگر گایز

echo ========================================================
echo         🍔 BURGER GUYS — برگر گایز اردبیل 🍔
echo            طعمی خارج از ماتریکس
echo ========================================================
echo.

cd /d "%~dp0"

where npm >nul 2>nul
if %errorlevel% equ 0 (
    echo [✓] Node.js و npm شناسایی شد.
    if not exist node_modules (
        echo [i] در حال نصب بسته‌ها و پیش‌نیازها...
        call npm install
    )
    echo [i] در حال اجرای سرور سایت و باز کردن در مرورگر...
    echo.
    call npm run dev -- --open
    goto end
)

where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [!] Node.js یافت نشد، اما Python در دسترس است.
    echo [i] در حال اجرای نسخه ساخته‌شده (dist) روی پورت 8080...
    start http://localhost:8080
    python -m http.server 8080 --directory dist
    goto end
)

echo [X] برای اجرای پروژه، لطفاً Node.js را از آدرس زیر نصب کنید:
echo     https://nodejs.org
echo.
pause

:end
