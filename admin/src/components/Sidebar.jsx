import React from 'react'
import { NavLink } from 'react-router-dom'
import { PlusSquare, List, Package} from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    {
      path: '/',
      icon: <PlusSquare className="h-5 w-5" />,
      label: 'Add Items'
    },
    {
      path: '/list',
      icon: <List className="h-5 w-5" />,
      label: 'List Items'
    },
    {
      path: '/order',
      icon: <Package className="h-5 w-5" />,
      label: 'Orders'
    },
  
  ]

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
    
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-center md:justify-start space-x-2">
          <div className="bg-primary p-2 rounded-lg">
            <Package className="h-6 w-6 text-white" />
          </div>
          <span className="hidden md:inline text-xl font-semibold text-gray-800">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <span className={`${item.path === '/settings' ? 'text-red-500' : ''}`}>
              {item.icon}
            </span>
            <span className="hidden md:inline">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile/Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-medium">AD</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar