import React from "react";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>2025 © DM ARCHITECT</p>
        <p>Belgrade, Serbia</p>
        <p>EMAIL@email.com</p>
        <a
          href="https://www.instagram.com/dm_architekt/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
