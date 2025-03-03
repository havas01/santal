import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../assets/Axios';
import Cookies from 'js-cookie';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [selectedOption, setSelectedOption] = useState("hyderabad");
    const cities = ['hyderabad', 'khammam', 'wyra', 'gadwal'];
    const [personalPosts, setPersonalPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchUserPosts = async () => {
        try {
            setIsLoading(true);
            const data = await axiosInstance.get('/personalPosts', {
                headers : {
                Authorization : `Bearer ${Cookies.get('accessToken')}`,
                email : Cookies.get('email')
            }
            });
            const posts = data.data.map((curr) => {
                return { ...curr.post, id: curr._id };
            });
            setUserPosts(posts)
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user posts:", error);
        }
    };
    useEffect(() => {
        if (!Cookies.get('accessToken')|| !Cookies.get('userName')) {
            navigate('/login');
        }
        const user = { 
            userName: Cookies.get('userName'), 
            email: Cookies.get('email'), 
            accessToken: Cookies.get('accessToken') 
        };

        setUserInfo(user);
        fetchUserPosts();
    }, [navigate]);
    const deletePost = async (id) => {
        try {
            await axiosInstance.delete('/personalPosts/' + id, {
                headers : {
                    Authorization : `Bearer ${Cookies.get('accessToken')}`,
                    email : Cookies.get('email')
                }
            });
            fetchUserPosts();
        } catch (error) {
            
        }
    }
    const handleLogout = () => {
        Cookies.remove('userName');
        Cookies.remove('email');
        Cookies.remove('accessToken');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <nav className="bg-white shadow-md px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="text-xl font-semibold text-gray-800">CityMarket</span>
                    </div>
                    
                    {userInfo && (
                        <div className="flex items-center space-x-4">
                            <div className="text-gray-700">
                                <span className="font-medium">Welcome, </span>
                                <span className="text-blue-600 font-bold">{userInfo.userName}</span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                            <div className="bg-blue-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white">Find Items</h2>
                            </div>
                            
                            <div className="p-6">
                                <div className="mb-4">
                                    <label htmlFor="city-select" className="block text-gray-700 font-medium mb-2">
                                        Select a City
                                    </label>
                                    <select
                                        id="city-select"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                        value={selectedOption}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                    >
                                        {cities.map((city, index) => (
                                            <option key={index} value={city}>
                                                {city.charAt(0).toUpperCase() + city.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <button
                                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    onClick={() => navigate(`/posts?city=${selectedOption}`)}
                                >
                                    <div className="flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Search
                                    </div>
                                </button>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Have something to sell?</h3>
                            <button
                                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                onClick={() => {
                                    navigate('/list')
                                }}
                            >
                                <div className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create New Listing
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-blue-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white">Your Listed Items</h2>
                            </div>
                            
                            <div className="p-6">
                                {isLoading ? (
                                    <div className="text-center py-8">
                                        <svg className="animate-spin h-8 w-8 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <p className="mt-3 text-gray-600">Loading your posts...</p>
                                    </div>
                                ) : userPosts.length > 0 ? (
                                    <div className="space-y-6">
                                        {userPosts.map(post => (
                                            <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                                                        <p className="text-gray-600 mt-1">{post.description}</p>
                                                        <div className="mt-3 flex items-center space-x-4">
                                                            <span className="text-blue-600 font-bold">${post.price}</span>
                                                            <span className="text-gray-500">📍 {post.city}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-full transition duration-200 cursor-pointer"
                                                        onClick={() => deletePost(post.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <h3 className="mt-4 text-xl font-medium text-gray-700">No listings yet</h3>
                                        <p className="mt-2 text-gray-500">You haven't posted any items for sale.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;