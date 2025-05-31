import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, CartItem, GameAccount } from '@/types';

interface CartStore extends CartState {
  addItem: (account: GameAccount) => void;
  removeItem: (accountId: string) => void;
  updateQuantity: (accountId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (account: GameAccount) => {
        const { items } = get();
        const existingItem = items.find(item => item.accountId === account.id);

        if (existingItem) {
          // If item already exists, increase quantity
          set({
            items: items.map(item =>
              item.accountId === account.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: crypto.randomUUID(),
            accountId: account.id,
            account,
            quantity: 1,
            addedAt: new Date(),
          };

          set({
            items: [...items, newItem],
          });
        }

        // Update totals
        const updatedState = get();
        set({
          total: updatedState.getTotalPrice(),
          itemCount: updatedState.getItemCount(),
        });
      },

      removeItem: (accountId: string) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.accountId !== accountId);
        
        set({ items: updatedItems });

        // Update totals
        const updatedState = get();
        set({
          total: updatedState.getTotalPrice(),
          itemCount: updatedState.getItemCount(),
        });
      },

      updateQuantity: (accountId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(accountId);
          return;
        }

        const { items } = get();
        set({
          items: items.map(item =>
            item.accountId === accountId
              ? { ...item, quantity }
              : item
          ),
        });

        // Update totals
        const updatedState = get();
        set({
          total: updatedState.getTotalPrice(),
          itemCount: updatedState.getItemCount(),
        });
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0,
        });
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.account.price * item.quantity), 0);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
); 