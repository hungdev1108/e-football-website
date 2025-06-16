# Backend Integration Guide - SystemSettings

## 🚨 Current Status: 404 Errors

The frontend is currently experiencing 404 errors because the backend API endpoints haven't been implemented yet. This guide explains the temporary solutions and what needs to be done.

## 🔧 Temporary Solutions Implemented

### Error Handling with Mock Data
I've added error handling to all SystemSettings API calls that return mock data when encountering 404 errors:

```typescript
// Example in useAdminSystem.ts
try {
  const response = await api.get('/system/settings');
  return response.data;
} catch (error: any) {
  if (error.response?.status === 404) {
    // Return mock data until backend is ready
    return mockData;
  }
  throw error;
}
```

### Mock Data Provided For:
- ✅ System Settings (`/api/system/settings`)
- ✅ Admin Banners (`/api/system/banners/admin`)
- ✅ QR Code Upload (`/api/system/qr-code`)
- ✅ Settings Update (`PUT /api/system/settings`)

## 📋 Backend Endpoints That Need Implementation

### 1. System Settings Endpoints

#### GET `/api/system/settings` (Admin)
```json
{
  "success": true,
  "data": {
    "siteName": "eFootball Account Store",
    "siteDescription": "Chuyên bán tài khoản eFootball",
    "siteKeywords": "efootball, account, game",
    "siteUrl": "http://localhost:3000",
    "logo": {
      "url": "http://localhost:5002/uploads/logo.jpg",
      "alt": "Website Logo"
    },
    "contactInfo": {
      "phone": "0123456789",
      "email": "contact@example.com",
      "address": "123 Đường ABC"
    },
    "socialMedia": {
      "facebook": "https://facebook.com/page",
      "telegram": "https://t.me/channel",
      "zalo": "https://zalo.me/contact",
      "youtube": "https://youtube.com/channel"
    },
    "bankingInfo": {
      "bankName": "Vietcombank",
      "accountNumber": "1234567890",
      "accountHolder": "NGUYEN VAN A",
      "qrCodeImage": {
        "url": "http://localhost:5002/uploads/qr-code.jpg",
        "alt": "QR Code thanh toán"
      }
    },
    "features": {
      "enableRegistration": true,
      "enableCart": true,
      "enableReviews": true,
      "maintenanceMode": false
    }
  }
}
```

#### PUT `/api/system/settings` (Admin)
**Request Body:**
```json
{
  "siteName": "New Site Name",
  "siteDescription": "New Description",
  "contactInfo": {
    "phone": "0987654321",
    "email": "new@example.com",
    "address": "New Address"
  },
  "socialMedia": {
    "facebook": "https://facebook.com/newpage"
  },
  "bankingInfo": {
    "bankName": "New Bank",
    "accountNumber": "0987654321",
    "accountHolder": "NEW HOLDER"
  }
}
```

### 2. Public Endpoints (No Auth Required)

#### GET `/api/system/settings/public`
Same structure as admin endpoint but only public data

#### GET `/api/system/logo`
```json
{
  "success": true,
  "data": {
    "url": "http://localhost:5002/uploads/logo.jpg",
    "alt": "Website Logo"
  }
}
```

#### GET `/api/system/banners`
```json
{
  "success": true,
  "data": [
    {
      "_id": "banner_id",
      "title": "Banner Title",
      "image": "http://localhost:5002/uploads/banner.jpg",
      "link": "https://example.com",
      "order": 0,
      "isActive": true
    }
  ]
}
```

### 3. File Upload Endpoints

#### PUT `/api/system/logo` (Admin, FormData)
**Request:** `multipart/form-data` with `logo` field
**Response:**
```json
{
  "success": true,
  "data": {
    "url": "http://localhost:5002/uploads/logo-new.jpg",
    "alt": "Website Logo"
  }
}
```

#### PUT `/api/system/qr-code` (Admin, FormData)
**Request:** `multipart/form-data` with `qrCode` field
**Response:**
```json
{
  "success": true,
  "data": {
    "url": "http://localhost:5002/uploads/qr-code-new.jpg",
    "alt": "QR Code thanh toán"
  }
}
```

### 4. Banner Management Endpoints

#### GET `/api/system/banners/admin` (Admin)
```json
{
  "success": true,
  "data": [
    {
      "_id": "banner_id",
      "title": "Banner Title",
      "description": "Banner Description",
      "image": "http://localhost:5002/uploads/banner.jpg",
      "link": "https://example.com",
      "order": 0,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST `/api/system/banners/upload` (Admin, FormData)
**Request:** `multipart/form-data` with multiple `banners` fields

#### DELETE `/api/system/banners/settings/{id}` (Admin)
**Response:**
```json
{
  "success": true,
  "message": "Banner deleted successfully"
}
```

## 🔐 Authentication Requirements

### Admin Endpoints
- Require `Authorization: Bearer {admin_token}` header
- Token should be validated on backend
- Return 401 if token is invalid/expired
- Return 403 if user is not admin

### Public Endpoints
- No authentication required
- Can be cached for better performance

## 📁 File Upload Requirements

### Supported Formats
- Images: JPG, JPEG, PNG, WEBP
- Max size: 5MB per file
- For logos: Recommend square aspect ratio
- For banners: Recommend 16:9 aspect ratio
- For QR codes: Square aspect ratio

### File Storage
- Store in `/uploads/systems/` directory
- Generate unique filenames to prevent conflicts
- Return full URL in responses
- Implement file cleanup for replaced files

## 🚀 When Backend is Ready

### 1. Remove Mock Data
Once backend endpoints are implemented, remove the 404 error handling:

```typescript
// Remove this block from all functions
catch (error: any) {
  if (error.response?.status === 404) {
    return mockData; // Remove this
  }
  throw error;
}
```

### 2. Test All Endpoints
- [ ] GET `/api/system/settings/public`
- [ ] GET `/api/system/logo`
- [ ] GET `/api/system/banners`
- [ ] GET `/api/system/settings` (Admin)
- [ ] PUT `/api/system/settings` (Admin)
- [ ] PUT `/api/system/logo` (Admin)
- [ ] PUT `/api/system/qr-code` (Admin)
- [ ] GET `/api/system/banners/admin` (Admin)
- [ ] POST `/api/system/banners/upload` (Admin)
- [ ] DELETE `/api/system/banners/settings/{id}` (Admin)

### 3. Update Base URL
Make sure the API base URL is correctly configured:

```typescript
// In src/services/api.ts
baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api'
```

## 🐛 Current Issues

1. **404 Errors**: Backend endpoints not implemented
2. **Mock Data**: Using temporary mock responses
3. **File Uploads**: QR code uploads create blob URLs (temporary)
4. **Cache**: React Query cache may need invalidation after backend is ready

## 📞 Next Steps

1. **Backend Team**: Implement the endpoints listed above
2. **Frontend Team**: Test integration once backend is ready
3. **DevOps**: Ensure file upload directory permissions
4. **Testing**: Create integration tests for all endpoints

---

**Note**: This is a temporary solution. The frontend will work with mock data until the backend endpoints are implemented. All UI functionality is ready and will seamlessly switch to real data once the backend is available.