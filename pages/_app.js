import "../styles/globals.css";
import Layout from "../components/layout";

function MAI({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MAI;
