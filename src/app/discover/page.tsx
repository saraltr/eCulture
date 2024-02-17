import {EventsList, EventDetail} from "../components/events"

export default function DiscoverPage(){
    return(
        <section className="m-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <EventsList></EventsList>
        </section>
    )
}