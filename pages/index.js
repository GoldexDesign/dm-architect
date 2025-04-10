import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/index.module.css";
import preloaderStyles from "../styles/preloader.module.css";

import { useLanguage } from "../context/LanguageContext";
import en from "../locales/en.json";
import sr from "../locales/sr.json";

export default function Home() {
  const { language } = useLanguage();
  const t = language === "sr" ? sr : en;

  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredProjects = [
    {
      id: "japanese-apartment",
      category: "residential",
      name: language === "sr" ? "Stan u japanskom stilu" : "Japanese Apartment",
      image: "/images/japanese-apartment/japanese-apartment-42.jpg",
    },
    {
      id: "fimas-showroom",
      category: "retail",
      name: language === "sr" ? "Fimas Šourum" : "Fimas Showroom",
      image: "/images/fimas-showroom/fimas-showroom-10.jpg",
    },
    {
      id: "enoteka-la-botilleria",
      category: "retail",
      name:
        language === "sr" ? "Enoteka La Botilerija" : "Enoteka La Botilleria",
      image: "/images/enoteka-la-botilleria/enoteka-la-botilleria-08.jpg",
    },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2000);
    const timer2 = setTimeout(() => setShowContent(true), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === featuredProjects.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const canonicalUrl = "https://dm-architect.vercel.app";

  return (
    <>
      {!showContent && (
        <div
          className={`${preloaderStyles.preloader} ${
            fadeOut ? preloaderStyles.fadeOut : ""
          }`}
        >
          <img
            src="/images/DM_logo.svg"
            alt="DM Arhitekt Logo"
            className={preloaderStyles.logo}
          />
        </div>
      )}

      {showContent && (
        <div className={styles.container}>
          <Head>
            <title>DM ARCHITECT - Interior Design Studio</title>
            <meta name="description" content={t.home.description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta
              property="og:title"
              content="DM ARCHITECT - Interior Design Studio"
            />
            <meta property="og:description" content={t.home.description} />
            <meta
              property="og:image"
              content="https://dm-architect.vercel.app/images/social-preview.jpg"
            />
            <meta property="og:url" content={canonicalUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:title"
              content="DM ARCHITECT - Interior Design Studio"
            />
            <meta name="twitter:description" content={t.home.description} />
            <meta
              name="twitter:image"
              content="https://dm-architect.vercel.app/images/social-preview.jpg"
            />

            {/* JSON-LD Structured Data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  name: "DM ARCHITECT",
                  url: canonicalUrl,
                  description: t.home.description,
                  sameAs: ["https://www.instagram.com/dm_architekt/"],
                  publisher: {
                    "@type": "Organization",
                    name: "DM ARCHITECT",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://dm-architect.vercel.app/images/DM_logo.svg",
                    },
                  },
                }),
              }}
            />
          </Head>

          <main className={styles.main}>
            <div className={styles.carousel}>
              <div className={styles.imageWrapper}>
                <Link
                  href={`/projects/${featuredProjects[currentIndex].category}/${featuredProjects[currentIndex].id}`}
                >
                  <img
                    src={featuredProjects[currentIndex].image}
                    alt={featuredProjects[currentIndex].name}
                    className={styles.carouselImage}
                  />
                </Link>

                <button
                  className={styles.arrowLeft}
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === 0 ? featuredProjects.length - 1 : prev - 1
                    )
                  }
                >
                  &#10094;
                </button>

                <button
                  className={styles.arrowRight}
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === featuredProjects.length - 1 ? 0 : prev + 1
                    )
                  }
                >
                  &#10095;
                </button>
              </div>

              <h2 className={styles.projectTitle}>
                {featuredProjects[currentIndex].name}
              </h2>
            </div>

            <section className={styles.description}>
              <h2>{t.about.title}</h2>
              <p>{t.home.description}</p>
            </section>
          </main>
        </div>
      )}
    </>
  );
}
