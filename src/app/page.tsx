import { MainBanner } from './components/banner'
import banner1 from '../../public/banner1.jpg'
import banner2 from '../../public/banner2.jpg'

export default async function Home(){
    return (
        <main>
            <MainBanner
            banner1={banner1}
            banner2={banner2}
            title="Welcome to Eculture"
            ></MainBanner>
        </main>
    )
}