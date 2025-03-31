import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../../styles/project.module.css";

export default function ProjectPage() {
  const router = useRouter();
  const { category, project } = router.query;
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (category && project) {
      fetch("/projects/all-projects.jsonld")
        .then((res) => res.json())
        .then((json) => {
          const match = json.projects.find(
            (item) =>
              item.id === project && item.category.toLowerCase() === category
          );
          if (match) {
            setData(match);
          } else {
            setNotFound(true);
          }
        })
        .catch(() => setNotFound(true));
    }
  }, [category, project]);

  if (notFound) {
    return (
      <p style={{ padding: "40px", textAlign: "center" }}>Project not found.</p>
    );
  }

  if (!data) {
    return <p style={{ padding: "40px", textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.name} | DM ARCHITECT</title>
        <meta
          name="description"
          content={data.description || "Project by DM ARCHITECT"}
        />
      </Head>

      <h1 className={styles.title}>{data.name}</h1>

      <div className={styles.gallery}>
        {Array.isArray(data.image) &&
          data.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${data.name} - ${index + 1}`}
              className={`${styles.projectImage} ${
                img.includes("portrait") ? styles.portrait : ""
              }`}
            />
          ))}
      </div>

      {data.description && (
        <section className={styles.description}>
          <h2>Description</h2>
          <p>{data.description}</p>
        </section>
      )}
    </div>
  );
}
