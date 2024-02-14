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
            <section className="sm:hidden" style={{ position: "relative" }}>
                <Image
                    src={banner1}
                    alt='eculture banner1'
                    layout='responsive'
                    width={100}
                    height={100}
                ></Image>
                <h1 className="text-neutral" style={ { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>{title}</h1>
                {button && (
                    <CheckConnection></CheckConnection>
                )}
            </section>
            <section className="hidden sm:block">
                <div className={style.banner} style={{ position: "relative" }}>
                    <Image
                        src={banner1}
                        alt='eculture banner1'
                        layout='responsive'
                        width={100}
                    ></Image>
                    {banner2 &&
                        <Image
                            src={banner2}
                            alt='eculture banner2'
                            layout='responsive'
                            width={100}
                        ></Image>}
                </div>
                <h1 className="font-headline" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>{title}</h1>
                {desc && <p>{desc}</p>}
                {button && (
                    <CheckConnection></CheckConnection>
                )}
            </section>
        </>
    );
}

export default Banner