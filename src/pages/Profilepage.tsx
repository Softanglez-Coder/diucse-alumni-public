import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// Define type for alumni profile
interface AlumniProfile {
  id: string;
  name: string;
  designation: string;
  institute: string;
  level: string;
  shift: string;
  batch: string;
  email: string;
  mobile: string;
  profileImage: string;
}

interface User {
  email: string;
  name: string;
}

interface ProfilepageProps {
  user: User;
  onLogout: () => void;
}

const Profilepage: React.FC<ProfilepageProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [alumni, setAlumni] = useState<AlumniProfile>({
    id: 'A12345',
    name: user.name,
    designation: 'Software Engineer',
    institute: 'XYZ University',
    level: 'B.Sc',
    shift: 'Day',
    batch: '39',
    email: user.email,
    mobile: '0123456789',
    profileImage: 'https://via.placeholder.com/150',
  });
  const [errors, setErrors] = useState<Partial<AlumniProfile>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<AlumniProfile> = {};

    if (!alumni.name) newErrors.name = 'Full Name is required';
    if (!alumni.designation) newErrors.designation = 'Designation is required';
    if (!alumni.institute) newErrors.institute = 'Institute is required';
    if (!alumni.level) newErrors.level = 'Level is required';
    if (!alumni.shift) newErrors.shift = 'Shift is required';
    if (!alumni.batch) newErrors.batch = 'Batch is required';
    if (!alumni.email) newErrors.email = 'Email is required';
    if (!alumni.mobile) newErrors.mobile = 'Mobile is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsEditing(false);
      // In a real app, save the updated profile to a backend
      console.log('Profile updated:', alumni);
    }
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Welcome, {user.name}!</h1>
        <div className="flex items-center">
          <span className="mr-4">{user.email}</span>
          <button
            onClick={handleLogoutClick}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="p-6 flex-1 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <div className="bg-white p-6 rounded shadow flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={alumni.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500"
            />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="block text-sm font-medium">ID</label>
                  <input
                    type="text"
                    value={alumni.id}
                    disabled
                    className="mt-1 p-2 w-full border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    value={alumni.name}
                    onChange={(e) => setAlumni({ ...alumni, name: e.target.value })}
                    className={`mt-1 p-2 w-full border rounded ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Designation</label>
                  <input
                    type="text"
                    value={alumni.designation}
                    onChange={(e) => setAlumni({ ...alumni, designation: e.target.value })}
                    className={`mt-1 p-2 w-full border rounded ${
                      errors.designation ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.designation && (
                    <p className="text-red-500 text-sm">{errors.designation}</p>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Institute</label>
                  <input
                    type="text"
                    value={alumni.institute}
                    onChange={(e) => setAlumni({ ...alumni, institute: e.target.value })}
                    className={`mt-1 p-2 w-full border rounded ${
                      errors.institute ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.institute && (
                    <p className="text-red-500 text-sm">{errors.institute}</p>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Level</label>
                  <input
                    type="text"
                    value={alumni.level}
                    onChange={(e) => setAlumni({ ...alumni, level: e.target.value })}
                    className={`mt-1 p-2 w-full border rounded ${
                      errors.level ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Shift</label>
                  <input
                    type="text"
                    value={alumni.shift}
                    onChange={(e) => setAlumni({ ...alumni, shift: e.target.value })}
                    className={`mt-1 p-2 w-full border rounded ${
                      errors.shift ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.shift && <p className="text-red-500 text-sm">{errors.shift}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Batch</label>
                  <input
                    type="text"
                    value={alumni.batch}
                    onChange={(e) => setAlumni({ ...alumni, batch: e.target.value })}
                    className={`mt-1 p-2 w-full border rounded ${
                      errors.batch ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.batch && <p className="text-red-500 text-sm">{errors.batch}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={alumni.email}
                    onChange={(e) => setAlumni({ ...alumni, email: e.target.value })}
                    className={`mt-1 p-2 w-full border rounded ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Mobile</label>
                  <input
                    type="text"
                    value={alumni.mobile}
                    onChange={(e) => setAlumni({ ...alumni, mobile: e.target.value })}
                    className={`mt-1 p-2 w-full border rounded ${
                      errors.mobile ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                </div>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <p className="mb-2">
                  <strong>ID:</strong> {alumni.id}
                </p>
                <p className="mb-2">
                  <strong>Full Name:</strong> {alumni.name}
                </p>
                <p className="mb-2">
                  <strong>Designation:</strong> {alumni.designation}
                </p>
                <p className="mb-2">
                  <strong>Institute:</strong> {alumni.institute}
                </p>
                <p className="mb-2">
                  <strong>Level:</strong> {alumni.level}
                </p>
                <p className="mb-2">
                  <strong>Shift:</strong> {alumni.shift}
                </p>
                <p className="mb-2">
                  <strong>Batch:</strong> {alumni.batch}
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> {alumni.email}
                </p>
                <p className="mb-4">
                  <strong>Mobile:</strong> {alumni.mobile}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                >
                  Update Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;