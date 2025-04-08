import React from "react";
import { useLanguage } from "../context/LanguageContext";
import styles from "../styles/languageSwitcher.module.css";

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className={styles.switcher}>
      <button
        className={`${styles.button} ${language === "en" ? styles.active : ""}`}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
      <span>|</span>
      <button
        className={`${styles.button} ${language === "sr" ? styles.active : ""}`}
        onClick={() => changeLanguage("sr")}
      >
        SR
      </button>
    </div>
  );
}
