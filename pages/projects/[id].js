import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/projects/${id}.jsonld`)
        .then((res) => res.json())
        .then((data) => {
          setProjectData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading JSON-LD:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <h1>Učitavanje projekta...</h1>;
  }

  if (!projectData) {
    return <h1>Projekat nije pronađen</h1>;
  }

  return (
    <div className="container">
      <Head>
        <title>{projectData.name} - DM Arhitekt</title>
        <meta name="description" content={projectData.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectData) }}
        />
      </Head>

      <h1>{projectData.name}</h1>
      <p>
        <strong>Lokacija:</strong> {projectData.location.address}
      </p>
      <p>
        <strong>Tip projekta:</strong> {projectData.projectType}
      </p>
      <p>
        <strong>Površina hotela:</strong> {projectData.size.totalArea}
      </p>
      <p>
        <strong>Površina recepcije:</strong> {projectData.size.receptionArea}
      </p>
      <p>
        <strong>Godina projektovanja:</strong> {projectData.year.design}
      </p>
      <p>
        <strong>Godina izvođenja:</strong> {projectData.year.construction}
      </p>
      <p>
        <strong>Autor:</strong> {projectData.author.name} (
        {projectData.author.affiliation})
      </p>
      <p>
        <strong>Fotografija:</strong> {projectData.photographer}
      </p>

      <h2>Opis projekta</h2>
      <p>{projectData.description}</p>

      <h2>Funkcionalnosti</h2>
      <ul>
        {projectData.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <h2>Učesnici projekta</h2>
      <ul>
        {projectData.participants.map((participant, index) => (
          <li key={index}>
            <strong>{participant.name}</strong>: {participant.role}
          </li>
        ))}
      </ul>

      <h2>Galerija</h2>
      <div className="gallery">
        {projectData.image.map((src, index) => {
          const isPortrait =
            src.includes("-portrait") || src.includes("-vertical");
          return (
            <img
              key={index}
              src={src}
              alt={projectData.name}
              className={isPortrait ? "portrait" : ""}
            />
          );
        })}
      </div>
    </div>
  );
}
