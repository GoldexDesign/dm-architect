import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/index.module.css";

export default function Retail() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projectFiles = ["hotel-sky", "la-botilleria"];

    Promise.all(
      projectFiles.map((id) =>
        fetch(`/projects/${id}.jsonld`).then((res) => {
          if (!res.ok) throw new Error(`Failed to load ${id}`);
          return res.json();
        })
      )
    )
      .then((allProjects) => {
        const filtered = allProjects.filter((project) =>
          project.projectType.toLowerCase().includes("retail")
        );
        setProjects(filtered);
      })
      .catch((err) => console.error("Error loading retail projects:", err));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Retail Projects - DM Arhitekt</title>
        <meta
          name="description"
          content="Explore retail interior design projects by DM Arhitekt – tailored, functional, and inspiring commercial spaces."
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Retail Projects</h1>
        <div className={styles.projectsGrid}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <Link href={`/projects/${project.id}`}>
                  <img
                    src={project.image[0]}
                    alt={project.name}
                    className={styles.projectImage}
                  />
                </Link>
                <h2 className={styles.projectName}>{project.name}</h2>
              </div>
            ))
          ) : (
            <p>No retail projects found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
