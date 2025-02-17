import React, { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("User Name");
  const [bio, setBio] = useState("This is my bio.");
  const [avatar, setAvatar] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Profile</h2>
      <div className="flex flex-col items-center">
        <label htmlFor="avatarUpload">
          <img
            src={avatar || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover cursor-pointer"
          />
        </label>
        <input
          type="file"
          id="avatarUpload"
          className="hidden"
          onChange={handleImageChange}
          accept="image/*"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-4 p-2 border rounded w-full"
          placeholder="Enter your name"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-2 p-2 border rounded w-full"
          placeholder="Enter your bio"
        />
      </div>
    </div>
  );
};

export default Profile;
