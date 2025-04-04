import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/projects.module.css";
import preloaderStyles from "../styles/preloader.module.css";

const projectFiles = [
  "hotel-sky",
  "enoteka-la-botilleria",
  "japanese-apartment",
  "fimas-showroom",
  "scavolini-store",
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2000);
    const timer2 = setTimeout(() => setShowContent(true), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (showContent) {
      Promise.all(
        projectFiles.map((id) =>
          fetch(`/projects/${id}.jsonld`)
            .then((res) => res.json())
            .then((data) => ({
              id: data.id,
              name: data.name,
              category: data.projectType.toLowerCase(), // hotels, retail, etc.
              image:
                Array.isArray(data.image) && data.image.length > 0
                  ? data.image[0]
                  : "https://via.placeholder.com/300x200?text=No+Image",
              constructionYear: parseInt(data.year?.construction) || 0,
              description: data.description || "",
            }))
            .catch((err) => {
              console.error(`Failed to load ${id}.jsonld`, err);
              return null;
            })
        )
      ).then((results) => {
        const validProjects = results.filter((p) => p !== null);
        const sorted = validProjects.sort(
          (a, b) => b.constructionYear - a.constructionYear
        );
        setProjects(sorted);
      });
    }
  }, [showContent]);

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
            <title>All Projects | DM ARCHITECT</title>
            <meta
              name="description"
              content="Browse all interior design projects by DM ARCHITECT studio. Discover our original designs for hotels, residential, and retail spaces."
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  projects: projects,
                }),
              }}
            />
          </Head>

          <main className={styles.main}>
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
                <p>Loading projects...</p>
              )}
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
