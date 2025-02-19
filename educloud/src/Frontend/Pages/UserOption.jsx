import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { UserCircle2, GraduationCap, Users } from 'lucide-react'

const UserOption = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-purple-400 animate-bounce mb-4">
          Edu<span className="text-black">Cloud</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
          Welcome to EduCloud - Your comprehensive educational platform. Choose your role to get started and explore a world of learning possibilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Link
         to="/admin-signup"
          className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
        >
          <UserCircle2 className="w-16 h-16 text-purple-400 group-hover:text-purple-500 transition-colors duration-300" />
          <h2 className="text-xl font-semibold mt-4 text-gray-800">Admin</h2>
          <p className="text-gray-600 text-sm mt-2 text-center">
            Manage the entire platform and oversee all operations
          </p>
        </Link>

        <Link
           to="\teacher-signup"
          className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
        >
          <Users className="w-16 h-16 text-purple-400 group-hover:text-purple-500 transition-colors duration-300" />
          <h2 className="text-xl font-semibold mt-4 text-gray-800">Teacher</h2>
          <p className="text-gray-600 text-sm mt-2 text-center">
            Create courses, manage classes, and track student progress
          </p>
        </Link>

        <Link
         to="\student-signup"
          className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
        >
          <GraduationCap className="w-16 h-16 text-purple-400 group-hover:text-purple-500 transition-colors duration-300" />
          <h2 className="text-xl font-semibold mt-4 text-gray-800">Student</h2>
          <p className="text-gray-600 text-sm mt-2 text-center">
            Access courses, submit assignments, and track your learning journey
          </p>
        </Link>
      </div>
    </div>
  )
}

export default UserOption
