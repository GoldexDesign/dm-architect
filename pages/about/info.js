import React from "react";
import Head from "next/head";
import styles from "../../styles/about.module.css";
import { useLanguage } from "../../context/LanguageContext";
import en from "../../locales/en.json";
import sr from "../../locales/sr.json";

export default function InfoPage() {
  const { language } = useLanguage();
  const t = language === "sr" ? sr : en;

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${t.about.title} | DM ARCHITECT`}</title>
        <meta name="description" content={t.about.info} />
      </Head>

      <h1>{t.about.title}</h1>
      <p>{t.about.info}</p>
    </div>
  );
}
