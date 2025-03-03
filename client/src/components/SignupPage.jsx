import React, { useState, useEffect } from 'react';
import axiosInstance from '../assets/Axios';
import { Link, useNavigate } from 'react-router';

export default function SignupPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('signup', { userName: username, email, password });
            navigate('/login');
        } catch (error) {
            console.error("Error signing up: ", error.message);
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
                <div className="w-full bg-white rounded-2xl shadow-xl sm:max-w-md">
                    <div className="p-8 space-y-6">
                        <h1 className="text-2xl font-bold text-gray-800 text-center">
                            Create your account
                        </h1>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-800"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 focus:ring-blue-600 focus:border-blue-600"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-800"
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 focus:ring-blue-600 focus:border-blue-600"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-800"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg block w-full p-2.5 focus:ring-blue-600 focus:border-blue-600"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-200"
                            >
                                Sign Up
                            </button>
                            <p className="text-sm text-gray-600 text-center">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
