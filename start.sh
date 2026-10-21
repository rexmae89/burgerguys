#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

echo "========================================================"
echo "        🍔 BURGER GUYS — برگر گایز اردبیل 🍔"
echo "           طعمی خارج از ماتریکس"
echo "========================================================"
echo ""

if command -v npm >/dev/null 2>&1; then
    if [ ! -d "node_modules" ]; then
        echo "[i] در حال نصب بسته‌ها..."
        npm install
    fi
    echo "[i] در حال اجرای سرور توسعه برگر گایز..."
    npm run dev -- --open
elif command -v python3 >/dev/null 2>&1; then
    echo "[i] اجرای نسخه dist با Python..."
    python3 -m http.server 8080 --directory dist
elif command -v python >/dev/null 2>&1; then
    echo "[i] اجرای نسخه dist با Python..."
    python -m http.server 8080 --directory dist
else
    echo "[X] لطفاً Node.js را نصب کنید: https://nodejs.org"
    exit 1
fi
