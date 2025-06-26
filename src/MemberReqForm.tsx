import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormDataType {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormDataType>>({});
  const navigate = useNavigate();

  // Validation functions
  const validateName = (name: string): string | null => {
    if (name.length < 3 || name.length > 50) {
      return 'Name must be between 3 and 50 characters.';
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return 'Name can only contain letters and spaces.';
    }
    return null;
  };

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return null;
  };

  const validatePassword = (password: string): string | null => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.';
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (nameError || emailError || passwordError) {
      setErrors({
        name: nameError || '',
        email: emailError || '',
        password: passwordError || '',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || 'Registration successful!');
        setFormData({ name: '', email: '', password: '' });
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Registration failed. Please check your input.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error connecting to server.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Registration Form
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={`p-2 border rounded w-full ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`p-2 border rounded w-full ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`p-2 border rounded w-full ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;