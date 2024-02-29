import Image, { StaticImageData } from "next/image";

interface BannerProps {
    banner1: StaticImageData;
    banner2?: StaticImageData;
    title: string;
    desc?: string;
}

const MainBanner: React.FC<BannerProps> = ({ banner1, banner2, title, desc }) => {
    return (
        <>
            <section className="relative sm:hidden text-center overflow-y-hidden">
                <div className=" h-[250px] md:h-[350px] bg-secondary relative ">
                   <Image
                    src={banner1}
                    alt='eculture banner1'
                    priority
                    fill={true}
                    style={{objectFit:"cover"}}
                    className="object-center"
                    ></Image> 
                </div>
                
                <h1 className="bg-secondary bg-opacity-50 bg-rounded-2xl menu-title text-4xl md:text-5xl text-neutral absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{title}</h1>
            </section>

            <section className="hidden sm:block relative">
                <div className="flex bg-secondary">
                    <Image
                        src={banner1}
                        alt='eculture banner1'
                        priority
                        layout="responsive"
                    />
                    {banner2 && (
                        <Image
                            src={banner2}
                            alt='eculture banner2'
                            priority
                            layout="responsive"
                        />
                    )}
                </div>
                <h1 className="bg-secondary bg-opacity-70 rounded-2xl menu-title text-4xl md:text-6xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-neutral">{title}</h1>
                {desc && <p>{desc}</p>}
            </section>        
        </>
    );
}


const Banner: React.FC<BannerProps> = ({ banner1, title }) => {
    return (
        <>
            <section className="relative text-center">
                <div className=" h-[250px] md:h-[300px] bg-secondary overflow-hidden relative ">
                   <Image
                    src={banner1}
                    alt='eculture banner1'
                    priority
                    fill={true}
                    style={{objectFit:"cover"}}
                    className="object-center"
                    ></Image> 
                </div>
                
                <h1 className="menu-title text-4xl md:text-6xl text-neutral absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{title}</h1>
            </section>
       
        </>
    );
}

export { MainBanner, Banner };