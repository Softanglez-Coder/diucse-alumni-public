import Registration from "../components/auth/Registration";
import Footer from "../components/home/Footer";
import MainNav from "../components/layout/MainNav";

export default function RegistrationPage() {
    return (
        <div>
            <MainNav/>
            <Registration/>
            <Footer/>
        </div>
    );
}