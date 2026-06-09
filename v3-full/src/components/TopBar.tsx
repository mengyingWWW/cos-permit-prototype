import { Search, Bell, HelpCircle } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-4 flex-shrink-0">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-seattle-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <HelpCircle size={18} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500"></span>
        </button>
        <button className="ml-1 px-3.5 py-1.5 bg-seattle-900 text-white text-sm font-medium rounded-lg hover:bg-seattle-800 transition-colors">
          My Apps
        </button>
      </div>
    </header>
  );
}
