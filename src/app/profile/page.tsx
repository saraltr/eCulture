import { User } from "@/app/components/user";
import Banner from "../components/banner";
import bannerImg from "../../../public/banner4.jpg";

export default function ProfilePage(){
    return(
        <>
        <Banner 
            banner1={bannerImg}
            title="Profile"></Banner>
        <User></User>
        </>
    )
};