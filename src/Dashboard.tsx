import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define types for navigation items
interface NavItem {
  name: string;
  icon: string;
  section: string;
}

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

// Define user type
interface User {
  email: string;
  name: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

// Sidebar Component
interface SidebarProps {
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: '🎓', section: 'dashboard' },
    { name: 'Profile', icon: '👤', section: 'profile' },
    { name: 'Events', icon: '📅', section: 'events' },
    { name: 'Network', icon: '🤝', section: 'network' },
  ];

  return (
    <div className="w-64 bg-indigo-900 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Alumni Portal</h2>
      <ul>
        {navItems.map((item) => (
          <li
            key={item.section}
            className="mb-4 cursor-pointer hover:bg-indigo-700 p-2 rounded"
            onClick={() => setActiveSection(item.section)}
          >
            <span className="mr-2">{item.icon}</span> {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Dashboard Section
const DashboardSection: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Alumni Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-indigo-100 p-4 rounded shadow">
        <h3 className="font-semibold">Alumni Status</h3>
        <p>Verified Member</p>
      </div>
      <div className="bg-green-100 p-4 rounded shadow">
        <h3 className="font-semibold">Upcoming Events</h3>
        <p>Reunion on June 15, 2025</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded shadow">
        <h3 className="font-semibold">Connections</h3>
        <p>42 Alumni</p>
      </div>
    </div>
  </div>
);

// Profile Section
const ProfileSection: React.FC<{ user: User }> = ({ user }) => {
  const alumni: AlumniProfile = {
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
  };

  return (
    <div className="p-6">
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
          <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// Events Section
const EventsSection: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
    <ul className="bg-white p-4 rounded shadow">
      <li className="border-b py-2">
        Alumni Reunion - June 15, 2025, 6:00 PM
        <button className="ml-4 bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600">
          RSVP
        </button>
      </li>
      <li className="border-b py-2">
        Career Workshop - July 10, 2025, 2:00 PM
        <button className="ml-4 bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600">
          RSVP
        </button>
      </li>
      <li className="py-2">
        Networking Night - August 5, 2025, 7:00 PM
        <button className="ml-4 bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600">
          RSVP
        </button>
      </li>
    </ul>
  </div>
);

// Network Section
const NetworkSection: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Alumni Network</h2>
    <div className="bg-white p-4 rounded shadow">
      <p className="mb-4">
        <strong>Your Connections:</strong>
      </p>
      <ul>
        <li className="border-b py-2">John Lee - Software Engineer, Batch 38</li>
        <li className="border-b py-2">Emily Chen - Data Scientist, Batch 40</li>
        <li className="py-2">Michael Brown - Product Manager, Batch 37</li>
      </ul>
      <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
        Find More Alumni
      </button>
    </div>
  </div>
);

// Main Dashboard Component
const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  const renderSection = (): React.ReactElement => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection user={user} />;
      case 'events':
        return <EventsSection />;
      case 'network':
        return <NetworkSection />;
      default:
        return <DashboardSection />;
    }
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
      <div className="flex flex-1">
        <Sidebar setActiveSection={setActiveSection} />
        <div className="flex-1 bg-gray-100">{renderSection()}</div>
      </div>
    </div>
  );
};

export default Dashboard;