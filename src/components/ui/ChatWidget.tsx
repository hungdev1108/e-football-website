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
      title: "0395860670",
      action: () => {
        window.open("tel:0395860670", "_blank");
      },
    },
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <div
          className="pointer-events-none absolute inset-0 h-14 w-14 animate-ping rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--neon-violet) / 0.6), transparent 70%)",
          }}
        />
        <Button
          onClick={() => setIsOpen(true)}
          variant="neon"
          className="relative h-14 w-14 rounded-full p-0 shadow-[0_10px_30px_-5px_rgb(var(--neon-violet)/0.7)] transform transition-transform duration-300 hover:scale-110 cursor-pointer"
          aria-label="Mở chat hỗ trợ"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[320px] p-0 glass-strong border-border/60 [&>button]:text-foreground/80 [&>button]:hover:text-foreground">
          <VisuallyHidden>
            <DialogTitle>Tùy chọn liên hệ</DialogTitle>
          </VisuallyHidden>

          {/* Header */}
          <DialogHeader className="p-4 pb-2">
            <h3 className="neon-text-tri text-lg font-semibold">
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
                  className="group w-full flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/40 backdrop-blur hover:bg-accent/40 hover:border-[rgb(var(--neon-violet)/0.5)] transition-all duration-200 text-left"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-lg">
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground transition-colors group-hover:text-[rgb(var(--neon-cyan))]">
                      {option.title}
                    </div>
                    {option.subtitle && (
                      <div className="text-xs text-muted-foreground">
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
              variant="neon"
              className="w-full"
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
