import "../styles/globals.css";
import store from "../utils/store";
import { Provider } from "react-redux";
import Layout from "../components/layout";

function MAI({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MAI;
