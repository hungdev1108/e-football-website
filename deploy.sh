#!/bin/bash
set -e

echo "🚀 [Deploy] Bắt đầu deploy Frontend eFootball..."

echo "📥 1. Kéo code mới nhất từ nhánh NewUI..."
git pull origin NewUI

echo "📦 2. Kiểm tra dependencies..."
npm install

echo "🏗️ 3. Build Next.js..."
npm run build

echo "🔄 4. Khởi động lại service PM2..."
pm2 restart efootball-web

echo "✅ 5. Hoàn tất deploy!"
pm2 status efootball-web
