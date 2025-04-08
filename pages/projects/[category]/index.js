import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/projects.module.css";
import preloaderStyles from "../../../styles/preloader.module.css";

import { useLanguage } from "../../../context/LanguageContext";
import en from "../../../locales/en.json";
import sr from "../../../locales/sr.json";

export default function CategoryProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const router = useRouter();
  const { category } = router.query;

  const { language } = useLanguage();
  const t = language === "sr" ? sr : en;

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2000);
    const timer2 = setTimeout(() => setShowContent(true), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (showContent && category) {
      fetch("/projects/all-projects.jsonld")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.projects.filter(
            (proj) =>
              proj.category &&
              proj.category.toLowerCase() === category.toLowerCase()
          );

          const mapped = filtered.map((proj) => ({
            ...proj,
            name:
              typeof proj.name === "object"
                ? proj.name[language] || proj.name.en
                : proj.name,
            image:
              Array.isArray(proj.image) && proj.image.length > 0
                ? proj.image[0]
                : "https://via.placeholder.com/300x200?text=No+Image",
          }));

          setProjects(mapped);
        })
        .catch((err) => {
          console.error("Error loading category projects:", err);
        });
    }
  }, [showContent, category, language]);

  const categoryName =
    category === "residential"
      ? t.menu.residential
      : category === "retail"
      ? t.menu.retail
      : category === "hotels"
      ? t.menu.hotels
      : category;

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
            <title>{categoryName} | DM ARCHITECT</title>
            <meta
              name="description"
              content={`All ${categoryName} projects by DM ARCHITECT.`}
            />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>{categoryName}</h1>

            <div className={styles.projectsGrid}>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project.id} className={styles.projectCard}>
                    <Link href={`/projects/${project.category}/${project.id}`}>
                      <img
                        src={project.image}
                        alt={project.name}
                        className={styles.projectImage}
                      />
                    </Link>
                    <h2 className={styles.projectName}>{project.name}</h2>
                  </div>
                ))
              ) : (
                <p>No projects found.</p>
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
}
