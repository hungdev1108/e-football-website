📋 Tài liệu API Integration cho EfootballShop
*** Domain: http://localhost:5002 

🏈 ACCOUNT API
1. Lấy danh sách tất cả accounts (Public)
*** Endpoint: GET /accounts
- Query Parameters:
- page (number): Trang hiện tại (mặc định: 1)
- limit (number): Số lượng items mỗi trang (mặc định: 12)
- category (string): Lọc theo category ID
- minPrice (number): Giá tối thiểu
- maxPrice (number): Giá tối đa
- platform (string): Lọc theo platform (steam, mobile, ps4, ps5, xbox)
- sort (string): Sắp xếp (mặc định: '-createdAt')
- search (string): Tìm kiếm theo title, description, accountCode
*** Respone: 
{
  "success": true,
  "data": {
    "accounts": [
      {
        "_id": "string",
        "title": "string",
        "accountCode": "HT-01",
        "description": "string",
        "price": 100000,
        "category": {
          "_id": "string",
          "name": "string"
        },
        "seller": {
          "_id": "string",
          "username": "string",
          "fullName": "string"
        },
        "images": [
          {
            "url": "string",
            "alt": "string"
          }
        ],
        "collectiveStrength": 95,
        "accountDetails": {
          "platform": "steam",
          "level": 85,
          "coins": 50000,
          "gp": 25000
        },
        "status": "available",
        "featured": false,
        "views": 10,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 12
    }
  }
}

1. Lấy accounts nổi bật (Public)
*** Endpoint: GET /accounts/featured
- Query Parameters:
- limit (number): Số lượng items (mặc định: 8)

1. Lấy categories (Public)
*** Endpoint: GET /accounts/categories
*** Response
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "status": "active"
    }
  ]
}

1. Lấy accounts theo khoảng giá (Public)
*** Endpoint: GET /accounts/price-range
- Query Parameters:
- minPrice (number): Giá tối thiểu
- maxPrice (number): Giá tối đa
- limit (number): Số lượng items (mặc định: 12)

1. Lấy chi tiết account (Public)
*** Endpoint: GET /accounts/:id
*** Response: Giống như item trong danh sách accounts

📰 NEWS API
1. Lấy danh sách tin tức (Public)
*** Endpoint: GET /news
- Query Parameters:
- page (number): Trang hiện tại (mặc định: 1)
- limit (number): Số lượng items mỗi trang (mặc định: 10)
- search (string): Tìm kiếm theo title, content
*** Respone: 
{
  "success": true,
  "data": {
    "news": [
      {
        "_id": "string",
        "title": "string",
        "content": "string",
        "author": {
          "_id": "string",
          "username": "string",
          "fullName": "string"
        },
        "featuredImage": {
          "url": "string",
          "alt": "string"
        },
        "status": "published",
        "featured": false,
        "views": 100,
        "publishedAt": "2024-01-01T00:00:00.000Z",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  }
}

2. Lấy tin tức nổi bật (Public)
***Endpoint: GET /news/featured
- Query Parameters:
- limit (number): Số lượng items (mặc định: 5)
  
3. Lấy tin tức mới nhất (Public)
***Endpoint: GET /news/latest
- Query Parameters:
- limit (number): Số lượng items (mặc định: 5)
  
4. Lấy chi tiết tin tức (Public)
***Endpoint: GET /news/:id
*** Response: Giống như item trong danh sách news (tăng views count)

⚙️ SYSTEM API
1. Lấy logo (Public)
*** Endpoint: GET /system/logo
*** Response: 
{
  "success": true,
  "data": {
    "url": "string",
    "alt": "string"
  }
}

2. Lấy banners (Public)
*** Endpoint: GET /system/banners
*** Response: 
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "image": "string",
      "link": "string",
      "isActive": true,
      "order": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}

🔧 Lưu ý quan trọng:
Response Format: Tất cả API đều trả về format thống nhất với success, message, data
Error Handling: Lỗi sẽ trả về status code phù hợp (400, 401, 403, 404, 500) với thông báo lỗi
Pagination: Các API có phân trang sẽ trả về thông tin pagination đầy đủ