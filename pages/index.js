import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/index.module.css";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>DM Arhitekt - Interior Design Studio</title>
        <meta
          name="description"
          content="Discover unique and original interior design projects by DM Arhitekt. High-end architectural solutions for hotels, residential, and retail spaces."
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
        <h1 className={styles.title}>Our Projects</h1>
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
          <h2>About DM Arhitekt</h2>
          <p>
            DM Arhitekt is an interior design studio specializing in high-end
            projects. Our approach combines aesthetics, functionality, and
            originality to create inspiring spaces that stand out. Based in
            Belgrade, Serbia, our work includes hospitality, residential, and
            retail interiors.
          </p>
        </section>
      </main>
    </div>
  );
}
