import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/index.module.css";

export default function Hotels() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/projects/all-projects.jsonld")
      .then((res) => res.json())
      .then((data) => {
        const allIds = data.projects.map((p) => p.id);

        return Promise.all(
          allIds.map((id) =>
            fetch(`/projects/${id}.jsonld`)
              .then((res) => {
                if (!res.ok) throw new Error(`Failed to load ${id}`);
                return res.json();
              })
              .catch((err) => {
                console.error(`Error loading project "${id}":`, err);
                return null;
              })
          )
        );
      })
      .then((allProjects) => {
        const filtered = allProjects
          .filter((project) => project && project.projectType)
          .filter((project) => {
            const type = project.projectType.toLowerCase();
            return type.includes("hotel");
          });

        setProjects(filtered);
      })
      .catch((err) => console.error("Error loading all-projects.jsonld:", err));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Hotel Projects - DM Arhitekt</title>
        <meta
          name="description"
          content="Explore hotel interior projects by DM Arhitekt. Sophisticated, functional, and modern hospitality designs."
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hotel Projects</h1>
        <div className={styles.projectsGrid}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <Link href={`/projects/${project.id}`}>
                  <img
                    src={
                      Array.isArray(project.image) && project.image.length > 0
                        ? project.image[0]
                        : "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={project.name}
                    className={styles.projectImage}
                  />
                </Link>
                <h2 className={styles.projectName}>{project.name}</h2>
              </div>
            ))
          ) : (
            <p>No hotel projects found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
