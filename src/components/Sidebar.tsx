import React from 'react';
import { Users, MessageSquare, FileText, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-16 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4">
      <div className="flex-1 space-y-4">
        <button className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <Users className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <MessageSquare className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <FileText className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      <button 
        onClick={toggleTheme}
        className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {theme === 'dark' ? (
          <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </div>
  );
}