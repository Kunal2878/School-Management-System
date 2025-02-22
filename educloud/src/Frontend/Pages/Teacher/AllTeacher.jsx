import React, { useState, useEffect } from 'react';
import { Search, Trash2, PenSquare,GraduationCap } from 'lucide-react';

const TeacherDetails = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState('Last 30 days');
  const [selectedClass, setSelectedClass] = useState('all');
  const teachersPerPage = 10;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://school-backend-ocze.onrender.com/api/v1/teacher/all-teachers');
        const data = await response.json();
        
        if (data.statusCode === 200) {
          setTeachers(data.data.teachers);
        } else {
          setError('Failed to fetch teachers');
        }
      } catch (err) {
        setError('Error connecting to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Filter teachers based on search and class
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedClass === 'all' || teacher.assignedClasses.includes(selectedClass))
  );

  // Pagination
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen mt-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row text-gray-600 justify-between items-start md:items-center mb-6 bg-purple-50 p-2">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold mb-2">All Teachers </h1>
          <div className="flex items-center text-sm ">
            <span className="mr-2">Home /</span>
            <span >Teachers</span>
          </div>
        </div>
        <button className="px-4 py-2 bg-purple-500 text-sm text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 transform hover:scale-105">
          + Add Teacher
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md bg-slate-200 text-gray-600">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  " size={20} />
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          />
        </div>
        
        <div className="flex gap-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="p-2 mr-4 bg-slate-200 text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          >
            <option value="all">All Classes</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
            <option value="class3">Class 3</option>
          </select>
          {/* <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          >
            <option>Last 30 days</option>
            <option>Last 60 days</option>
            <option>Last 90 days</option>
          </select> */}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-gray-600 text-xs">
        <table className="w-full min-w-[768px] pb-10">
          <thead className='bg-purple-50'>
            <tr className="border-b">
              <th className="p-4">
                <input type="checkbox" className="rounded bg-white" />
              </th>
              <th className="p-4 text-left">Teacher's Name</th>
              <th className="p-4 text-center">Email</th>
              <th className="p-4 text-center">Subjects</th>
              <th className="p-4 text-center">Assigned Classes</th>
              <th className="p-4 text-center">Role</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTeachers.map((teacher) => (
              <tr
                key={teacher._id}
                className="border-b hover:bg-gray-50 transition-colors duration-150 animate-fade-in"
              >
                <td className="p-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full overflow-hidden flex flex-row justify-center items-center">
                    <GraduationCap size={20}/>
                    </div>
                    <span className="hover:text-purple-500 transition-colors duration-200">
                      {teacher.name}
                    </span>
                  </div>
                </td>
                <td className="p-4">{teacher.email}</td>
                <td className="p-4">{teacher.subject.length ? teacher.subject.join(', ') : '-'}</td>
                <td className="p-4">{teacher.assignedClasses.length ? teacher.assignedClasses.join(', ') : '-'}</td>
                <td className="p-4">{teacher.role || '-'}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-1 hover:text-red-500 transition-colors duration-200 transform hover:scale-110">
                      <Trash2 size={18} />
                    </button>
                    <button className="p-1 hover:text-purple-500 transition-colors duration-200 transform hover:scale-110">
                      <PenSquare size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <span className="text-sm text-gray-600">
            Showing {indexOfFirstTeacher + 1} to {Math.min(indexOfLastTeacher, filteredTeachers.length)} of {filteredTeachers.length} entries
          </span>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded transition-all duration-200 transform hover:scale-105 ${
                  currentPage === i + 1
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = document.createElement('style');
styles.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(styles);

export default TeacherDetails;