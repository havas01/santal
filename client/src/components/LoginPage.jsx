import { useState } from 'react';
import axiosInstance from '../assets/Axios';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import Cookies from 'js-cookie';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axiosInstance.post('/login', { email, password });
      const ud = user.data;
      Cookies.set('userName', ud.userName, { sameSite: 'strict' });
      Cookies.set('email', ud.email, { sameSite: 'strict' });
      Cookies.set('accessToken', `${ud.accessToken}`, { sameSite: 'strict' });
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
        <div className="w-full bg-white rounded-2xl shadow-xl sm:max-w-md">
          <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Sign in to your account
            </h1>
            <form className="space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 focus:ring-blue-600 focus:border-blue-600"
                  placeholder="name@company.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 focus:ring-blue-600 focus:border-blue-600"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-blue-600"
                    onClick={() => setRemember(!remember)}
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-200"
                onClick={handleSubmit}
              >
                Sign in
              </button>
              <p className="text-sm text-gray-600 text-center">
                Don’t have an account yet?{' '}
                <Link to = '/signup' className="font-medium text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
