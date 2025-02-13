import React, { useState } from 'react';
import { Menu, X, Home, Users, FolderOpen, Calendar, FileText, PieChart, ChevronRight } from 'lucide-react';

const Home1 = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'team', name: 'Team', icon: Users },
    { id: 'projects', name: 'Projects', icon: FolderOpen },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'reports', name: 'Reports', icon: PieChart },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
     
      <div className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 ease-in-out relative`}>
       
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-4 bg-gray-900 rounded-full p-1"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        
        <div className="flex items-center p-4">
          <div className="w-8 h-8 bg-blue-500 rounded-lg" />
          {isOpen && <span className="ml-2 text-xl font-bold">Logo</span>}
        </div>

       
        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`flex items-center w-full p-4 hover:bg-gray-800 transition-colors ${
                  activeMenu === item.id ? 'bg-gray-800' : ''
                }`}
              >
                <Icon size={20} />
                {isOpen && (
                  <div className="flex items-center justify-between flex-1">
                    <span className="ml-4">{item.name}</span>
                    <ChevronRight size={16} className="opacity-50" />
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

     
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-4">
            {menuItems.find(item => item.id === activeMenu)?.name}
          </h1>
          <p className="text-gray-600">
            Content for {menuItems.find(item => item.id === activeMenu)?.name} section goes here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home1;