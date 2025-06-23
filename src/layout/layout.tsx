import { Outlet } from "react-router-dom";
import { BottomFooter, PrimaryFooter, PrimaryNav, QuickLinks, TopNav } from "./components";

export const Layout = () => {
    return <div className="min-h-screen flex flex-col font-primary">
        <nav className="sticky top-0 z-50">
            <TopNav />
            <PrimaryNav />
        </nav>

        <main className="flex-1">
            <Outlet />
        </main>

        <footer>
            <PrimaryFooter />
            <QuickLinks />
            <BottomFooter />
        </footer>
    </div>
};