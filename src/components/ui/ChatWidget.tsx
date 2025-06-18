"use client";

import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const ChatWidget = memo(function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      id: "messenger",
      icon: "💬",
      title: "Liên hệ qua Messenger",
      action: () => {
        window.open("https://www.facebook.com/tran.hiep.229430", "_blank");
      },
    },
    {
      id: "zalo",
      icon: "📱",
      title: "Liên hệ qua Zalo",
      subtitle: "Zalo",
      action: () => {
        window.open("https://zalo.me/0395860670", "_blank");
      },
    },
    {
      id: "phone",
      icon: "📞",
      title: "0845397989",
      action: () => {
        window.open("tel:0845397989", "_blank");
      },
    },
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {/* Pulse animation - behind button */}
        <div className="absolute inset-0 w-14 h-14 rounded-full bg-blue-600 animate-ping opacity-20 pointer-events-none"></div>
        
        <Button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="sr-only">Mở chat</span>
        </Button>
      </div>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[320px] p-0 bg-slate-800 border-slate-700 [&>button]:text-white [&>button]:hover:text-white/80">
          <VisuallyHidden>
            <DialogTitle>Tùy chọn liên hệ</DialogTitle>
          </VisuallyHidden>
          
          {/* Header */}
          <DialogHeader className="p-4 pb-2">
            <h3 className="text-lg font-semibold text-white">
              Chúng tôi trên
            </h3>
          </DialogHeader>

          {/* Contact Options */}
          <div className="px-4 pb-2">
            <div className="space-y-2">
              {contactOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={option.action}
                  className="w-full flex items-center gap-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all duration-200 text-left group"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg text-lg">
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium group-hover:text-blue-300 transition-colors">
                      {option.title}
                    </div>
                    {option.subtitle && (
                      <div className="text-sm text-slate-400">
                        {option.subtitle}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Now Button */}
          <div className="p-4 pt-2">
            <Button
              onClick={() => {
                window.open("https://zalo.me/0395860670", "_blank");
                setIsOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat ngay
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}); 