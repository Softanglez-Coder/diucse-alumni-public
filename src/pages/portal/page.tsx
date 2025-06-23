import { Link, Outlet } from "react-router-dom"

export const PortalPage = () => {
    return <div>
        <aside>
            <Link to="/portal/dashboard">Dashboard</Link>
            <Link to="/portal/membership">Membership</Link>
        </aside>
        <main>
            <Outlet />
        </main>
    </div>
}