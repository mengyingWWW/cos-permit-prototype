import type { Screen } from '../types';
import {
  LayoutDashboard,
  Settings,
  FileText,
  LogOut,
} from 'lucide-react';
import { CURRENT_USER } from '../data';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function Sidebar({ currentScreen, onNavigate }: SidebarProps) {
  return (
    <aside className="w-[220px] min-w-[220px] bg-seattle-900 flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-seattle-800">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-seattle-900 font-bold text-sm flex-shrink-0">
          S
        </div>
        <span className="text-white font-semibold text-base tracking-wide">Seattle</span>
      </div>

      {/* User profile */}
      <div className="flex flex-col items-center pt-6 pb-5 px-4 border-b border-seattle-800">
        <div className="w-16 h-16 rounded-full bg-seattle-700 border-2 border-seattle-600 flex items-center justify-center text-white font-semibold text-lg mb-2">
          {CURRENT_USER.initials}
        </div>
        <span className="text-white text-sm font-medium text-center leading-snug">
          {CURRENT_USER.name}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-4">
        <p className="text-seattle-400 text-[10px] font-semibold uppercase tracking-widest px-2 mb-2">Menu</p>
        <button
          onClick={() => onNavigate('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors mb-1 ${
            currentScreen === 'dashboard'
              ? 'bg-seattle-700 text-white'
              : 'text-seattle-300 hover:bg-seattle-800 hover:text-white'
          }`}
        >
          <LayoutDashboard size={16} />
          Dashboard
        </button>

        <div className="mt-4 mb-2">
          <p className="text-seattle-400 text-[10px] font-semibold uppercase tracking-widest px-2 mb-2">Help</p>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-seattle-300 hover:bg-seattle-800 hover:text-white transition-colors mb-1">
            <Settings size={16} />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-seattle-300 hover:bg-seattle-800 hover:text-white transition-colors">
            <FileText size={16} />
            My Documentation
          </button>
        </div>
      </nav>

      {/* Log out */}
      <div className="px-3 pb-5 border-t border-seattle-800 pt-4">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-seattle-300 hover:bg-seattle-800 hover:text-white transition-colors">
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </aside>
  );
}
