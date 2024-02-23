import { EventsList } from "../components/events"
import { Banner } from "../components/banner"
import banner1 from "../../../public/banner3.jpg"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Discover",
    description: "Eculture discover events page",
};


export default function DiscoverPage(){
    return(
        <>
            <Banner
            banner1={banner1}
            title="Discover"
            ></Banner>
            <EventsList></EventsList>
        </>
    )
}