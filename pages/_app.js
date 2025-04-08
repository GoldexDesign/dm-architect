import "../styles/global.css";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { LanguageProvider } from "../context/LanguageContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/highlight-fallback.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <LanguageProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
  );
}

export default MyApp;
