import React from "react";
import Link from "next/link";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2025 DM Arhitekt - All Rights Reserved</span>
      <Link
        href="https://www.instagram.com/dm_architekt/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Follow us on Instagram
      </Link>
    </footer>
  );
}
