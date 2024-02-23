import { PostList, MostLiked } from "../components/posts";
import { Banner } from "../components/banner";
import banner from "../../../public/banner5.jpg"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Community",
    description: "Eculture community's posts",
  };

export default function Community(){
    return(
        <>
        <Banner
        banner1={banner}
        title="Community"></Banner>
        <PostList></PostList>
        </>
    )
}