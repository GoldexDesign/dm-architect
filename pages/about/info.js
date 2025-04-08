import Head from "next/head";
import styles from "../../styles/about.module.css";

export default function InfoPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Info | DM ARCHITECT</title>
        <meta
          name="description"
          content="Learn more about DM ARCHITECT studio, its design philosophy, approach, and team."
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Info</h1>
        <p className={styles.text}>
          {/* Replace this text with real content */}
          DM ARCHITECT is a Belgrade-based interior design studio dedicated to
          creating original and inspiring spaces across hospitality,
          residential, and retail projects.
        </p>
      </main>
    </div>
  );
}
