import DefaultHeader from "./defaultHeader";
import Footer from "./footer";
import NavBar from "./navbar";

export default function Layout({ children }: any) {
    return <>
        <DefaultHeader />
        <NavBar />
        {children}
        <Footer />
    </>
}