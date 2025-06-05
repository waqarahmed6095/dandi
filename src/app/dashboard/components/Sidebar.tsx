import { FiHome, FiSettings, FiBookOpen, FiCreditCard, FiGlobe, FiChevronDown, FiMenu } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar({ isVisible, setIsVisible }: { isVisible: boolean, setIsVisible: (v: boolean) => void }) {
  return (
    <>
      {/* Toggle button always visible */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-4 left-4 z-40 bg-white p-2 rounded-lg shadow-md"
      >
        <FiMenu size={24} />
      </button>
      {/* Sidebar only rendered if visible */}
      {isVisible && (
        <aside className="h-screen w-64 bg-white border-r flex flex-col justify-between fixed left-0 top-0 z-30 shadow-sm">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 px-6 py-6">
              <Image src="/logo.svg" alt="Logo" width={32} height={32} />
              <span className="font-bold text-xl tracking-tight text-[#1a2233]">Dandi</span>
            </div>
            {/* User Dropdown */}
            <div className="px-6 mb-4">
              <button className="flex items-center gap-2 w-full bg-[#f3f6fa] px-3 py-2 rounded-lg font-medium text-[#1a2233]">
                <Image src="/avatar.svg" alt="User" width={28} height={28} className="rounded-full" />
                <span>Personal</span>
                <FiChevronDown className="ml-auto" />
              </button>
            </div>
            {/* Navigation */}
            <nav className="flex flex-col gap-1 px-2">
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#1a2233] font-medium bg-[#f3f6fa]">
                <FiHome /> Overview
              </a>
              <Link href="/playground" className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#1a2233] font-medium hover:bg-[#f3f6fa]">
                <FiBookOpen /> API Playground
              </Link>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#1a2233] font-medium hover:bg-[#f3f6fa]">
                <FiCreditCard /> Billing
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#1a2233] font-medium hover:bg-[#f3f6fa]">
                <FiSettings /> Settings
              </a>
              <a href="https://docs.example.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#1a2233] font-medium hover:bg-[#f3f6fa]">
                <FiBookOpen /> Documentation
                <span className="ml-auto text-xs">↗</span>
              </a>
              <a href="https://mcp.example.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#1a2233] font-medium hover:bg-[#f3f6fa]">
                <FiGlobe /> Tavily MCP
                <span className="ml-auto text-xs">↗</span>
              </a>
            </nav>
          </div>
          {/* User Avatar at the bottom */}
          <div className="px-6 py-4">
            <div className="flex items-center gap-2">
              <Image src="/avatar.svg" alt="User" width={32} height={32} className="rounded-full" />
              <span className="font-medium text-[#1a2233]">waqar jamali</span>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
