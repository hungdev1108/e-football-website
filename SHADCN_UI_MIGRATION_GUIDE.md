# 🎨 SHADCN/UI MIGRATION & OPTIMIZATION GUIDE

## 📊 **PHÂN TÍCH HIỆN TRẠNG**

### **✅ Điểm tích cực:**
- shadcn/ui đã được setup cơ bản
- Đang sử dụng Tailwind CSS
- Class variance authority đã có
- Utils functions đã tối ưu

### **❌ Vấn đề hiệu suất:**
- Đang import toàn bộ Radix primitives (`import *`)
- Bundle size lớn do multiple Radix packages
- Styling inconsistency giữa components
- Tree shaking không hiệu quả

## 🚀 **CHIẾN LƯỢC MIGRATION**

### **Phase 1: Component Analysis & Cleanup**

#### **Current Usage:**
```typescript
// ❌ BEFORE - Direct Radix usage
import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as SelectPrimitive from "@radix-ui/react-select"

// ✅ AFTER - shadcn/ui optimized
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem } from "@/components/ui/select"
```

### **Phase 2: Bundle Size Optimization**

#### **Before Migration:**
```
@radix-ui/react-checkbox     ~45KB
@radix-ui/react-dialog       ~58KB
@radix-ui/react-dropdown     ~62KB
@radix-ui/react-select       ~75KB
... (total ~400KB+)
```

#### **After Migration:**
```
shadcn/ui components         ~120KB total
+ Better tree shaking
+ Smaller runtime overhead
```

## 🛠️ **IMPLEMENTATION STEPS**

### **Step 1: Create Performance-First Components**

1. **Button Component Optimization:**
```typescript
// Enhanced with better performance
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { memo } from "react"

const Button = memo(({ asChild, ...props }) => {
  const Comp = asChild ? Slot : "button"
  return <Comp {...props} />
})
```

2. **Dialog Component with Lazy Loading:**
```typescript
import { lazy, Suspense } from "react"
const DialogContent = lazy(() => import("./dialog-content"))

// Only load heavy dialog content when needed
```

### **Step 2: Implement Component Lazy Loading**

```typescript
// Create a registry for lazy-loaded UI components
const UIComponents = {
  Dialog: lazy(() => import("@/components/ui/dialog")),
  Select: lazy(() => import("@/components/ui/select")),
  DropdownMenu: lazy(() => import("@/components/ui/dropdown-menu"))
}

// Usage with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <UIComponents.Dialog />
</Suspense>
```

### **Step 3: Optimize Styling Performance**

1. **CSS Variables Optimization:**
```css
/* Reduce CSS variable lookups */
:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  /* Combine related variables */
}
```

2. **Tailwind JIT Optimization:**
```javascript
// tailwind.config.js
module.exports = {
  content: {
    files: ['./src/**/*.{js,ts,jsx,tsx}'],
    extract: {
      // Optimize extraction for better performance
      js: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
    }
  }
}
```

## 📈 **PERFORMANCE OPTIMIZATION STRATEGIES**

### **1. Component Memoization**

```typescript
// All UI components should be memoized
export const OptimizedCard = memo(function OptimizedCard({ children, ...props }) {
  return (
    <div className="card-optimized" {...props}>
      {children}
    </div>
  )
})
```

### **2. Event Handler Optimization**

```typescript
// ❌ BEFORE - Event handlers recreated
const handleClick = () => {...}

// ✅ AFTER - Memoized handlers
const handleClick = useCallback(() => {...}, [dependencies])
```

### **3. CSS-in-JS Performance**

```typescript
// Use static styles when possible
const staticStyles = "fixed inset-0 z-50 bg-background/80"

// Dynamic styles only when needed
const dynamicStyles = useMemo(() => 
  `opacity-${isVisible ? '100' : '0'}`
, [isVisible])
```

## 🎯 **SPECIFIC COMPONENT MIGRATIONS**

### **1. Dialog Component:**
```typescript
// Before: Multiple imports
import * as Dialog from "@radix-ui/react-dialog"

// After: Single optimized import
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
```

### **2. Select Component:**
```typescript
// Before: Heavy SelectPrimitive
import * as SelectPrimitive from "@radix-ui/react-select"

// After: Lightweight select
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select"
```

### **3. Navigation Menu:**
```typescript
// Add intersection observer for performance
const NavigationMenu = memo(() => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(...)
    return () => observer.disconnect()
  }, [])
  
  return isVisible ? <ActualMenu /> : <MenuSkeleton />
})
```

## 🚦 **MIGRATION CHECKLIST**

### **Phase 1: Setup** ✅
- [x] Install shadcn/ui CLI
- [x] Update components.json
- [x] Setup utility functions

### **Phase 2: Component Migration**
- [ ] Migrate Dialog components
- [ ] Migrate Select components  
- [ ] Migrate Dropdown Menu
- [ ] Migrate Navigation Menu
- [ ] Migrate Form components

### **Phase 3: Performance Testing**
- [ ] Bundle size analysis
- [ ] Runtime performance testing
- [ ] Lighthouse audit
- [ ] Memory usage profiling

### **Phase 4: Optimization**
- [ ] Component lazy loading
- [ ] CSS optimization
- [ ] Tree shaking verification
- [ ] Production build testing

## 📊 **EXPECTED RESULTS**

### **Bundle Size Reduction:**
- Initial bundle: ↓ 35-45%
- Component chunks: ↓ 25-35%
- Runtime overhead: ↓ 40-50%

### **Performance Metrics:**
- First Contentful Paint: ↓ 20-30%
- Largest Contentful Paint: ↓ 15-25%
- Time to Interactive: ↓ 25-35%
- Memory usage: ↓ 30-40%

### **Developer Experience:**
- ✅ Better TypeScript support
- ✅ Consistent component API
- ✅ Easier customization
- ✅ Better documentation

## 🛡️ **BEST PRACTICES**

1. **Always use memo() for UI components**
2. **Implement lazy loading for heavy components**
3. **Use compound components pattern**
4. **Optimize CSS variables usage**
5. **Implement proper loading states**
6. **Use Suspense boundaries effectively**

## 🔧 **TOOLS & MONITORING**

1. **Bundle Analyzer:**
```bash
npm install --save-dev @next/bundle-analyzer
```

2. **Performance Monitoring:**
```typescript
// Add performance marks
performance.mark('component-start')
// Component render
performance.mark('component-end')
performance.measure('component-render', 'component-start', 'component-end')
```

3. **Memory Profiling:**
```typescript
// Check for memory leaks
useEffect(() => {
  return () => {
    // Cleanup subscriptions
  }
}, [])
```

## 📝 **MIGRATION TIMELINE**

- **Week 1:** Setup & Planning ✅
- **Week 2:** Core components migration  
- **Week 3:** Complex components migration
- **Week 4:** Performance testing & optimization
- **Week 5:** Production deployment & monitoring

---

**Status:** 🔄 In Progress  
**Priority:** 🔥 High Performance Impact  
**Estimated Bundle Size Reduction:** 35-45% 