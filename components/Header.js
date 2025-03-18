import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      {/* Logo in the center */}
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

      {/* Navigation on the right */}
      <nav className={styles.nav}>
        <ul>
          {/* Projects with working link and dropdown */}
          <li className={styles.dropdown}>
            <Link href="/projects">
              <a className={styles.menuButton}>Projects</a>
            </Link>
            <ul className={styles.dropdownMenu}>
              <li>
                <Link href="/projects/residential">
                  <a>Residential</a>
                </Link>
              </li>
              <li>
                <Link href="/projects/hotels">
                  <a>Hotels</a>
                </Link>
              </li>
              <li>
                <Link href="/projects/retail">
                  <a>Retail</a>
                </Link>
              </li>
            </ul>
          </li>
          {/* About Me */}
          <li>
            <Link href="/aboutme">
              <a>About Me</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
