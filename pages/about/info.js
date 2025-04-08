import React from "react";
import styles from "../../styles/about.module.css";
import { useLanguage } from "../../context/LanguageContext";
import en from "../../locales/en.json";
import sr from "../../locales/sr.json";

export default function InfoPage() {
  const { language } = useLanguage();
  const t = language === "sr" ? sr : en;

  return (
    <div className={styles.container}>
      <h1>{t.about.title}</h1>
      <p>{t.about.info}</p>
    </div>
  );
}
