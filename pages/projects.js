import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/projects.module.css";
import preloaderStyles from "../styles/preloader.module.css";

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
      fetch("/projects/all-projects.jsonld")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (!data || !Array.isArray(data.projects)) {
            throw new Error("Invalid JSON structure or empty projects list");
          }
          const formattedProjects = data.projects.map((project) => ({
            id: project.id,
            name: project.name,
            image:
              Array.isArray(project.image) && project.image.length > 0
                ? project.image[0]
                : "https://via.placeholder.com/300x200?text=No+Image",
          }));
          setProjects(formattedProjects);
        })
        .catch((err) => console.error("Error loading projects data:", err));
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

            {/* Open Graph for social sharing */}
            <meta property="og:title" content="All Projects | DM ARCHITECT" />
            <meta
              property="og:description"
              content="Browse all interior design projects by DM ARCHITECT. Unique spaces for hotels, homes, and retail. Based in Belgrade."
            />
            <meta
              property="og:image"
              content="https://dm-architect.vercel.app/images/social-preview.jpg"
            />
            <meta
              property="og:url"
              content="https://dm-architect.vercel.app/projects"
            />
            <meta property="og:type" content="website" />

            {/* Twitter card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="All Projects | DM ARCHITECT" />
            <meta
              name="twitter:description"
              content="View the complete portfolio of DM ARCHITECT interior design projects across various categories."
            />
            <meta
              name="twitter:image"
              content="https://dm-architect.vercel.app/images/social-preview.jpg"
            />

            {/* JSON-LD schema */}
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
                    <Link href={`/projects/${project.id}`}>
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
