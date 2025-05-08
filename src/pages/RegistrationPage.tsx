import MembershipRequestForm from "../components/auth/Registration";
import Footer from "../components/layout/Footer";
import MainNav from "../components/layout/MainNav";

export default function RegistrationPage() {
    return (
        <div>
            <MainNav/>
            <MembershipRequestForm/>
            <Footer/>
        </div>
    );
}
