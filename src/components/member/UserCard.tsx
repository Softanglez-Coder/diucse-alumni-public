// src/components/member/UserCard.tsx

import React from "react";
import { Member } from "../../constants/member";

interface Props {
  member: Member;
}

const MemberCard: React.FC<Props> = ({ member }) => (
  <div className="border rounded-2xl p-4 flex flex-col items-center w-full md:w-80 shadow">
    {/* Profile image placeholder */}
    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-sm">
      Image
    </div>

    {/* Member information */}
    <div className="mt-4 text-center text-sm space-y-1">
      <p><strong>Name:</strong> {member.name}</p>
      <p><strong>Designation:</strong> {member.designation}</p>
      <p><strong>Institute:</strong> {member.institute}</p>
      <p><strong>Email:</strong> {member.email}</p>
      <p><strong>Mobile:</strong> {member.mobile}</p>
      <p><strong>Level:</strong> {member.level}</p>
      <p><strong>Shift:</strong> {member.shift}</p>
      <p><strong>Batch:</strong> {member.batch}</p>
    </div>
  </div>
);

export default MemberCard;
