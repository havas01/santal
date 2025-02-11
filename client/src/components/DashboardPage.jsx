import React from 'react';

const DashboardPage = ({ userInfo }) => {
    console.log(userInfo);
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">User Information</h1>
            <div className="space-y-2">
                {userInfo.userName && (
                    <p>
                        <span className="font-semibold">Name:</span> {userInfo.userName}
                    </p>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;