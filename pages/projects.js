import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/projects.module.css";

export default function Projects() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Projects - DM Arhitekt</title>
        <meta
          name="description"
          content="Explore the latest projects by DM Arhitekt, including residential, retail, and hotel designs."
        />
      </Head>
      <h1 className={styles.title}>Our Projects</h1>
      <p className={styles.text}>
        Discover our latest work in interior design across different sectors.
      </p>
      <ul className={styles.projectList}>
        <li>
          <Link href="/projects/residential">Residential</Link>
        </li>
        <li>
          <Link href="/projects/hotels">Hotels</Link>
        </li>
        <li>
          <Link href="/projects/retail">Retail</Link>
        </li>
      </ul>
    </div>
  );
}
