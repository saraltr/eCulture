import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { User } from "./components/user";

export default async function Home(){
    const session = await getServerSession(authConfig);
    if(session) {
        return <User></User>
    }
    return (
        <main>
            
        </main>

    )
}
