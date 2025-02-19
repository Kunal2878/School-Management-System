import React, { useState, useEffect } from 'react';
import { GraduationCap, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const AttendanceDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('Class A');
  const [selectedDate, setSelectedDate] = useState('2024-05-05');
  const [isLoading, setIsLoading] = useState(true);
  const [showCharts, setShowCharts] = useState(false);

  // Sample data
  const attendanceData = [
    { day: '1', totalPresent: 8, totalAbsent: 2 },
    { day: '2', totalPresent: 8, totalAbsent: 2 },
    { day: '3', totalPresent: 9, totalAbsent: 1 },
  ];

  const pieData = [
    { name: 'Present', value: 83.3 },
    { name: 'Absent', value: 16.7 },
  ];

  const COLORS = ['#4287f5', '#40c4a7'];

  const classes = ['Class A', 'Class B', 'Class C', 'Class D'];

  // Simulate loading and trigger animations
  useEffect(() => {
    setIsLoading(true);
    setShowCharts(false);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowCharts(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedClass, selectedDate]);

  const statsCards = [
    { title: 'Total Student', value: '10', Icon: GraduationCap },
    { title: 'Total Present', value: '83.3%', Icon: TrendingUp },
    { title: 'Total Absent', value: '16.7%', Icon: TrendingDown },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="p-2 border rounded-md"
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          
          <input 
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border rounded-md"
          />
        </div>
      </div>

      {/* Stats Cards with fade-in animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <div 
            key={card.title}
            className="bg-purple-100 p-4 rounded-lg flex items-center justify-between transform transition-all duration-500 ease-out"
            style={{
              opacity: showCharts ? 1 : 0,
              transform: `translateY(${showCharts ? 0 : '20px'})`,
              transitionDelay: `${index * 100}ms`
            }}
          >
            <div>
              <p className="text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
            <card.Icon className="w-8 h-8 text-purple-500" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div 
          className="bg-white p-4 rounded-lg shadow transform transition-all duration-500 ease-out"
          style={{
            opacity: showCharts ? 1 : 0,
            transform: `translateY(${showCharts ? 0 : '20px'})`,
            transitionDelay: '300ms'
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Attendance</h2>
          <div className="h-64">
            {!isLoading && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Bar 
                    dataKey="totalPresent" 
                    fill="#4287f5" 
                    name="Present"
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Bar 
                    dataKey="totalAbsent" 
                    fill="#40c4a7" 
                    name="Absent"
                    animationBegin={300}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div 
          className="bg-white p-4 rounded-lg shadow transform transition-all duration-500 ease-out"
          style={{
            opacity: showCharts ? 1 : 0,
            transform: `translateY(${showCharts ? 0 : '20px'})`,
            transitionDelay: '400ms'
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Monthly Attendance</h2>
          <div className="h-64">
            {!isLoading && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;