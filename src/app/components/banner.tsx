import Image, { StaticImageData } from "next/image";
import style from '@/app/ui/banner.module.css'
import { CheckConnection } from "./connection";

interface BannerProps {
    banner1: StaticImageData;
    banner2?: StaticImageData;
    title: string;
    button?: boolean;
    desc?: string;
}

const Banner: React.FC<BannerProps> = ({ banner1, banner2, title, button, desc }) => {
    return (
        <>
            <section className="sm:hidden text-center" style={{ position: "relative" }}>
                <Image
                    src={banner1}
                    alt='eculture banner1'
                    layout="responsive"
                ></Image>
                <h1 className="menu-title text-2xl text-neutral" style={ { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>{title}</h1>
                {button && (
                    <CheckConnection></CheckConnection>
                )}
            </section>
            <section className="hidden sm:block relative">
            <div className={style.banner}>
                <Image
                    src={banner1}
                    alt='eculture banner1'
                    layout="responsive"
                />
                {banner2 && (
                    <Image
                        src={banner2}
                        alt='eculture banner2'
                        layout="responsive"
                    />
                )}
            </div>
            <h1 className="menu-title text-4xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-headline text-neutral">{title}</h1>
            {desc && <p>{desc}</p>}
            {button && <CheckConnection />}
        </section>

        </>
    );
}

export default Banner