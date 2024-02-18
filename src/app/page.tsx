import Banner from "@/app/components/banner";
import banner1 from '../../public/banner1.jpg'
import banner2 from '../../public/banner2.jpg'

export default async function Home(){
    return (
        <main>
            <Banner
            banner1={banner1}
            banner2={banner2}
            title="Welcome to Eculture"
            ></Banner>
        </main>
    )
}
