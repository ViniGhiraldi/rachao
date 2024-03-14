import { Kalam, Londrina_Solid, MuseoModerno } from "next/font/google";

export const museoModerno = MuseoModerno({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: '--font-museo-moderno',
    display: "swap"
});

export const londrinaSolid = Londrina_Solid({
    subsets: ["latin"],
    weight: ["300", "400"],
    variable: '--font-londrina-solid',
    display: "swap"
});

export const kalam = Kalam({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    variable: '--font-kalam',
    display: "swap"
});