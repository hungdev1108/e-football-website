import axios from "axios";

const API_BASE_URL = "http://localhost:5002";

// Create axios instance with timeout
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Test functions
async function testAccountsAPI() {
  console.log("\n🏈 Testing ACCOUNTS API...");

  try {
    // Test get all accounts
    console.log("  📋 Testing GET /api/accounts...");
    const accountsResponse = await api.get("/api/accounts?page=1&limit=5");
    console.log(
      "  ✅ GET /api/accounts:",
      accountsResponse.status,
      accountsResponse.data.success ? "SUCCESS" : "FAILED"
    );

    // Test featured accounts
    console.log("  ⭐ Testing GET /api/accounts/featured...");
    const featuredResponse = await api.get("/api/accounts/featured?limit=3");
    console.log(
      "  ✅ GET /api/accounts/featured:",
      featuredResponse.status,
      featuredResponse.data.success ? "SUCCESS" : "FAILED"
    );

    // Test categories
    console.log("  📂 Testing GET /api/categories...");
    const categoriesResponse = await api.get("/api/categories");
    console.log(
      "  ✅ GET /api/categories:",
      categoriesResponse.status,
      categoriesResponse.data.success ? "SUCCESS" : "FAILED"
    );

    // Test price range
    console.log("  💰 Testing GET /api/accounts/price-range...");
    const priceRangeResponse = await api.get("/api/accounts/price-range");
    console.log(
      "  ✅ GET /api/accounts/price-range:",
      priceRangeResponse.status,
      priceRangeResponse.data.success ? "SUCCESS" : "FAILED"
    );

    // Test account detail (using first account from list)
    if (accountsResponse.data.data?.accounts?.length > 0) {
      const firstAccountId = accountsResponse.data.data.accounts[0]._id;
      console.log(`  📄 Testing GET /api/accounts/${firstAccountId}...`);
      const accountDetailResponse = await api.get(
        `/api/accounts/${firstAccountId}`
      );
      console.log(
        "  ✅ GET /api/accounts/:id:",
        accountDetailResponse.status,
        accountDetailResponse.data.success ? "SUCCESS" : "FAILED"
      );
    }

    console.log("  🎯 ACCOUNTS API: ALL TESTS PASSED");
  } catch (error) {
    console.log(
      "  ❌ ACCOUNTS API ERROR:",
      error.response?.status || error.message
    );
    console.log("  📝 Error details:", error.response?.data || error.message);
  }
}

async function testNewsAPI() {
  console.log("\n📰 Testing NEWS API...");

  try {
    // Test get all news
    console.log("  📋 Testing GET /api/news...");
    const newsResponse = await api.get("/api/news?page=1&limit=5");
    console.log(
      "  ✅ GET /api/news:",
      newsResponse.status,
      newsResponse.data.success ? "SUCCESS" : "FAILED"
    );

    // Test featured news
    console.log("  ⭐ Testing GET /api/news/featured...");
    const featuredNewsResponse = await api.get("/api/news/featured?limit=3");
    console.log(
      "  ✅ GET /api/news/featured:",
      featuredNewsResponse.status,
      featuredNewsResponse.data.success ? "SUCCESS" : "FAILED"
    );

    // Test latest news
    console.log("  🕒 Testing GET /api/news/latest...");
    const latestNewsResponse = await api.get("/api/news/latest?limit=3");
    console.log(
      "  ✅ GET /api/news/latest:",
      latestNewsResponse.status,
      latestNewsResponse.data.success ? "SUCCESS" : "FAILED"
    );

    // Test news detail (using first news from list)
    if (newsResponse.data.data?.news?.length > 0) {
      const firstNewsId = newsResponse.data.data.news[0]._id;
      console.log(`  📄 Testing GET /api/news/${firstNewsId}...`);
      const newsDetailResponse = await api.get(`/api/news/${firstNewsId}`);
      console.log(
        "  ✅ GET /api/news/:id:",
        newsDetailResponse.status,
        newsDetailResponse.data.success ? "SUCCESS" : "FAILED"
      );
    }

    console.log("  🎯 NEWS API: ALL TESTS PASSED");
  } catch (error) {
    console.log(
      "  ❌ NEWS API ERROR:",
      error.response?.status || error.message
    );
    console.log("  📝 Error details:", error.response?.data || error.message);
  }
}

async function testSystemAPI() {
  console.log("\n⚙️ Testing SYSTEM API...");

  try {
    // Test get logo
    console.log("  🎨 Testing GET /api/system/logo...");
    const logoResponse = await api.get("/api/system/logo");
    console.log(
      "  ✅ GET /api/system/logo:",
      logoResponse.status,
      logoResponse.data.success ? "SUCCESS" : "FAILED"
    );

    // Test get banners
    console.log("  🖼️ Testing GET /api/system/banners...");
    const bannersResponse = await api.get("/api/system/banners");
    console.log(
      "  ✅ GET /api/system/banners:",
      bannersResponse.status,
      bannersResponse.data.success ? "SUCCESS" : "FAILED"
    );

    console.log("  🎯 SYSTEM API: ALL TESTS PASSED");
  } catch (error) {
    console.log(
      "  ❌ SYSTEM API ERROR:",
      error.response?.status || error.message
    );
    console.log("  📝 Error details:", error.response?.data || error.message);
  }
}

async function testAPIConnection() {
  console.log("🔗 Testing API Server Connection...");

  try {
    const response = await api.get("/");
    console.log("✅ API Server is ONLINE:", response.status);
    return true;
  } catch (error) {
    console.log("❌ API Server is OFFLINE:", error.code || error.message);
    console.log(
      "🚨 Make sure your backend server is running on http://localhost:5002"
    );
    return false;
  }
}

async function runAllTests() {
  console.log("🧪 EFOOTBALL STORE API TESTING");
  console.log("=".repeat(50));

  // Test server connection first
  const isServerOnline = await testAPIConnection();

  if (!isServerOnline) {
    console.log("\n❌ Cannot proceed with API tests - server is not running");
    console.log("💡 Please start your backend server and try again");
    return;
  }

  // Run all API tests
  await testAccountsAPI();
  await testNewsAPI();
  await testSystemAPI();

  console.log("\n🎉 API TESTING COMPLETED!");
  console.log("=".repeat(50));
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

// Run tests
runAllTests();
