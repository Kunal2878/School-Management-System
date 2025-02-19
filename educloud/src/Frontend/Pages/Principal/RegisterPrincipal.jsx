  import { useState } from 'react';
  import { useForm } from 'react-hook-form';
  import dotenv from 'dotenv'
  import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Briefcase } from 'lucide-react';
  import { Link } from 'react-router-dom';
  import Toast from '../../Components/Toast'
  const RegisterPrincipal = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const url=  import.meta.env.VITE_API_BASE_URL
    const onSubmit = async (data) => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/api/v1/principal/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          setToastMessage("Registration successful");
          setToastIcon("right");
          setShowToast(true);
        } else {
          setToastMessage("Registration failed");
          setToastIcon("wrong");
          setShowToast(true);
        }
      } catch (error) {
        setToastMessage("An error occurred during registration");
        setToastIcon("wrong");
        setShowToast(true);
        console.error(error);
      }
      setLoading(false);
    };

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        {showToast && <Toast message={toastMessage} iconName={toastIcon} />}
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-2xl">
          <div className="text-center hover:transform hover:scale-105">
            <h1 className="text-4xl font-bold text-purple-500 mb-2 hover:text-purple-600">Edu Cloud</h1>
            <p className="text-gray-600 hover:text-gray-800">Create your account</p>
          </div>
        
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative hover:translate-y-[-2px]">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-purple-500" />
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 hover:border-purple-500"
                type="text"
                placeholder="Full Name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="relative hover:translate-y-[-2px]">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-purple-500" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 hover:border-purple-500"
                type="email"
                placeholder="Email Address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative hover:translate-y-[-2px]">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-purple-500" />
              <input
                {...register("experience", {
                  required: "Experience is required",
                  min: {
                    value: 0,
                    message: "Experience cannot be negative"
                  }
                })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 hover:border-purple-500"
                type="number"
                placeholder="Experience (in years)"
              />
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>}
            </div>

            <div className="relative hover:translate-y-[-2px]">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-purple-500" />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 hover:border-purple-500"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="relative hover:translate-y-[-2px]">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-purple-500" />
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (val) => {
                    if (watch('password') != val) {
                      return "Passwords do not match";
                    }
                  }
                })}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 hover:border-purple-500"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div className="text-center text-gray-600 mb-4">
              Already have an account? <Link to="/login" className="text-purple-500 hover:text-purple-600">Login here</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 hover:scale-[1.02] hover:shadow-lg"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Sign Up
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default RegisterPrincipal;