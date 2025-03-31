import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/index.module.css";
import preloaderStyles from "../styles/preloader.module.css";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredProjects = [
    {
      id: "japanese-apartment",
      category: "residential",
      name: "Japanese Apartment",
      image: "/images/japanese-apartment/japanese-apartment-42.jpg",
    },
    {
      id: "fimas-showroom",
      category: "retail",
      name: "Fimas Showroom",
      image: "/images/fimas-showroom/fimas-showroom-10.jpg",
    },
    {
      id: "la-botilleria",
      category: "retail",
      name: "La Botilleria",
      image: "/images/la-botilleria/la-botilleria-08.jpg",
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
            <meta
              name="description"
              content="Discover unique and original interior design projects by DM ARCHITECT. High-end architectural solutions for hotels, residential, and retail spaces."
            />
            <meta
              property="og:image"
              content="https://dm-architect.vercel.app/images/social-preview.jpg"
            />
            <meta
              property="og:url"
              content="https://dm-architect.vercel.app/"
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
              <h2>About DM ARCHITECT</h2>
              <p>
                DM ARCHITECT is an interior design studio specializing in
                high-end projects. Our approach combines aesthetics,
                functionality, and originality to create inspiring spaces that
                stand out. Based in Belgrade, Serbia, our work includes
                hospitality, residential, and retail interiors.
              </p>
            </section>
          </main>
        </div>
      )}
    </>
  );
}
