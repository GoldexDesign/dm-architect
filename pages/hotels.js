import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/hotels.module.css";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("/projects/hotels.jsonld")
      .then((res) => res.json())
      .then((data) => setHotels([data])) // Load single project as an array
      .catch((err) => console.error("Error loading hotels data:", err));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Hotels - DM Arhitekt</title>
        <meta
          name="description"
          content="Explore our hotel projects designed by DM Arhitekt."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotels) }}
        />
      </Head>
      <h1 className={styles.title}>Hotel Projects</h1>
      <div className={styles.projectsGrid}>
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.name} className={styles.projectCard}>
              <Link href={`/projects/hotel-sky`}>
                <img
                  src={hotel.image[0]}
                  alt={hotel.name}
                  className={styles.projectImage}
                />
              </Link>
              <h2 className={styles.projectName}>{hotel.name}</h2>
            </div>
          ))
        ) : (
          <p>Loading hotel projects...</p>
        )}
      </div>
    </div>
  );
}
