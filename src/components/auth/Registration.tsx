import { useState } from "react";

export default function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "",
    academicLevel: "",
    passingYear: "",
    shift: "",
    batch: "",
    rollNo: "",
    profession: "",
    institute: "",
    designation: "",
    paymentType: "",
    transactionId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="min-h-screen bg-[url('../../../public/bg.jpg')] bg-cover bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row w-full max-w-6xl">
        {/* Left Image Section */}
        <div className="md:w-1/2 bg-cover bg-center relative bg-amber-400">
          <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col items-center justify-end p-6 text-white">
            <h2 className="text-xl font-bold mb-2">এখনই আপনার তথ্য দিন!</h2>
            <p className="text-sm text-center">
              নিচের ফর্মটি পূরণ করে রেজিস্ট্রেশন সম্পন্ন করুন এবং আমাদের সেবাসমূহ উপভোগ করুন।
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <form onSubmit={handleSubmit} className="md:w-1/2 p-8 space-y-4">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Registration Form</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="fullName" onChange={handleChange} value={formData.fullName} placeholder="Full Name" className="input" required />
            <input name="phone" onChange={handleChange} value={formData.phone} placeholder="Phone Number" className="input" required />
            <input name="email" onChange={handleChange} value={formData.email} placeholder="Email Address" className="input" required />
            <input name="country" onChange={handleChange} value={formData.country} placeholder="Current Country" className="input" required />

            <select name="academicLevel" onChange={handleChange} value={formData.academicLevel} className="input" required>
              <option value="">Last Academic Level</option>
              <option>BSc</option>
              <option>MSc</option>
              <option>Diploma</option>
              <option>PhD</option>
            </select>

            <input name="passingYear" onChange={handleChange} value={formData.passingYear} placeholder="Passing Year" className="input" required />

            <select name="shift" onChange={handleChange} value={formData.shift} className="input" required>
              <option value="">Shift</option>
              <option>Day</option>
              <option>Evening</option>
            </select>

            <input name="batch" onChange={handleChange} value={formData.batch} placeholder="Batch" className="input" required />
            <input name="rollNo" onChange={handleChange} value={formData.rollNo} placeholder="Roll No" className="input" required />
            <input name="profession" onChange={handleChange} value={formData.profession} placeholder="Profession" className="input" />
            <input name="institute" onChange={handleChange} value={formData.institute} placeholder="Professional Institute" className="input" />
            <input name="designation" onChange={handleChange} value={formData.designation} placeholder="Designation" className="input" />

            <select name="paymentType" onChange={handleChange} value={formData.paymentType} className="input" required>
              <option value="">Payment Type</option>
              <option>bKash</option>
              <option>Nagad</option>
              <option>Bank</option>
              <option>Cash</option>
            </select>

            <input name="transactionId" onChange={handleChange} value={formData.transactionId} placeholder="Payment Transaction ID" className="input" required />
          </div>

          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// Tailwind input style can be added globally or in the component
// For example, in your CSS or Tailwind config:
/*
.input {
  @apply p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500;
}
*/
