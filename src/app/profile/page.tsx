import { User } from "@/app/components/user";
import { Banner} from "../components/banner";
import bannerImg from "../../../public/banner4.jpg";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "User Profile Page",
    description: "Eculture user profile page",
};

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