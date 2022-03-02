import { AppProps } from "next/dist/shared/lib/router/router";
import '../styles/globals.css'
import DefaultHeader from "../components/defaultHeader";

function MAI({ Component, pageProps}: AppProps) {
    return (
        <>
        <DefaultHeader />
        <Component {...pageProps} />
        </>
    )
}

export default MAI;