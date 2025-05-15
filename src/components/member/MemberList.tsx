import Footer from "../layout/Footer";
import MainNav from "../layout/MainNav";
import { members } from "../../constants/member";
import MemberCard from "./UserCard";
export default function MemberList() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <MainNav/>

      {/* Main Content */}
      <main className="flex-grow p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Alumni Member List</h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search Field (Name & Others)"
            className="border p-2 rounded w-full md:w-1/2"
          />
          <input
            type="text"
            placeholder="Filter Bar (Batch, Passing Year, Shift)"
            className="border p-2 rounded w-full md:w-1/2"
          />
        </div>

        {/* Member Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
            Load More
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
