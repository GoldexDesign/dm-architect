import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import en from "../locales/en.json";
import sr from "../locales/sr.json";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language } = useLanguage();
  const t = language === "sr" ? sr : en;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* Language Switcher on the left */}
      <div className={styles.language}>
        <LanguageSwitcher />
      </div>

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
              {t.menu.projects}
            </Link>
            <ul className={styles.dropdownMenu}>
              <li>
                <Link href="/projects/residential" onClick={closeMenu}>
                  {t.menu.residential}
                </Link>
              </li>
              <li>
                <Link href="/projects/hotels" onClick={closeMenu}>
                  {t.menu.hotels}
                </Link>
              </li>
              <li>
                <Link href="/projects/retail" onClick={closeMenu}>
                  {t.menu.retail}
                </Link>
              </li>
            </ul>
          </li>

          <li className={styles.dropdown}>
            <Link
              href="/about"
              className={styles.menuButton}
              onClick={closeMenu}
            >
              {t.menu.about}
            </Link>
            <ul className={styles.dropdownMenu}>
              <li>
                <Link href="/about/info" onClick={closeMenu}>
                  {t.menu.info}
                </Link>
              </li>
              <li>
                <Link href="/about/press" onClick={closeMenu}>
                  {t.menu.press}
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
