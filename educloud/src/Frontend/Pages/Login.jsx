  import { useState } from 'react';
  import { Eye, EyeOff, LogIn, Mail, Lock } from 'lucide-react';
  import CryptoJS from 'crypto-js';
  import Cookies from 'js-cookie';
  import { useForm } from 'react-hook-form';
  import Toast from '../Components/Toast'
  const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const url=  import.meta.env.VITE_API_BASE_URL
    // const hashPassword = (password) => {
    //   return CryptoJS.SHA256(password).toString();
    // };

    const onSubmit = async (data) => {
      setLoading(true);
      setError('');

      try {
        // const hashedPassword = hashPassword(data.password);
        const response = await fetch(`${url}/api/v1/principal/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password
          })
        });

        const responseData = await response.json();
        console.log("responseData",responseData)
        if (response.ok) {
          Cookies.set('token', responseData.token, { expires: 7 });
          Cookies.set('user', JSON.stringify(responseData.user), { expires: 7 });
          setToastMessage( 'Login successful!'), 
          setToastIcon('right');
          setShowToast(true);
          window.location.href = '/dashboard';
        } else {
          setToastMessage({ message: responseData.message || 'Login failed', iconName: 'wrong' });
          setShowToast(true);
        }
      } catch (err) {
        setToastMessage( 'Email or password is incorrect. Please try again.'), 
        setToastIcon('wrong');
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {showToast && <Toast message={toastMessage} iconName={toastIcon}  />}
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
             <span className="text-purple-500">Sign in</span>  to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="relative">
                <label htmlFor="email" className="sr-only">Email address</label>
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Email address"
                  {...register("email", { 
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                  })}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">Password</label>
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform transition-all duration-300 hover:scale-105"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn className="h-5 w-5 text-purple-200 group-hover:text-purple-100" />
                </span>
                {loading ?  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default Login;