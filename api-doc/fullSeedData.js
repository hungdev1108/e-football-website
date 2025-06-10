const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/User");
const Category = require("../models/Category");
const Account = require("../models/Account");
const News = require("../models/News");
const { Banner, SystemSetting } = require("../models/SystemSetting");

const seedFullDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🔗 Connected to MongoDB");

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await User.deleteMany({});
    await Category.deleteMany({});
    await Account.deleteMany({});
    await News.deleteMany({});
    await Banner.deleteMany({});
    await SystemSetting.deleteMany({});

    // Drop indexes to avoid conflicts
    try {
      await News.collection.dropIndexes();
      console.log("📋 Dropped News indexes");
    } catch (error) {
      console.log("ℹ️ No News indexes to drop");
    }

    // Create users
    console.log("👥 Creating users...");
    const admin = await User.create({
      username: "admin",
      email: "admin@efootball.com",
      password: "admin123",
      fullName: "System Administrator",
      role: "admin",
      balance: 1000000,
      emailVerified: true,
      phone: "+84123456789",
    });

    const sellers = [];
    for (let i = 1; i <= 5; i++) {
      const seller = await User.create({
        username: `seller${i}`,
        email: `seller${i}@efootball.com`,
        password: "seller123",
        fullName: `Seller ${i}`,
        role: "seller",
        balance: Math.floor(Math.random() * 500000),
        emailVerified: true,
        phone: `+8412345678${i}`,
      });
      sellers.push(seller);
    }

    const users = [];
    for (let i = 1; i <= 10; i++) {
      const user = await User.create({
        username: `user${i}`,
        email: `user${i}@efootball.com`,
        password: "user123",
        fullName: `User ${i}`,
        role: "user",
        balance: Math.floor(Math.random() * 200000),
        emailVerified: true,
        phone: `+8412345679${i}`,
      });
      users.push(user);
    }

    // Create categories
    console.log("📂 Creating categories...");
    const categories = await Category.insertMany([
      {
        name: "High Rating Accounts",
        description: "Accounts với rating cao và đội hình mạnh",
        icon: "⭐",
        createdBy: admin._id,
      },
      {
        name: "Legendary Players",
        description: "Accounts có các cầu thủ huyền thoại",
        icon: "🏆",
        createdBy: admin._id,
      },
      {
        name: "Starter Accounts",
        description: "Accounts mới cho người mới bắt đầu",
        icon: "🌱",
        createdBy: admin._id,
      },
      {
        name: "Console Accounts",
        description: "Accounts cho PS4, PS5, Xbox",
        icon: "🎮",
        createdBy: admin._id,
      },
      {
        name: "Mobile Accounts",
        description: "Accounts cho nền tảng mobile",
        icon: "📱",
        createdBy: admin._id,
      },
      {
        name: "PC Steam Accounts",
        description: "Accounts cho Steam PC",
        icon: "💻",
        createdBy: admin._id,
      },
    ]);

    // Create 20 accounts
    console.log("🏈 Creating 20 accounts...");
    const platforms = ["steam", "mobile", "ps4", "ps5", "xbox"];
    const accountTitles = [
      "Account Messi 99 Rating + Ronaldo 98",
      "Team Full Legend với Pele, Maradona",
      "Account Rating 4500+ Team Strength",
      "Starter Pack với 50M GP và Coins",
      "Account Barcelona Full Squad 2024",
      "Real Madrid Galacticos Team",
      "Manchester City Premier League",
      "Bayern Munich Bundesliga Champions",
      "PSG Ligue 1 All Stars",
      "AC Milan Serie A Legends",
      "Chelsea Premier League Squad",
      "Liverpool FC Championship Team",
      "Arsenal Gunners Full Team",
      "Juventus Old Lady Squad",
      "Inter Milan Nerazzurri",
      "Atletico Madrid La Liga",
      "Borussia Dortmund BVB",
      "Napoli Serie A Champions",
      "Tottenham Spurs Squad",
      "Manchester United Red Devils",
    ];

    const accounts = [];
    for (let i = 0; i < 20; i++) {
      const randomSeller = sellers[Math.floor(Math.random() * sellers.length)];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const randomPlatform =
        platforms[Math.floor(Math.random() * platforms.length)];

      const account = await Account.create({
        title: accountTitles[i],
        accountCode: `HT-${String(i + 1).padStart(3, "0")}`,
        description: `Account chất lượng cao với đội hình mạnh. Bao gồm nhiều cầu thủ top và tài nguyên game phong phú. Phù hợp cho người chơi muốn có trải nghiệm tốt nhất trong eFootball 2024.`,
        price: Math.floor(Math.random() * 500000) + 50000,
        category: randomCategory._id,
        seller: randomSeller._id,
        images: [
          {
            url: "/images/account_image.jpeg",
            alt: `${accountTitles[i]} Preview`,
          },
          {
            url: "/images/account_image.jpeg",
            alt: `${accountTitles[i]} Squad`,
          },
        ],
        collectiveStrength: Math.floor(Math.random() * 1000) + 3500,
        accountDetails: {
          platform: randomPlatform,
          level: Math.floor(Math.random() * 50) + 30,
          coins: Math.floor(Math.random() * 100000) + 10000,
          gp: Math.floor(Math.random() * 50000000) + 5000000,
        },
        status:
          Math.random() > 0.2
            ? "available"
            : Math.random() > 0.5
            ? "sold"
            : "pending",
        featured: Math.random() > 0.7,
        views: Math.floor(Math.random() * 1000),
      });
      accounts.push(account);
    }

    // Create 20 news articles
    console.log("📰 Creating 20 news articles...");
    const newsTopics = [
      "eFootball 2024 Update: Tính năng mới và cải tiến",
      "Mùa giải Premier League trong eFootball Mobile",
      "Hướng dẫn build đội hình mạnh nhất 2024",
      "Top 10 cầu thủ có rating cao nhất",
      "Sự kiện Champions League eFootball",
      "Cập nhật roster cầu thủ tháng 12/2024",
      "Mẹo farming GP hiệu quả trong game",
      "Review cầu thủ Featured mới nhất",
      "Chiến thuật 4-3-3 hiệu quả nhất",
      "Legendary Players mới được thêm vào",
      "Comparison: Mobile vs Console version",
      "eFootball World Championship 2024",
      "Cách trade account an toàn và hiệu quả",
      "Master League mode tips và tricks",
      "Best formations cho beginners",
      "MyClub vs Dream Team mode comparison",
      "Upcoming features trong update tiếp theo",
      "eFootball vs FIFA: So sánh chi tiết",
      "Community event và rewards tháng này",
      "Pro Evolution Soccer nostalgia và eFootball",
    ];

    const newsContents = [
      "Konami vừa phát hành update mới cho eFootball 2024 với nhiều tính năng hấp dẫn...",
      "Mùa giải Premier League chính thức bắt đầu trong eFootball Mobile với nhiều sự kiện...",
      "Để build được đội hình mạnh, bạn cần chú ý đến chemistry và rating của cầu thủ...",
      "Danh sách top 10 cầu thủ có rating cao nhất hiện tại trong eFootball 2024...",
      "Champions League event mang đến cơ hội nhận được nhiều phần thưởng giá trị...",
      "Roster update tháng 12 với nhiều cầu thủ mới và thay đổi rating...",
      "Hướng dẫn chi tiết cách farm GP một cách hiệu quả và nhanh chóng...",
      "Review chi tiết về các cầu thủ Featured mới được ra mắt tuần này...",
      "Chiến thuật 4-3-3 và cách áp dụng hiệu quả trong các trận đấu...",
      "Danh sách cầu thủ huyền thoại mới được thêm vào game...",
    ];

    for (let i = 0; i < 20; i++) {
      await News.create({
        title: newsTopics[i],
        content:
          newsContents[i % newsContents.length] +
          " " +
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        author: admin._id,
        featuredImage: {
          url: "/images/account_image.jpeg",
          alt: newsTopics[i],
        },
        status: Math.random() > 0.1 ? "published" : "draft",
        featured: Math.random() > 0.7,
        views: Math.floor(Math.random() * 5000),
        publishedAt:
          Math.random() > 0.1
            ? new Date(
                Date.now() -
                  Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
              )
            : undefined,
      });
    }

    // Create system banners (20 items)
    console.log("🎨 Creating 20 system banners...");
    const bannerTitles = [
      "Welcome to eFootball Shop",
      "Black Friday Sale - 50% OFF",
      "New Legendary Players Available",
      "Christmas Special Event",
      "Top Accounts Collection",
      "Mobile Exclusive Deals",
      "Console Gaming Paradise",
      "Steam Winter Sale",
      "Premium Account Showcase",
      "Champions League Special",
      "New Year Celebration",
      "Valentine Day Offers",
      "Spring Festival Event",
      "Summer Sale Extravaganza",
      "Back to School Deals",
      "Halloween Special Accounts",
      "World Cup Edition",
      "Anniversary Celebration",
      "Flash Sale Alert",
      "VIP Member Benefits",
    ];

    for (let i = 0; i < 20; i++) {
      await Banner.create({
        title: bannerTitles[i],
        image: "/images/account_image.jpeg",
        link: i % 3 === 0 ? "/accounts" : i % 3 === 1 ? "/news" : "/categories",
        isActive: Math.random() > 0.3,
        order: i + 1,
      });
    }

    // Create system settings
    console.log("⚙️ Creating system settings...");
    await SystemSetting.create({
      key: "logo",
      value: {
        url: "/images/account_image.jpeg",
        alt: "eFootball Shop Logo",
      },
      type: "object",
      description: "Website logo",
      isPublic: true,
    });

    const systemSettings = [
      {
        key: "site_name",
        value: "eFootball Account Trading",
        type: "string",
        description: "Website name",
        isPublic: true,
      },
      {
        key: "site_description",
        value: "Best place to buy and sell eFootball accounts",
        type: "string",
        description: "Website description",
        isPublic: true,
      },
      {
        key: "contact_phone",
        value: "+84123456789",
        type: "string",
        description: "Contact phone number",
        isPublic: true,
      },
      {
        key: "contact_email",
        value: "contact@efootball.com",
        type: "string",
        description: "Contact email",
        isPublic: true,
      },
      {
        key: "contact_address",
        value: "123 Gaming Street, Ho Chi Minh City",
        type: "string",
        description: "Contact address",
        isPublic: true,
      },
      {
        key: "facebook_url",
        value: "https://facebook.com/efootballshop",
        type: "string",
        description: "Facebook page URL",
        isPublic: true,
      },
      {
        key: "twitter_url",
        value: "https://twitter.com/efootballshop",
        type: "string",
        description: "Twitter page URL",
        isPublic: true,
      },
      {
        key: "instagram_url",
        value: "https://instagram.com/efootballshop",
        type: "string",
        description: "Instagram page URL",
        isPublic: true,
      },
      {
        key: "commission_rate",
        value: 0.1,
        type: "number",
        description: "Commission rate for sellers",
        isPublic: false,
      },
      {
        key: "min_withdrawal",
        value: 50000,
        type: "number",
        description: "Minimum withdrawal amount",
        isPublic: false,
      },
      {
        key: "max_withdrawal",
        value: 10000000,
        type: "number",
        description: "Maximum withdrawal amount",
        isPublic: false,
      },
      {
        key: "maintenance_mode",
        value: false,
        type: "boolean",
        description: "Enable/disable maintenance mode",
        isPublic: true,
      },
      {
        key: "registration_enabled",
        value: true,
        type: "boolean",
        description: "Enable/disable user registration",
        isPublic: true,
      },
      {
        key: "featured_account_limit",
        value: 8,
        type: "number",
        description: "Number of featured accounts to show",
        isPublic: false,
      },
      {
        key: "featured_news_limit",
        value: 5,
        type: "number",
        description: "Number of featured news to show",
        isPublic: false,
      },
      {
        key: "banner_display_limit",
        value: 3,
        type: "number",
        description: "Number of banners to display",
        isPublic: false,
      },
    ];

    await SystemSetting.insertMany(systemSettings);

    // Update account counts in categories
    console.log("📊 Updating category account counts...");
    for (const category of categories) {
      const count = await Account.countDocuments({ category: category._id });
      await Category.findByIdAndUpdate(category._id, { accountCount: count });
    }

    console.log("✅ Database seeded successfully with full data!");
    console.log("");
    console.log("📊 Summary:");
    console.log(`👥 Users: ${await User.countDocuments()}`);
    console.log(`📂 Categories: ${await Category.countDocuments()}`);
    console.log(`🏈 Accounts: ${await Account.countDocuments()}`);
    console.log(`📰 News: ${await News.countDocuments()}`);
    console.log(`🎨 Banners: ${await Banner.countDocuments()}`);
    console.log(`⚙️ System Settings: ${await SystemSetting.countDocuments()}`);
    console.log("");
    console.log("🔑 Login credentials:");
    console.log("👨‍💼 Admin: admin@efootball.com / admin123");
    console.log(
      "🏪 Sellers: seller1@efootball.com / seller123 (seller1-seller5)"
    );
    console.log("👤 Users: user1@efootball.com / user123 (user1-user10)");
    console.log("");
    console.log("🖼️ All images use: /images/account_image.jpeg");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedFullDatabase();
