import React from "react";

function Post({ details }) {
    
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4">
      <img 
        src="https://via.placeholder.com/300" 
        alt={details.post.title} 
        className="w-full h-48 object-cover rounded-md"
      />

      <div className="mt-4">
        <h2 className="text-xl font-semibold">{details.post.title}</h2>
        <p className="text-gray-700 mt-2">{details.post.description}</p>

        <div className="mt-3">
          <p className="text-lg font-bold text-blue-600">${details.post.price}</p>
          <p className="text-gray-500">📍 {details.post.location}</p>
          <p className="text-gray-500">🏙️ {details.city}</p>
        </div>

        <p className="mt-3 text-sm text-gray-600">Seller: {details.Name} ({details.email})</p>
      </div>
    </div>
  );
}

export default Post;
