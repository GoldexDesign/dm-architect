import React from "react";
import Head from "next/head";

export default function AboutMe() {
  return (
    <div className="container">
      <Head>
        <title>About Me - DM Arhitekt</title>
        <meta
          name="description"
          content="Learn more about DM Arhitekt, our philosophy, and our projects."
        />
      </Head>
      <h1>About Me</h1>
      <p>
        Welcome to DM Arhitekt! We are a design studio specializing in unique
        and original interior spaces. Our approach blends creativity,
        functionality, and aesthetic balance to create inspiring environments.
      </p>
      <h2>Our Philosophy</h2>
      <p>
        At DM Arhitekt, we believe that great design comes from understanding
        space, materials, and human interaction. Each project is a new journey,
        where we craft interiors that tell a story.
      </p>
      <h2>Contact</h2>
      <p>
        If you'd like to collaborate or learn more, feel free to reach out via
        email or follow us on Instagram.
      </p>
    </div>
  );
}
