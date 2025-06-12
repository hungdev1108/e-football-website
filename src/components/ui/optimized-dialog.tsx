"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Optimized Dialog components với performance enhancements

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

// Memoized Overlay untuk tránh re-render
const DialogOverlay = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
  >(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  ))
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Optimized Content với lazy loading support
const DialogContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
      showCloseButton?: boolean;
    }
  >(({ className, children, showCloseButton = true, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  ))
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Optimized Header với memoization
const DialogHeader = React.memo(
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
);
DialogHeader.displayName = "DialogHeader";

// Optimized Footer với memoization
const DialogFooter = React.memo(
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
);
DialogFooter.displayName = "DialogFooter";

// Optimized Title component
const DialogTitle = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
  >(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  ))
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Optimized Description component
const DialogDescription = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
  >(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  ))
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// Performance hook để theo dõi Dialog performance
export const useDialogPerformance = (dialogId: string) => {
  React.useEffect(() => {
    const markStart = `dialog-${dialogId}-start`;
    const markEnd = `dialog-${dialogId}-end`;

    performance.mark(markStart);

    return () => {
      performance.mark(markEnd);
      performance.measure(`dialog-${dialogId}`, markStart, markEnd);

      // Log performance metrics in development
      if (process.env.NODE_ENV === "development") {
        const measure = performance.getEntriesByName(`dialog-${dialogId}`)[0];
        console.log(`Dialog ${dialogId} render time:`, measure?.duration);
      }
    };
  }, [dialogId]);
};

// Lazy-loaded Dialog Content wrapper
export const LazyDialogContent = React.memo(
  ({
    children,
    isOpen,
    ...props
  }: React.ComponentPropsWithoutRef<typeof DialogContent> & {
    isOpen?: boolean;
  }) => {
    // Only render content when dialog is open to save memory
    if (!isOpen) return null;

    return <DialogContent {...props}>{children}</DialogContent>;
  }
);
LazyDialogContent.displayName = "LazyDialogContent";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
