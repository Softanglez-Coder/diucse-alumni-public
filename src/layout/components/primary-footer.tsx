import { Link } from "react-router-dom"

export const PrimaryFooter = () => {
    return <div className="bg-gray-800">
        <div className="flex flex-col md:flex-row lg:items-center gap-4">
            <div className="md:flex-1">
                <img src="/images/members.jpg" className="h-full w-full object-cover object-center" />
            </div>


            <div className="p-8 md:flex-1">
                <h2 className="mb-4 text-2xl md:text-3xl lg:text-5xl font-bold text-white">Find an alumni</h2>
                <p className="mb-8 text-gray-400 max-w-[50ch]">Our groups are remarkable network of friendly and engaged alumni sharing a passion and commitment to department of Computer Science and Engineering, Dhaka International University</p>
                
                <Link to="/members" className="btn-primary w-fit">
                    <i className="fa-solid fa-search"></i>
                    <span>Find an alumni</span>
                </Link>
            </div>
        </div>
    </div>
}