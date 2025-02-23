import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../assets/Axios';
import Posts from './Posts';
import Cookies from 'js-cookie'
const DashboardPage = () => {
    const navigate = useNavigate();
    const [userInfo, setuserInfo] = useState(null);
    useEffect(() => {
        if (Cookies.get('accessToken') === null) {
            navigate('/login')
        }
        const user = { userName: Cookies.get('userName'), email: Cookies.get('email'), accessToken: Cookies.get('accessToken') };
        setuserInfo(user);
    }, []);
    const [selectedOption, setSelectedOption] = useState("hyderabad");
    const [data, setData] = useState(null);
    const cities = ['hyderabad', 'khammam', 'wyra', 'gadwal']
    return (
        <>
            <button
                className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                onClick={() => navigate('/dashboard')}
            >
                Dashboard
            </button>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
                    <h2 className="text-xl font-bold mb-4">Select an City</h2>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        {
                            cities.map((ele, index) => {
                                return (
                                    <option key={index} value={ele}>{ele}</option>
                                )
                            })
                        }
                    </select>

                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        onClick={() => navigate(`/posts?city=${selectedOption}`)}
                    >
                        Search
                    </button>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;