'use client';
import { Search, Bell, Settings, UserCircle, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-2 flex justify-between items-center text-gray-700 dark:text-gray-200">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-blue-800 dark:text-blue-400 mr-4">Wealth Elite</h1>
        <div className="relative">
          <input type="text" placeholder="search" className="bg-gray-100 dark:bg-gray-700 rounded-full py-1 px-4 pl-8 w-64 text-gray-900 dark:text-gray-100" />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
        <button onClick={toggleTheme} className="focus:outline-none">
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>
        <Bell className="cursor-pointer" />
        <Settings className="cursor-pointer" />
        <UserCircle className="cursor-pointer" />
        <button className="flex items-center space-x-1 text-sm font-semibold">
          <LogOut className="w-4 h-4" />
          <span>LOGOUT</span>
        </button>
      </div>
    </header>
  );
}