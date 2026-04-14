import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingChatbot from '@/components/chat/FloatingChatbot'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-forest-50">
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <div className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      <FloatingChatbot />
    </div>
  )
}
