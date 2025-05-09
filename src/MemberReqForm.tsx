import React, { useEffect, useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

interface FormDataType {
  name: string;
  mobile: string;
  email: string;
  country: string;
  profession: string;
  customProfession: string;
  institute: string;
  customInstitute: string;
  designation: string;
  customDesignation: string;
  academicLevel: string;
  customAcademicLevel: string;
  passingYear: string;
  customPassingYear: string;
  batch: string;
  customBatch: string;
  transactionId: string;
}

const professions = ['Engineer', 'Doctor', 'Teacher', 'Developer', 'Businessman', 'Student', 'Other'];
const institutes = ['DIU', 'BUET', 'NSU', 'AIUB', 'Other'];
const designations = ['Software Engineer', 'Manager', 'Lecturer', 'Intern', 'Other'];
const academicLevels = ['BSc', 'MSc', 'PhD', 'Other'];
const passingYears = Array.from({ length: 30 }, (_, i) => `${2025 - i}`).concat('Other');
const batchOptions = Array.from({ length: 80 }, (_, i) => `D-${i + 1}`).concat('Other');

const MembershipRequestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    mobile: '',
    email: '',
    country: '',
    profession: '',
    customProfession: '',
    institute: '',
    customInstitute: '',
    designation: '',
    customDesignation: '',
    academicLevel: '',
    customAcademicLevel: '',
    passingYear: '',
    customPassingYear: '',
    batch: '',
    customBatch: '',
    transactionId: '',
  });

  useEffect(() => {
    const phoneNumber = parsePhoneNumberFromString(formData.mobile);
    if (phoneNumber?.country) {
      const countryName = countries.getName(phoneNumber.country, 'en', { select: 'official' });
      setFormData((prev) => ({
        ...prev,
        country: countryName ?? phoneNumber.country ?? '',
      }));
    }
  }, [formData.mobile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      profession: formData.profession === 'Other' ? formData.customProfession : formData.profession,
      institute: formData.institute === 'Other' ? formData.customInstitute : formData.institute,
      designation: formData.designation === 'Other' ? formData.customDesignation : formData.designation,
      academicLevel: formData.academicLevel === 'Other' ? formData.customAcademicLevel : formData.academicLevel,
      passingYear: formData.passingYear === 'Other' ? formData.customPassingYear : formData.passingYear,
      batch: formData.batch === 'Other' ? formData.customBatch : formData.batch,
    };

    console.log('Form submitted:', finalData);
    // Add your API call here

    // ✅ Reset form
    setFormData({
      name: '',
      mobile: '',
      email: '',
      country: '',
      profession: '',
      customProfession: '',
      institute: '',
      customInstitute: '',
      designation: '',
      customDesignation: '',
      academicLevel: '',
      customAcademicLevel: '',
      passingYear: '',
      customPassingYear: '',
      batch: '',
      customBatch: '',
      transactionId: '',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        DIU CSE Alumni Membership Form
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-md"
      >
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="country" placeholder="Country" value={formData.country} readOnly className="p-2 border rounded bg-gray-100" />

        {/* Profession */}
        <select name="profession" value={formData.profession} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Profession</option>
          {professions.map((prof) => (
            <option key={prof} value={prof}>{prof}</option>
          ))}
        </select>
        {formData.profession === 'Other' && (
          <input type="text" name="customProfession" placeholder="Enter Your Profession" value={formData.customProfession} onChange={handleChange} className="p-2 border rounded" />
        )}

        {/* Institute */}
        <select name="institute" value={formData.institute} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Institute</option>
          {institutes.map((inst) => (
            <option key={inst} value={inst}>{inst}</option>
          ))}
        </select>
        {formData.institute === 'Other' && (
          <input type="text" name="customInstitute" placeholder="Enter Your Institute" value={formData.customInstitute} onChange={handleChange} className="p-2 border rounded" />
        )}

        {/* Designation */}
        <select name="designation" value={formData.designation} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Designation</option>
          {designations.map((des) => (
            <option key={des} value={des}>{des}</option>
          ))}
        </select>
        {formData.designation === 'Other' && (
          <input type="text" name="customDesignation" placeholder="Enter Your Designation" value={formData.customDesignation} onChange={handleChange} className="p-2 border rounded" />
        )}

        {/* Academic Level */}
        <select name="academicLevel" value={formData.academicLevel} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Academic Level</option>
          {academicLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        {formData.academicLevel === 'Other' && (
          <input type="text" name="customAcademicLevel" placeholder="Enter Academic Level" value={formData.customAcademicLevel} onChange={handleChange} className="p-2 border rounded" />
        )}

        {/* Passing Year */}
        <select name="passingYear" value={formData.passingYear} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Passing Year</option>
          {passingYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        {formData.passingYear === 'Other' && (
          <input type="text" name="customPassingYear" placeholder="Enter Passing Year" value={formData.customPassingYear} onChange={handleChange} className="p-2 border rounded" />
        )}

        {/* Batch */}
        <select name="batch" value={formData.batch} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Batch</option>
          {batchOptions.map((batch) => (
            <option key={batch} value={batch}>{batch}</option>
          ))}
        </select>
        {formData.batch === 'Other' && (
          <input type="text" name="customBatch" placeholder="Enter Your Batch" value={formData.customBatch} onChange={handleChange} className="p-2 border rounded" />
        )}

        <input type="text" name="transactionId" placeholder="bKash Transaction ID" value={formData.transactionId} onChange={handleChange} className="p-2 border rounded" />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MembershipRequestForm;
