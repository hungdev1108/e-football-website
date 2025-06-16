# SystemSettings - Hướng Dẫn Sử Dụng Frontend

## 🎯 Tổng Quan

SystemSettings là hệ thống quản lý cài đặt website bao gồm logo, banner, thông tin liên hệ, mạng xã hội và thanh toán.

## 📁 Cấu Trúc Files

```
src/
├── hooks/
│   ├── useAdminSystem.ts    # Hooks cho admin dashboard
│   └── useSystem.ts         # Hooks cho frontend public
├── types/
│   └── admin.ts            # Type definitions
└── app/admin/system/
    └── page.tsx            # Trang quản lý admin
```

## 🔧 Hooks Sử Dụng

### Cho Frontend Public (Không cần token)

```typescript
import { 
  useSystemSettings,
  useSystemLogo, 
  useSystemBanners,
  useHeaderData,
  useFooterData,
  useHomeBanners,
  usePaymentInfo
} from '@/hooks/useSystem';

// 1. Header Component
function Header() {
  const { logo, siteName, isLoading } = useHeaderData();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <header>
      <img src={logo?.url} alt={logo?.alt} />
      <h1>{siteName}</h1>
    </header>
  );
}

// 2. Footer Component
function Footer() {
  const { contactInfo, socialMedia, isLoading } = useFooterData();
  
  return (
    <footer>
      <div>
        <p>📞 {contactInfo?.phone}</p>
        <p>📧 {contactInfo?.email}</p>
        <p>📍 {contactInfo?.address}</p>
      </div>
      <div>
        <a href={socialMedia?.facebook}>Facebook</a>
        <a href={socialMedia?.telegram}>Telegram</a>
        <a href={socialMedia?.zalo}>Zalo</a>
      </div>
    </footer>
  );
}

// 3. Banner Carousel
function BannerCarousel() {
  const { banners, isLoading } = useHomeBanners();
  
  return (
    <div className="carousel">
      {banners.map(banner => (
        <div key={banner._id}>
          <img src={banner.image} alt={banner.title} />
          <h3>{banner.title}</h3>
          <p>{banner.description}</p>
          {banner.link && <a href={banner.link}>Xem thêm</a>}
        </div>
      ))}
    </div>
  );
}

// 4. Payment QR Code
function PaymentQR() {
  const { bankingInfo, qrCodeImage, isLoading } = usePaymentInfo();
  
  return (
    <div>
      <h3>Thông tin thanh toán</h3>
      <p>Ngân hàng: {bankingInfo?.bankName}</p>
      <p>Số TK: {bankingInfo?.accountNumber}</p>
      <p>Chủ TK: {bankingInfo?.accountHolder}</p>
      {qrCodeImage && (
        <img src={qrCodeImage.url} alt={qrCodeImage.alt} />
      )}
    </div>
  );
}
```

### Cho Admin Dashboard (Cần admin token)

```typescript
import { 
  useAdminSystemSettings,
  useUpdateSystemSettings,
  useUpdateLogo,
  useUpdateQRCode,
  useUploadBanners
} from '@/hooks/useAdminSystem';

// Admin Settings Form
function AdminSettings() {
  const { data: settings } = useAdminSystemSettings();
  const updateSettings = useUpdateSystemSettings();
  const updateLogo = useUpdateLogo();
  const updateQR = useUpdateQRCode();
  
  const handleSaveSettings = (data) => {
    updateSettings.mutate(data);
  };
  
  const handleLogoUpload = (file: File) => {
    updateLogo.mutate(file);
  };
  
  const handleQRUpload = (file: File) => {
    updateQR.mutate(file);
  };
  
  return (
    <form onSubmit={handleSaveSettings}>
      {/* Form fields */}
    </form>
  );
}
```

## 📊 Cấu Trúc Dữ Liệu

### SystemSettings Response
```typescript
{
  success: true,
  data: {
    siteName: "eFootball Account Store",
    siteDescription: "Chuyên bán tài khoản eFootball",
    logo: {
      url: "http://localhost:3000/uploads/systems/logo-123.webp",
      alt: "Website Logo"
    },
    bannerImages: [
      {
        _id: "banner_id",
        title: "Khuyến mãi 50%",
        image: "http://localhost:3000/uploads/systems/banner-456.webp",
        link: "https://example.com/promotion",
        order: 0,
        isActive: true
      }
    ],
    contactInfo: {
      phone: "0123456789",
      email: "contact@example.com",
      address: "123 Đường ABC, Quận XYZ"
    },
    socialMedia: {
      facebook: "https://facebook.com/page",
      telegram: "https://t.me/channel",
      zalo: "https://zalo.me/contact",
      youtube: "https://youtube.com/channel"
    },
    bankingInfo: {
      bankName: "Vietcombank",
      accountNumber: "1234567890",
      accountHolder: "NGUYEN VAN A",
      qrCodeImage: {
        url: "http://localhost:3000/uploads/systems/qr-789.webp",
        alt: "QR Code thanh toán"
      }
    },
    features: {
      enableRegistration: true,
      enableCart: true,
      enableReviews: true,
      maintenanceMode: false
    }
  }
}
```

## 🌐 API Endpoints

### Public Endpoints (Không cần token)
- `GET /api/system/settings/public` - Tất cả cài đặt công khai
- `GET /api/system/logo` - Chỉ logo
- `GET /api/system/banners` - Chỉ banner active

### Admin Endpoints (Cần admin token)
- `GET /api/system/settings` - Tất cả cài đặt (admin)
- `PUT /api/system/settings` - Cập nhật cài đặt
- `PUT /api/system/logo` - Upload logo (FormData)
- `PUT /api/system/qr-code` - Upload QR code (FormData)
- `POST /api/system/banners/upload` - Upload banners (FormData)
- `DELETE /api/system/banners/settings/{id}` - Xóa banner

## ⚠️ Lưu Ý Quan Trọng

1. **Public API**: Không cần Authorization header
2. **Admin API**: Cần `Authorization: Bearer {admin_token}`
3. **File Upload**: Sử dụng `multipart/form-data`
4. **Settings Update**: Sử dụng `application/json`
5. **File Size**: Giới hạn 5MB, chỉ chấp nhận ảnh
6. **Error Handling**: Luôn check `response.success` trước khi xử lý data

## 🔄 Cache Strategy

- **Logo**: 1 giờ (ít thay đổi)
- **Settings**: 30 phút
- **Banners**: 10 phút (thay đổi thường xuyên)
- **Auto invalidate**: Khi có update từ admin

## 🎨 UI Components Gợi Ý

```typescript
// Loading State
if (isLoading) {
  return <Skeleton className="w-full h-32" />;
}

// Error State
if (error) {
  return <div className="text-red-500">Không thể tải dữ liệu</div>;
}

// Empty State
if (!data || data.length === 0) {
  return <div className="text-gray-500">Chưa có dữ liệu</div>;
}
```