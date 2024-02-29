import { MainBanner } from './components/banner'
import banner1 from '../../public/banner1.jpg'
import banner2 from '../../public/banner2.jpg'
import Link from 'next/link'
import welcomeImg from '../../public/map.jpg'
import featured from '../../public/events/event4.jpg'
import featured2 from '../../public/events/lights.jpg'
import Image from 'next/image'
import style from '@/app/ui/featured.module.css'
import { MostLiked } from './components/posts'

export default async function Home(){
    return (
        <>
            <MainBanner
            banner1={banner1}
            banner2={banner2}
            title="Welcome to Eculture"
            ></MainBanner>
            <section className='bg-primary p-2 text-center'>
                <p className='text-neutral'>Join Our Growing Community!</p>
            </section>
            <section className="m-4 lg:m-0 flex flex-col items-center justify-center lg:grid grid-cols-2" style={{ gridTemplateColumns: "2fr 1fr" }}>
                <div className="flex flex-col mx-2 items-center justify-end">
                    <h2 className="text-2xl font-bold text-center mb-4 mt-4">Discover Culture Near You!</h2>
                    <p className="text-lg text-center text-gray-800 mb-8 lg:mx-20 lg:text-justify">
                        Welcome to Eculture! We`re all about bringing culture to you in the most exciting and accessible way possible. On our website, you will find the most recent information about ongoing exhibitions, events, and projects in your city, favorite museum, or other cultural spaces. Dive into a world of art, music, history, and more, right at your fingertips. Let`s explore together!
                    </p>
                    <div className="grid my-4 grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex flex-col items-center justify-center bg-white p-1 rounded-lg shadow-md">
                                <p className=" font-bold text-primary">1000+</p>
                                <p className="text-lg font-semibold text-accent">Events Listed</p>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-white p-1 rounded-lg shadow-md">
                                <p className=" font-bold text-primary">1000+</p>
                                <p className="text-lg font-semibold text-accent text-center">Registered Users</p>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-white p-1 rounded-lg shadow-md">
                                <p className=" font-bold text-primary">1000+</p>
                                <p className="text-lg font-semibold text-accent">Posts</p>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-white p-1 rounded-lg shadow-md">
                                <p className=" font-bold text-primary">95%</p>
                                <p className="text-lg font-semibold text-accent text-center">Positive Feedback</p>
                            </div>
                        </div>
                    <Link href={"/discover"}>
                        <button className="btn bg-secondary hover:bg-primary text-white py-4 px-6 mt-2 rounded-xl mb-8">
                        Get Started
                        </button>
                    </Link>

                </div>
                <div className=" hidden lg:block">
                    <div style={{ width: '180%' }}></div>
                    <div className="flex items-center justify-end">
                        <Image
                        src={welcomeImg}
                        alt='welcome section image'
                        sizes="100vw"
                        className="w-70 lg:w-50"
                        style={{
                            height: 'auto',
                        }}
                        ></Image>
                    </div>
                </div>
            </section>
            
            <section className={style.container}>
                <div className={style.content}>
                    <div className="">
                        <h2 className="">Featured Event: TeamLab Borderless</h2>
                        <p>
                            Immerse yourself in the breathtaking digital art installations at TeamLab Borderless. Explore a world where art, technology, and nature converge to create mesmerizing experiences unlike anything you`ve ever seen before.
                        </p>
                    </div>
                    <div className={style.imagescontent}>
                        <div className="">
                            <Image
                            src={featured}
                            alt='featured event image'
                            width={500}
                            height={500}
                            className='rounded-xl'
                            >
                            </Image>
                        </div>
                        
                        <div className="">
                            <Image
                            src={featured2}
                            alt='featured event image'
                            width={500}
                            height={500}
                            className='rounded-xl justify-self-end'
                            >
                            </Image>
                        </div>
                        
                    </div>
                    <div className="flex justify-center">
                        <Link href={"/discover/4"}>
                           <button className="btn rounded-xl shadow-lg">
                            Learn More
                        </button> 
                        </Link>
                        
                    </div>
                </div>
            </section>

            <section className='m-4'>
                <h2 className='text-center bg-primary text-neutral rounded p-2'>Most liked posts of our community</h2>
                <div className="">
                    <MostLiked></MostLiked>
                </div>
            </section>
            
        </>
    )
}