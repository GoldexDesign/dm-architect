import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../../styles/project.module.css";
import { useLanguage } from "../../../context/LanguageContext";
import ImageModal from "../../../components/ImageModal";

export default function ProjectPage() {
  const router = useRouter();
  const { project } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { language } = useLanguage();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

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

  const openModal = (index) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getValue = (field) =>
    typeof field === "object" ? field[language] || field.en : field;

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
        <title>{`${getValue(data.name)} | DM ARCHITECT`}</title>
        <meta
          name="description"
          content={getValue(data.description) || "Project by DM ARCHITECT"}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Project",
              name: getValue(data.name),
              description: getValue(data.description),
              image: data.image,
              url: `https://dm-architect.vercel.app${router.asPath}`,
              location: {
                "@type": "Place",
                address: getValue(data.location?.address || ""),
              },
              author: {
                "@type": "Person",
                name: data.author?.name,
                affiliation: data.author?.affiliation,
              },
              dateCreated: data.year?.design,
              datePublished: data.year?.construction,
              contributor: data.participants?.map((p) => ({
                "@type": "Person",
                name: p.name,
                jobTitle: p.role,
              })),
            }),
          }}
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{getValue(data.name)}</h1>

        <div className={styles.gallery}>
          {Array.isArray(data.image) &&
            data.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${getValue(data.name)} image ${index + 1}`}
                className={styles.image}
                onClick={() => openModal(index)}
              />
            ))}
        </div>

        {modalOpen && (
          <ImageModal
            images={data.image}
            onClose={closeModal}
            startIndex={modalIndex}
            projectName={getValue(data.name)}
          />
        )}

        {data.description && (
          <section className={styles.description}>
            <h2>{language === "sr" ? "Opis" : "Description"}</h2>
            <p>{getValue(data.description)}</p>
          </section>
        )}

        {data.location?.address && (
          <p>
            <strong>{language === "sr" ? "Lokacija" : "Location"}:</strong>{" "}
            {getValue(data.location.address)}
          </p>
        )}

        {data.projectType && (
          <p>
            <strong>
              {language === "sr" ? "Tip projekta" : "Project Type"}:
            </strong>{" "}
            {getValue(data.projectType)}
          </p>
        )}

        {data.size?.totalArea && (
          <p>
            <strong>
              {language === "sr" ? "Ukupna površina" : "Total Area"}:
            </strong>{" "}
            {data.size.totalArea}
          </p>
        )}

        {data.size?.receptionArea && (
          <p>
            <strong>
              {language === "sr" ? "Recepcija" : "Reception Area"}:
            </strong>{" "}
            {data.size.receptionArea}
          </p>
        )}

        {data.year?.design && (
          <p>
            <strong>
              {language === "sr" ? "Godina dizajna" : "Design Year"}:
            </strong>{" "}
            {data.year.design}
          </p>
        )}

        {data.year?.construction && (
          <p>
            <strong>
              {language === "sr" ? "Godina izgradnje" : "Construction Year"}:
            </strong>{" "}
            {data.year.construction}
          </p>
        )}

        {data.author?.name && (
          <p>
            <strong>{language === "sr" ? "Autor" : "Author"}:</strong>{" "}
            {data.author.name} ({data.author.affiliation})
          </p>
        )}

        {data.photographer && (
          <p>
            <strong>{language === "sr" ? "Fotograf" : "Photographer"}:</strong>{" "}
            {data.photographer}
          </p>
        )}

        {data.features && data.features.length > 0 && (
          <section>
            <h2>{language === "sr" ? "Karakteristike" : "Features"}</h2>
            <ul>
              {data.features.map((f, idx) => (
                <li key={idx}>{getValue(f)}</li>
              ))}
            </ul>
          </section>
        )}

        {data.participants && data.participants.length > 0 && (
          <section>
            <h2>{language === "sr" ? "Učesnici" : "Participants"}</h2>
            <ul>
              {data.participants.map((p, idx) => (
                <li key={idx}>
                  <strong>{p.name}</strong>: {getValue(p.role)}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
