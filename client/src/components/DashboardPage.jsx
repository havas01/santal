import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [userInfo, setuserInfo] = useState(null);
    useEffect(() => {
        setuserInfo(JSON.parse(localStorage.getItem('details')));
    }, []);
    console.log(userInfo)
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">User Information</h1>
            <div className="space-y-2">
                   { userInfo && (<p>
                        <span className="font-semibold">Name:</span> {userInfo.userName}
                        </p>)
                    }   

            </div>
            <div>
                <button
                    className="px-4 py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;