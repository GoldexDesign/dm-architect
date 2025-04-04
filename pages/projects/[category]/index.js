import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/category.module.css";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      fetch("/projects/all-projects.jsonld")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.projects.filter(
            (proj) =>
              proj.category &&
              proj.category.toLowerCase() === category.toLowerCase()
          );
          setProjects(filtered);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading projects:", err);
          setLoading(false);
        });
    }
  }, [category]);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{`${category?.toUpperCase()} | DM ARCHITECT`}</title>
        <meta
          name="description"
          content={`All ${category} projects by DM ARCHITECT interior design studio.`}
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.heading}>
          {category?.charAt(0).toUpperCase() + category?.slice(1)} Projects
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.grid}>
            {projects.map((project) => (
              <div key={project.id} className={styles.card}>
                <Link href={`/projects/${project.category}/${project.id}`}>
                  <img
                    src={
                      Array.isArray(project.image) && project.image.length > 0
                        ? project.image[0]
                        : "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={project.name}
                    className={styles.image}
                  />
                </Link>
                <h2 className={styles.title}>{project.name}</h2>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
