import React from "react";
import Head from "next/head";
import styles from "../../styles/about.module.css";
import { useLanguage } from "../../context/LanguageContext";
import en from "../../locales/en.json";
import sr from "../../locales/sr.json";

export default function PressPage() {
  const { language } = useLanguage();
  const t = language === "sr" ? sr : en;

  const title = `${t.menu.press} | DM ARCHITECT`;
  const description = t.about.press;
  const url = "https://dm-architect.vercel.app/about/press";

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://dm-architect.vercel.app/images/social-preview.jpg"
        />
        <meta property="og:url" content={url} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://dm-architect.vercel.app/images/social-preview.jpg"
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: title,
              description: description,
              url: url,
              publisher: {
                "@type": "Organization",
                name: "DM ARCHITECT",
                url: "https://dm-architect.vercel.app",
              },
            }),
          }}
        />
      </Head>

      <h1>{t.menu.press}</h1>
      <p>{t.about.press}</p>
    </div>
  );
}
