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
            <Link href="/projects" className={styles.menuButton}>
              Projects
            </Link>
            <ul className={styles.dropdownMenu}>
              <li>
                <Link href="/residential">Residential</Link>
              </li>
              <li>
                <Link href="/hotels">Hotels</Link>
              </li>
              <li>
                <Link href="/retail">Retail</Link>
              </li>
            </ul>
          </li>
          {/* About Me */}
          <li>
            <Link href="/aboutme">About Me</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
