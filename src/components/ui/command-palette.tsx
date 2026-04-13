"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
  Home,
  Gamepad2,
  Newspaper,
  Phone,
  LogIn,
  UserPlus,
  Sun,
  Moon,
  Search,
} from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Trang chủ", href: "/", icon: Home, hint: "home" },
  { label: "Tài khoản game", href: "/accounts", icon: Gamepad2, hint: "accounts shop" },
  { label: "Tin tức", href: "/news", icon: Newspaper, hint: "news blog" },
  { label: "Liên hệ", href: "/contact", icon: Phone, hint: "contact support" },
  { label: "Đăng nhập", href: "/auth/login", icon: LogIn, hint: "login signin" },
  { label: "Đăng ký", href: "/auth/register", icon: UserPlus, hint: "register signup" },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = React.useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[14vh]"
    >
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-md"
        onClick={() => setOpen(false)}
      />
      <Command
        label="Command menu"
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border/60 bg-popover/90 shadow-2xl backdrop-blur-2xl"
      >
        <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Command.Input
            placeholder="Tìm kiếm trang, lệnh... (Ctrl+K)"
            className="h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <kbd className="hidden rounded border border-border/60 bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline-block">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="p-6 text-center text-sm text-muted-foreground">
            Không tìm thấy kết quả.
          </Command.Empty>

          <Command.Group
            heading="Điều hướng"
            className="px-2 pb-2 pt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Command.Item
                  key={item.href}
                  value={`${item.label} ${item.hint}`}
                  onSelect={() => go(item.href)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground aria-selected:bg-accent/60 aria-selected:text-foreground"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{item.label}</span>
                </Command.Item>
              );
            })}
          </Command.Group>

          <Command.Group
            heading="Giao diện"
            className="px-2 pb-2 pt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
          >
            <Command.Item
              value="theme light sáng"
              onSelect={() => {
                setTheme("light");
                setOpen(false);
              }}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-accent/60"
            >
              <Sun className="h-4 w-4 text-muted-foreground" />
              <span>Chế độ sáng</span>
              {resolvedTheme === "light" && (
                <span className="ml-auto text-xs text-muted-foreground">đang dùng</span>
              )}
            </Command.Item>
            <Command.Item
              value="theme dark tối"
              onSelect={() => {
                setTheme("dark");
                setOpen(false);
              }}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-accent/60"
            >
              <Moon className="h-4 w-4 text-muted-foreground" />
              <span>Chế độ tối</span>
              {resolvedTheme === "dark" && (
                <span className="ml-auto text-xs text-muted-foreground">đang dùng</span>
              )}
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 text-[11px] text-muted-foreground">
          <span>↑↓ di chuyển · ⏎ chọn</span>
          <span className="neon-text font-semibold">EFOOTBALL Store</span>
        </div>
      </Command>
    </div>
  );
}
