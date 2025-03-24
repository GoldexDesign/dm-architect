import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/index.module.css";

export default function Residential() {
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
        const fetchDetails = async () => {
          const filtered = [];
          for (const project of data.projects) {
            try {
              const response = await fetch(`/projects/${project.id}.jsonld`);
              const details = await response.json();
              if (details.projectType === "Residential") {
                filtered.push({
                  id: project.id,
                  name: project.name,
                  image:
                    Array.isArray(project.image) && project.image.length > 0
                      ? project.image[0]
                      : null,
                });
              }
            } catch (error) {
              console.error(`Failed to load ${project.id}.jsonld`, error);
            }
          }
          setProjects(filtered);
        };
        fetchDetails();
      })
      .catch((err) => console.error("Error loading projects data:", err));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Residential Projects | DM Arhitekt</title>
        <meta
          name="description"
          content="Explore our residential interior design projects. Japanese apartments, modern homes, and unique living spaces by DM Arhitekt."
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Residential Projects</h1>
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
      </main>
    </div>
  );
}
