import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/index.module.css";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!category) return;

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
        const filtered = allProjects.filter((project) => {
          const typeString = project.projectType?.toLowerCase() || "";
          const typeTags = typeString.split(",").map((s) => s.trim());
          return typeTags.includes(category.toLowerCase());
        });
        setProjects(filtered);
      })
      .catch((err) => console.error("Error loading projects:", err));
  }, [category]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{category} Projects - DM Arhitekt</title>
        <meta
          name="description"
          content={`Explore ${category} interior projects by DM Arhitekt.`}
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{category} Projects</h1>
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
            <p>No projects found for category: {category}</p>
          )}
        </div>
      </main>
    </div>
  );
}
