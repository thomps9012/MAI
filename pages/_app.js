import "../styles/globals.css";
import DefaultHeader from "../components/defaultHeader";
import NavBar from "../components/navbar";

function MAI({ Component, pageProps }) {
  return (
    <>
      <DefaultHeader />
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MAI;
