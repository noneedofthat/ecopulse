import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,

  // Initialize auth state
  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      set({ session, user: session?.user ?? null, loading: false })

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        set({ session, user: session?.user ?? null })
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ loading: false })
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/feedback`,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      set({ user: null, session: null })
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  },
}))

export default useAuthStore
