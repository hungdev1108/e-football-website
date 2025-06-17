"use client";

import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/layout/Header";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  Facebook,
  Star
} from "lucide-react";
import { toast } from "react-hot-toast";

// Memoized contact info component
const ContactInfo = memo(function ContactInfo() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Hotline",
      value: "0123 456 789",
      description: "Gọi ngay để được hỗ trợ",
      action: () => window.open("tel:0123456789", "_self"),
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: MessageCircle,
      title: "Zalo",
      value: "Chat với Admin",
      description: "Phản hồi trong 2 phút",
      action: () => window.open("https://zalo.me/0123456789", "_blank"),
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Facebook,
      title: "Facebook",
      value: "Messenger",
      description: "Hỗ trợ 24/7",
      action: () => window.open("https://m.me/efootballstore", "_blank"),
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@efootball.com",
      description: "Phản hồi trong 24h",
      action: () => window.open("mailto:support@efootball.com", "_self"),
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
      {contactMethods.map((method, index) => {
        const IconComponent = method.icon;
        return (
          <Card 
            key={index}
            className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm"
            onClick={method.action}
          >
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${method.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm lg:text-base">{method.title}</h3>
                  <p className="text-blue-600 font-medium text-sm lg:text-base">{method.value}</p>
                  <p className="text-gray-500 text-xs lg:text-sm">{method.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
});

// Memoized business info component
const BusinessInfo = memo(function BusinessInfo() {
  const businessInfo = [
    {
      icon: MapPin,
      title: "Địa chỉ",
      value: "Hồ Chí Minh"
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      value: "8:00 - 22:00 (Thứ 2 - Chủ nhật)"
    }
  ];

  return (
    <div className="space-y-4">
      {businessInfo.map((info, index) => {
        const IconComponent = info.icon;
        return (
          <div key={index} className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <IconComponent className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 text-sm lg:text-base">{info.title}</h4>
              <p className="text-gray-600 text-sm lg:text-base">{info.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
});

// Main contact form component
const ContactForm = memo(function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại trong 24h.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm lg:text-base">Họ và tên *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nhập họ và tên"
            required
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm lg:text-base">Số điện thoại *</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Nhập số điện thoại"
            required
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm lg:text-base">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Nhập địa chỉ email"
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-sm lg:text-base">Chủ đề *</Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Nhập chủ đề liên hệ"
          required
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm lg:text-base">Nội dung *</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Nhập nội dung tin nhắn..."
          rows={5}
          required
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Đang gửi...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Gửi tin nhắn
          </div>
        )}
      </Button>
    </form>
  );
});

// Main contact page component
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <Header />
      
      <div className="container mx-auto px-4 py-6 lg:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-gray-600 text-sm lg:text-lg max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ ngay để được tư vấn tốt nhất!
          </p>
        </div>

        {/* Quick Contact Methods */}
        <div className="mb-8 lg:mb-12">
          
          <ContactInfo />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4 lg:pb-6">
                <CardTitle className="text-lg lg:text-xl text-gray-900">
                  Gửi tin nhắn cho chúng tôi
                </CardTitle>
                <p className="text-gray-600 text-sm lg:text-base">
                  Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại trong 24h
                </p>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Business Info & Trust Signals */}
          <div className="space-y-6">
            {/* Business Information */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-900">
                  Thông tin liên hệ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BusinessInfo />
              </CardContent>
            </Card>

            {/* Trust Signals */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-4 lg:p-6">
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">
                    Cam kết chất lượng
                  </h3>
                    <div className="space-y-2 text-gray-600 text-xs lg:text-sm mb-3">
                     <div className="flex items-center justify-center gap-2">
                       <span>Tài khoản chính hãng</span>
                     </div>
                     <div className="flex items-center justify-center gap-2">
                       <span>Hỗ trợ 24/7</span>
                     </div>
                     <div className="flex items-center justify-center gap-2">
                       <span>Bảo hành trọn đời</span>
                     </div>
                   </div>
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 lg:h-4 lg:w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-xs lg:text-sm text-gray-600 ml-2">5.0/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 lg:mt-16">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-lg lg:text-2xl text-gray-900">
                Câu hỏi thường gặp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {[
                  {
                    q: "Tài khoản có đảm bảo an toàn không?",
                    a: "Chúng tôi cam kết 100% tài khoản chính hãng và an toàn tuyệt đối."
                  },
                  {
                    q: "Thời gian giao hàng bao lâu?",
                    a: "Tài khoản được giao trong vòng 5-15 phút sau khi thanh toán."
                  },
                  {
                    q: "Có hỗ trợ sau bán hàng không?",
                    a: "Có, chúng tôi hỗ trợ 24/7 và bảo hành trọn đời tài khoản."
                  },
                  {
                    q: "Thanh toán như thế nào?",
                    a: "Hỗ trợ thanh toán qua Banking, Momo, Zalo Pay và thẻ cào."
                  }
                ].map((faq, index) => (
                  <div key={index} className="p-3 lg:p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm lg:text-base">
                      {faq.q}
                    </h4>
                    <p className="text-gray-600 text-xs lg:text-sm">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 