import React from 'react';
import { 
  Phone, 
  Mail, 
  Home, 
  Briefcase, 
  User, 
  Calendar,
  MapPin,
  Hash,
  GraduationCap
} from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-4xl mx-auto  rounded-lg shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">About Me</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Info Section */}
            <div className="space-y-6 animate-fade-in bg-white shadow-md rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <GraduationCap size={20} className="text-purple-500"/>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Rakesh Paul</h2>
                  <p className="text-gray-600 italic">Principal</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-400">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-500">First Name</label>
                    <p className="font-medium italic">Rakesh</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-500">Last Name</label>
                    <p className="font-medium italic">Paul</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-gray-400">
                  <div>
                    <label className="text-sm font-bold text-gray-500">Father Name</label>
                    <p className="font-medium italic">John Paul</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-500">Mother Name</label>
                    <p className="font-medium italic">Rumi Paul</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-gray-400 bg-white">
                  <div>
                    <label className="text-sm font-bold text-gray-500">Occupation</label>
                    <p className="font-medium italic">Teacher</p>
                    <div className="flex items-center space-x-2">
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-500">Status</label>
                    <p className="font-medium italic">Working</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6 animate-fade-in-delayed text-gray-400 bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-xl font-bold">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded transition-colors">
                  <Phone className="w-5 h-5 text-purple-500" />
                  <div>
                    <label className="text-sm font-bold text-gray-500">Primary Phone</label>
                    <p className="font-medium italic">+915377299</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded transition-colors">
                  <Mail className="w-5 h-5 text-purple-500" />
                  <div>
                    <label className="text-sm font-bold text-gray-500">Primary Email</label>
                    <p className="font-medium italic">rakesh@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded transition-colors">
                  <Home className="w-5 h-5 text-purple-500" />
                  <div>
                    <label className="text-sm font-bold text-gray-500">Address</label>
                    <p className="font-medium italic">Meadowview, Springfield</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded transition-colors">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <div>
                    <label className="text-sm font-bold text-gray-500">Street</label>
                    <p className="font-medium italic">Elm Street, 62701</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// Add these styles to your global CSS or Tailwind config
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-fade-in-delayed {
  animation: fadeIn 0.5s ease-out 0.2s forwards;
  opacity: 0;
}
`;