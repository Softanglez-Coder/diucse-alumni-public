import EnvironmentInfo from "../../components/environment-info";
import { ComingSoonHome, HomeBanners, HomeBenefits, HomeBlogs, HomeCallToAction, HomeEvents, HomeMap, HomeNews } from "./components";

export const HomePage = () => {
    return <div>
        <ComingSoonHome />
        <HomeBanners />
        <HomeCallToAction />
        <HomeBenefits />
        <HomeEvents />
        <HomeBlogs />
        <HomeNews />
        <HomeMap />

        <EnvironmentInfo />
    </div>
};