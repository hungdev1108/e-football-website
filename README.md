# EFOOTBALL Store

Chuyên bán tài khoản game EFOOTBALL chất lượng cao, giá tốt nhất thị trường. Website được xây dựng với Next.js 15.x và các công nghệ hiện đại nhất.

## 🚀 Công nghệ sử dụng

- **Framework**: Next.js 15.x (App Router)
- **Language**: TypeScript
- **UI Framework**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation  
- **HTTP Client**: Axios
- **API Cache**: TanStack Query (React Query)
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── api/               # API Routes (TODO)
│   │   ├── auth/          # Authentication endpoints
│   │   ├── accounts/      # Game accounts endpoints
│   │   ├── orders/        # Orders management
│   │   ├── payments/      # Payment processing
│   │   └── admin/         # Admin endpoints
│   ├── auth/              # Authentication pages ✅
│   │   ├── login/         # Login page ✅
│   │   └── register/      # Register page ✅
│   ├── admin/             # Admin dashboard (TODO)
│   ├── search/            # Search functionality ✅
│   ├── account/           # Account details (TODO)
│   ├── cart/              # Shopping cart ✅
│   ├── checkout/          # Checkout process (TODO)
│   ├── profile/           # User profile (TODO)
│   └── contact/           # Contact page ✅
├── components/            # React Components
│   ├── ui/                # shadcn/ui components ✅
│   ├── layout/            # Layout components ✅
│   ├── common/            # Common/shared components (TODO)
│   ├── auth/              # Authentication components (TODO)
│   ├── account/           # Account-related components (TODO)
│   ├── search/            # Search components (TODO)
│   ├── cart/              # Cart components (TODO)
│   ├── admin/             # Admin components (TODO)
│   └── forms/             # Form components (TODO)
├── hooks/                 # Custom React hooks (TODO)
├── store/                 # Zustand stores ✅
├── services/              # API services ✅
├── types/                 # TypeScript types ✅
├── utils/                 # Utility functions ✅
├── constants/             # App constants (TODO)
├── config/                # Configuration files ✅
└── lib/                   # Third-party library configs ✅
```

## ✅ Tính năng đã hoàn thành

### UI/UX
- ✅ **Trang chủ** - Landing page với hero section, features, categories
- ✅ **Authentication** - Login/Register pages với form validation
- ✅ **Tìm kiếm** - Search page với filters, sorting, pagination
- ✅ **Giỏ hàng** - Cart page với item management, pricing
- ✅ **Liên hệ** - Contact page với form và FAQ
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark/Light Mode Support** - Tailwind CSS theming

### Technical
- ✅ **TypeScript Setup** - Strict typing cho toàn bộ project
- ✅ **shadcn/ui Components** - Button, Card, Input, Select, etc.
- ✅ **State Management** - Zustand stores cho auth và cart
- ✅ **API Layer** - Axios với interceptors và error handling
- ✅ **Form Handling** - React Hook Form integration
- ✅ **Notifications** - React Hot Toast
- ✅ **Build System** - Next.js 15 với App Router

## 🔧 Cài đặt và chạy project

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn hoặc pnpm

### Cài đặt dependencies

```bash
npm install
```

### Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

### Build production

```bash
npm run build
npm start
```

## 🔧 Cấu hình

### Environment Variables

Tạo file `.env.local` trong thư mục gốc:

```env
# App Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database
DATABASE_URL="your-database-url"

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Payment Gateways
MOMO_PARTNER_CODE=your-momo-partner-code
MOMO_ACCESS_KEY=your-momo-access-key
MOMO_SECRET_KEY=your-momo-secret-key

VNPAY_TMN_CODE=your-vnpay-tmn-code
VNPAY_HASH_SECRET=your-vnpay-hash-secret

# File Upload
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret

# Email Service
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
```

## 📱 Tính năng hiện tại

### Cho người dùng:
- 🔍 **Tìm kiếm và lọc** tài khoản game theo nhiều tiêu chí
- 🛒 **Giỏ hàng** với quản lý số lượng và tính toán giá
- 📱 **Responsive** tối ưu cho mobile
- 🔐 **Authentication UI** sẵn sàng tích hợp API
- 📧 **Contact form** với validation
- ⭐ **Modern UI** với shadcn/ui components

### Cho admin (TODO):
- 📊 **Dashboard** thống kê chi tiết
- 👥 **Quản lý người dùng** và phân quyền
- 🎮 **Quản lý tài khoản game** (CRUD)
- 📦 **Quản lý đơn hàng** và trạng thái
- 💰 **Báo cáo doanh thu** theo thời gian

## 🎨 Design System

Project sử dụng **shadcn/ui** với Tailwind CSS để đảm bảo:
- ✅ **Consistent** UI/UX across toàn bộ app
- ✅ **Accessible** components (WCAG standards)
- ✅ **Dark/Light mode** support
- ✅ **Mobile-first** responsive design
- ✅ **Performance** tối ưu

## 🚀 Performance Optimization

- ⚡ **Static Generation** với Next.js App Router
- 🖼️ **Image Optimization** với Next.js Image (TODO)
- 📦 **Code Splitting** tự động
- 🗄️ **API Caching** với TanStack Query
- 🔄 **Background Sync** cho real-time updates
- 📱 **PWA Ready** (có thể thêm sau)

## 🧪 Testing

```bash
# Unit tests với Jest (TODO)
npm run test

# E2E tests với Playwright (TODO)
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📖 API Documentation

API endpoints sẽ được document đầy đủ tại `/api-docs` khi backend hoàn thành.

### Endpoint examples (TODO):
- `GET /api/accounts` - Lấy danh sách tài khoản
- `POST /api/auth/login` - Đăng nhập
- `POST /api/orders` - Tạo đơn hàng mới
- `GET /api/admin/stats` - Thống kê admin

## 🔒 Security

- 🛡️ **CSRF Protection** built-in với Next.js
- 🔐 **JWT Authentication** sẵn sàng tích hợp
- 🔒 **Input Validation** với Zod schemas
- 🚨 **Rate Limiting** cho API endpoints (TODO)
- 📝 **Audit Logs** cho admin actions (TODO)

## 🌟 Roadmap

### Phase 1 (Hiện tại - UI Complete)
- [x] Project setup và cấu trúc cơ bản
- [x] Authentication UI (Login/Register)
- [x] Search page với filters
- [x] Shopping cart UI
- [x] Contact page

### Phase 2 (Tiếp theo - Backend Integration)
- [ ] API endpoints implementation
- [ ] Database schema và models
- [ ] Authentication system
- [ ] Payment integration
- [ ] Order management

### Phase 3 (Advanced Features)
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Advanced search
- [ ] User reviews và ratings
- [ ] Wishlist functionality

### Phase 4 (Optimization)
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Analytics integration
- [ ] Mobile app (React Native)
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- 📧 Email: support@efootball-store.com
- 💬 Discord: [Join our server](https://discord.gg/efootball-store)
- 📱 Hotline: +84 xxx xxx xxx

---

**Built with ❤️ by EFOOTBALL Store Team**

## 🎯 Current Status

**UI Development: ✅ COMPLETE**
- Tất cả UI pages đã hoàn thành
- Components system đã setup
- TypeScript errors đã fix
- Build thành công

**Next Steps:**
1. **Backend API Development** - Implement REST APIs
2. **Database Integration** - Setup Prisma/Drizzle với PostgreSQL
3. **Authentication** - Integrate NextAuth.js
4. **Payment Gateway** - Integrate MoMo, VNPay, ZaloPay
5. **Admin Dashboard** - Build admin interface

**Ready for API Integration! 🚀**
