import { EventDetail } from "@/app/components/events"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Event Page",
    description: "Eculture single event page",
};

export default function DiscoverPage(){
    return(
        <>
            <EventDetail></EventDetail>
        </>
    )
}