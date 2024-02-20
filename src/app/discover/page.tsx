import { EventsList } from "../components/events"
import { Banner } from "../components/banner"
import banner1 from "../../../public/banner3.jpg"

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