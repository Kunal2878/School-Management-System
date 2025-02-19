import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setData } from '../../../Store/slice';
import AttendanceDashboard from '../AttendanceSystem/Attendance'
import ClassAttendanceTracker from '../AttendanceSystem/MarkAttendanceByClass'
import ProfilePage from '../../Pages/AboutMe'
import StudentDetails from '../Classes/AllStudents'
import { 
  Home, 
  User,
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
  School,
  GraduationCap
} from 'lucide-react';





const themeColors = {
  admin: 'bg-purple-400',
//   teacher: 'bg-purple-600',
//   student: 'bg-green-600'
};

const NavBar = ({ User,onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    window.location.href = '/login';
  };

  return (
    <nav className="w-full  bg-purple-400 shadow-lg fixed flex flex-row top-0 z-50">
     
        <div className="w-full flex flex-row  justify-between items-center">
          {/* Left side */}
     
            <button 
              onClick={onMenuClick}
              className=" ml-3 rounded-md  transition-colors"
            >
              <Menu size={24} />
            </button>
           
              <School className="h-8 w-8 space-x-1" />
              <span className="text-xl font-bold hidden md:block">{User?.name||''}</span>
           
          

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
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <button onClick={handleSignOut} className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
              </div>
            </div>
          </div>
          
        </div>
     
    </nav>
  );
};

const Sidebar = ({ isOpen, userType = 'admin' }) => {
const [menuOpen, setMenuOpen]=useState(false)
 
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
          { label: 'All Students', id: 'all-students', path:'/all-students'},
          { label: 'Add Student', id: 'add-student', path:'/add-students'},
          { label: 'Attendance', id: 'attendance',path:'/mark-attendance' },
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
      { icon: Truck, label: 'Transport', id: 'transport' },
      { icon: Calendar, label: 'Events', id: 'events' },
      { icon: Bell, label: 'Announcement', id: 'announcement' },
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
    <div className={`text-black
      fixed left-0 top-8 h-[100vh-4em] w-64 shadow-lg 
      transform transition-transform duration-300 ease-in-out overflow-y-auto
      ${isOpen ? 'translate-x-0 bg-purple-100' : '-translate-x-full bg-purple-200'}
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
                ${activeItem === item.id ? themeColors[userType].active : 'text-black'}
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
                  <Link to={subItem.path}> {subItem.label}</Link> 
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
const Nav = ({ children, path }) => {
  const dispatch = useDispatch()
  const User = JSON.parse(Cookies.get('user')) || '{}';
  if(User !== null || User !== undefined) {
    dispatch(setData(User))
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState('admin'); 
  const name = useSelector((state) => state.userData.name)
  const email = useSelector((state) => state.userData.email)
  const role = useSelector((state) => state.userData.role)

  return (
    <div className="w-full flex flex-col">
      <NavBar 
        User={User} 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
      />
      <Sidebar 
        isOpen={sidebarOpen} 
        userType={userType}
      />
<div clssName="w-full min-h-screen absolute top-0 mt-16">
{path === '/dashboard' && <AttendanceDashboard />}
{path === '/mark-attendance' && <ClassAttendanceTracker />}
{path === '/profile' && <ProfilePage />}
{path === '/all-students' && <StudentDetails />}

</div>

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