import React, { useEffect, useState } from 'react';
import { 
  Home, 
  Users, 
  BookOpen, 
  Calendar, 
  Settings, 
  ChevronDown, 
  Menu, 
  X,
  Award,
  Bell,
  FileText,
  Truck,
  Clock,
  School
} from 'lucide-react';

const themeColors = {
  admin: 'bg-purple-400',
//   teacher: 'bg-blue-600',
//   student: 'bg-green-600'
};

const NavBar = ({ userType = 'admin',onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="w-full  bg-blue-400 shadow-lg fixed flex flex-row top-0 z-50">
     
        <div className="w-full flex flex-row  justify-between">
          {/* Left side */}
     
            <button 
              onClick={onMenuClick}
              className=" ml-3 rounded-md  transition-colors"
            >
              <Menu size={24} />
            </button>
           
              <School className="h-8 w-8 space-x-1" />
              <span className="text-xl font-bold hidden md:block">EduCloud</span>
           
          

          {/* Search bar - visible on larger screens */}
          {/* <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
            {/* <div className="w-full">
              <input
                type="text"
                placeholder="What do you want to find?"
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div> */}
          {/* </div>  */}

          {/* Right side */}


          <div className="flex flex-row items-center space-x-4">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Bell size={20} />
            </button>
            
         
            <div className="relative flex flex-col">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <div className="size-8 rounded-full bg-white/30"></div>
                <ChevronDown size={20} className={`transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

            
              <div className={`
                absolute right-0 mt-12 w-48 rounded-md shadow-lg py-1 bg-white
                transform transition-all duration-200 ease-in-out
                ${dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
              `}>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
              </div>
            </div>
          </div>
          
        </div>
     
    </nav>
  );
};

const Sidebar = ({ isOpen, userType = 'admin' }) => {
const [menuOpen, setMenuOpen]=useState(false)
  console.log("isOpen",isOpen)
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState({});
  useEffect(()=>{
    setMenuOpen(isOpen)

  },[isOpen])
  const menuItems = {
    admin: [
      { icon: Home, label: 'Dashboard', id: 'dashboard' },
      { 
        icon: Users, 
        label: 'Students', 
        id: 'students',
        submenu: [
          { label: 'All Students', id: 'all-students' },
          { label: 'Add Student', id: 'add-student' },
        ]
      },
      { 
        icon: BookOpen, 
        label: 'Teachers', 
        id: 'teachers',
        submenu: [
          { label: 'All Teachers', id: 'all-teachers' },
          { label: 'Add Teacher', id: 'add-teacher' },
        ]
      },
      { icon: Calendar, label: 'Class Schedule', id: 'schedule' },
      { icon: FileText, label: 'Exam', id: 'exam' },
      { icon: Bell, label: 'Notice', id: 'notice' },
      { icon: Truck, label: 'Transport', id: 'transport' },
      { icon: Settings, label: 'Settings', id: 'settings' },
    ],
    teacher: [
      { icon: Home, label: 'Dashboard', id: 'dashboard' },
      { icon: Users, label: 'My Students', id: 'students' },
      { icon: Calendar, label: 'Schedule', id: 'schedule' },
      { icon: FileText, label: 'Exams', id: 'exams' },
      { icon: FileText, label: 'Exams', id: 'results' },
    ],
    student: [
      { icon: Home, label: 'Dashboard', id: 'dashboard' },
      { icon: Calendar, label: 'My Schedule', id: 'schedule' },
      { icon: FileText, label: 'Exams', id: 'exams' },
      { icon: Clock, label: 'Attendance', id: 'attendance' },
    ]
  };

  const toggleSubmenu = (id) => {
    setExpandedMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className={`
      fixed left-0 top-8 h-auto w-64  shadow-lg 
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0 bg-blue-400' : '-translate-x-full bg-blue-400'}
      overflow-y-auto
      z-40
    `}>
      <div className="p-4">
        {menuItems[userType].map((item) => (
          <div key={item.id}>
            <button
              onClick={() => item.submenu ? toggleSubmenu(item.id) : setActiveItem(item.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1
                transition-colors duration-200
                ${activeItem === item.id ? themeColors[userType].active : 'text-gray-600'}
                ${themeColors[userType].hover}
              `}
            >
              <item.icon size={20} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.submenu && (
                <ChevronDown 
                  size={20} 
                  className={`transform transition-transform duration-200 
                    ${expandedMenus[item.id] ? 'rotate-180' : ''}`
                  }
                />
              )}
            </button>

            {/* Submenu */}
            {item.submenu && (
              <div className={`
                pl-12 space-y-1
                transform transition-all duration-200 ease-in-out
                ${expandedMenus[item.id] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
              `}>
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => setActiveItem(subItem.id)}
                    className={`
                      w-full text-left py-2 px-4 rounded-lg
                      transition-colors duration-200
                      ${activeItem === subItem.id ? themeColors[userType].active : 'text-yellow-600'}
                      ${themeColors[userType].hover}
                    `}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Layout Component
const Nav = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState('admin'); // Can be 'admin', 'teacher', or 'student'
console.log("sidebarOpen",sidebarOpen)
  return (
    <div className="w-full flex flex-col  bg-red-300">
    
      <NavBar 
        userType={userType} 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
      />
    
      <Sidebar 
        isOpen={sidebarOpen} 
        userType={userType}
      />
    <div className="absolute top-12 text-black w-full bg-yellow-300 min-h-[100vh]">All components will be rendered here</div>

      <main className={`
        pt-16 lg:pl-64
        transition-all duration-300
        ${sidebarOpen ? 'ml-64' : 'ml-0'}
        lg:ml-0
      `}>
        {children}
      </main>
    </div>
  );
};

export default Nav;