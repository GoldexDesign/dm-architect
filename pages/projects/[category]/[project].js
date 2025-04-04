import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../../styles/project.module.css";

export default function ProjectPage() {
  const router = useRouter();
  const { project } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (project) {
      fetch(`/projects/${project}.jsonld`)
        .then((res) => {
          if (!res.ok) throw new Error("Project not found");
          return res.json();
        })
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading project:", err);
          setNotFound(true);
          setLoading(false);
        });
    }
  }, [project]);

  if (loading) {
    return <p style={{ padding: "40px", textAlign: "center" }}>Loading...</p>;
  }

  if (notFound || !data) {
    return (
      <p style={{ padding: "40px", textAlign: "center" }}>Project not found.</p>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{`${data.name} | DM ARCHITECT`}</title>
        <meta
          name="description"
          content={data.description || "Project by DM ARCHITECT"}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{data.name}</h1>

        <div className={styles.gallery}>
          {Array.isArray(data.image) &&
            data.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${data.name} image ${index + 1}`}
                className={styles.image}
              />
            ))}
        </div>

        {data.description && (
          <section className={styles.description}>
            <h2>Description</h2>
            <p>{data.description}</p>
          </section>
        )}

        {data.location?.address && (
          <p>
            <strong>Location:</strong> {data.location.address}
          </p>
        )}

        {data.projectType && (
          <p>
            <strong>Project Type:</strong> {data.projectType}
          </p>
        )}

        {data.size?.totalArea && (
          <p>
            <strong>Total Area:</strong> {data.size.totalArea}
          </p>
        )}

        {data.size?.receptionArea && (
          <p>
            <strong>Reception Area:</strong> {data.size.receptionArea}
          </p>
        )}

        {data.year?.design && (
          <p>
            <strong>Design Year:</strong> {data.year.design}
          </p>
        )}

        {data.year?.construction && (
          <p>
            <strong>Construction Year:</strong> {data.year.construction}
          </p>
        )}

        {data.author?.name && (
          <p>
            <strong>Author:</strong> {data.author.name} (
            {data.author.affiliation})
          </p>
        )}

        {data.photographer && (
          <p>
            <strong>Photographer:</strong> {data.photographer}
          </p>
        )}

        {data.features && data.features.length > 0 && (
          <section>
            <h2>Features</h2>
            <ul>
              {data.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        {data.participants && data.participants.length > 0 && (
          <section>
            <h2>Participants</h2>
            <ul>
              {data.participants.map((p, idx) => (
                <li key={idx}>
                  <strong>{p.name}</strong>: {p.role}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
