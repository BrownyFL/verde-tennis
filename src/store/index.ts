import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  membershipType?: string;
}

export interface Booking {
  id: string;
  courtId: number;
  courtName: string;
  trainerId?: number;
  trainerName?: string;
  date: string;
  time: string;
  duration: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  bookings: Booking[];
  login: (user: User) => void;
  logout: () => void;
  addBooking: (booking: Booking) => void;
  cancelBooking: (id: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      bookings: [],
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      addBooking: (booking) =>
        set((state) => ({ bookings: [booking, ...state.bookings] })),
      cancelBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status: 'cancelled' as const } : b
          ),
        })),
    }),
    { name: 'verde-auth' }
  )
);
