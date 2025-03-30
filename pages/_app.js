import "../styles/global.css";
import Layout from "../components/Layout";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/highlight-fallback.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
