import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* Logo in the center */}
      <div className={styles.logo}>
        <Link href="/" onClick={closeMenu}>
          <Image
            src="/images/DM_logo.svg"
            alt="DM Arhitekt Logo"
            width={100}
            height={50}
          />
        </Link>
      </div>

      {/* Hamburger icon (mobile) */}
      <div className={styles.menuToggle} onClick={toggleMenu}>
        ☰
      </div>

      {/* Navigation on the right */}
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        <ul>
          <li className={styles.dropdown}>
            <Link
              href="/projects"
              className={styles.menuButton}
              onClick={closeMenu}
            >
              Projects
            </Link>
            <ul className={styles.dropdownMenu}>
              <li>
                <Link href="/projects/residential" onClick={closeMenu}>
                  Residential
                </Link>
              </li>
              <li>
                <Link href="/projects/hotels" onClick={closeMenu}>
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/projects/retail" onClick={closeMenu}>
                  Retail
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles.about}>
            <Link href="/about" onClick={closeMenu}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
