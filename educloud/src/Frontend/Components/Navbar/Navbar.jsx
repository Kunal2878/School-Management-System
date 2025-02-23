import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setData } from '../../../Store/slice';
import AttendanceDashboard from '../AttendanceSystem/Attendance'
import ClassAttendanceTracker from '../AttendanceSystem/MarkAttendanceByClass'
import ProfilePage from '../../Pages/AboutMe'
import StudentDetails from '../Classes/AllStudents'
import TeacherDetails from '../../Pages/Teacher/AllTeacher'
import AssignClassSub from '../../Pages/Teacher/AssignClassSub'
import Events from '../../Pages/Events'
import RegisterClass from '../../Pages/Classes/RegisterClass'

import { 
  Home, 
  AlignLeft,
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
  GraduationCap,
  LogOut
} from 'lucide-react';
import { path } from 'framer-motion/client';





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
    <nav className="w-full  shadow-lg fixed flex flex-row top-0 z-50 bg-slate-200 pr-4 p-2">
     
        <div className="w-full flex flex-row  justify-between items-center">
          {/* Left side */}
     
            <div className="flex items-center space-x-3 gap-4">
              <button 
                onClick={onMenuClick}
                className=" ml-6 rounded-md  transition-colors cursor-pointer"
              >
                <AlignLeft size={24} className='text-purple-500' />
              </button>
              {/* <School size={24} className="text-purple-500" /> */}
              <span className="text-xl font-bold text-black"><span className="text-purple-500">Edu</span>Cloud</span>
            
            
            </div>
           
          


          <div className="flex flex-row items-center space-x-4">
            <button className="p-2  rounded-full transition-colors">
              <Bell size={20} className='text-purple-500' />
            </button>
            
              <button
                onClick={handleSignOut}
                className="p-1 w-24 rounded-md transition-colors cursor-ponter text-purple-500 border-2 border-purple-500 flex flex-row justify-center items-center "
              >
              <LogOut size={12} className="text-purple-500 text-xs mr-1 " />  <span>Logout</span>
              </button>
         <Link to="/profile" className="rounded-full size-8 text-purple-500 border-2 border-purple-500"><span>👤</span></Link>

         


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
          { label: 'All Teachers', id: 'all-teachers',path:'/all-teachers' },
          { label: 'Assign classes/Subjects', id: 'assign-classes-subjects',path:'/assign-classes-subjects' },
        ]
      },
      { icon: BookOpen, label: 'Classes', id: 'classes', path:'/register-class' },      
      { icon: FileText, label: 'Exam', id: 'exam', path:'/exams' },
      { icon: Clock, label: 'Time table', id: 'time-table', path:'/time-table' },
      { icon: Calendar, label: 'Events', id: 'events', path:'/events' },
      
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
      fixed left-0 top-14 h-screen w-64 shadow-lg 
      bg-gray-50 transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0 ' : '-translate-x-full'}
      overflow-y-auto
      z-40
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-slate-200
      [&::-webkit-scrollbar-thumb]:rounded-full
    `}>
      <div className="p-4">
        {menuItems[userType].map((item) => (
          <div key={item.id}>
            {item.submenu ? (
              <button
                onClick={() => toggleSubmenu(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1
                  transition-colors duration-200
                  ${activeItem === item.id ? themeColors[userType].active : 'text-black'}
                  ${themeColors[userType].hover}
                `}
              >
                <item.icon size={20} />
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronDown 
                  size={20} 
                  className={`transform transition-transform duration-200 
                    ${expandedMenus[item.id] ? 'rotate-180' : ''}`
                  }
                />
              </button>
            ) : (
              <Link to={item.path || '/'}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1
                    transition-colors duration-200
                    ${activeItem === item.id ? themeColors[userType].active : 'text-black'}
                    ${themeColors[userType].hover}
                  `}
                >
                  <item.icon size={20} />
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              </Link>
            )}

            {/* Submenu */}
            {item.submenu && (
              <div className={`
                pl-12 space-y-1
                transform transition-all duration-200 ease-in-out
                ${expandedMenus[item.id] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
              `}>
                {item.submenu.map((subItem) => (
                  <Link key={subItem.id} to={subItem.path}>
                    <button
                      onClick={() => setActiveItem(subItem.id)}
                      className={`
                        w-full text-left py-2 px-4 rounded-lg
                        transition-colors duration-200
                        ${activeItem === subItem.id ? 'text-purple-500' : 'text-black'}
                        ${themeColors[userType].hover}
                      `}
                    >
                      {subItem.label}
                    </button>
                  </Link>
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
<div className="w-full min-h-screen absolute top-0 mt-16 bg-slate-200">
{path === '/dashboard' && <AttendanceDashboard />}
{path === '/mark-attendance' && <ClassAttendanceTracker />}
{path === '/profile' && <ProfilePage />}
{path === '/all-students' && <StudentDetails />}
{path === '/all-teachers' && <TeacherDetails />}
{path === '/assign-classes-subjects' && <AssignClassSub />}
{path === '/events' && <Events />}
{path === '/register-class' && <RegisterClass />}

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