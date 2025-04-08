import Head from "next/head";
import styles from "../../styles/about.module.css";

export default function PressPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Press | DM ARCHITECT</title>
        <meta
          name="description"
          content="Explore publications and press coverage featuring DM ARCHITECT's projects and philosophy."
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Press</h1>
        <p className={styles.text}>
          {/* Replace this text with real content */}
          Selected publications and articles featuring DM ARCHITECT's work will
          appear here.
        </p>
      </main>
    </div>
  );
}
