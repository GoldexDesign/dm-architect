import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";

export default function Header() {
  console.log("HEADER RENDERED");

  return (
    <header className={styles.header}>
      {/* Logo na sredini */}
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/images/DM_logo-removebg.png"
            alt="DM Arhitekt Logo"
            width={100}
            height={50}
          />
        </Link>
      </div>

      {/* Navigacija desno */}
      <nav className={styles.nav}>
        <ul>
          <li className={styles.dropdown}>
            <span className={styles.menuButton}>Projects</span>
            <ul className={styles.dropdownMenu}>
              <li>
                <Link href="/projects/residential">Residential</Link>
              </li>
              <li>
                <Link href="/projects/hotels">Hotels</Link>
              </li>
              <li>
                <Link href="/projects/retail">Retail</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/aboutme">About Me</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
