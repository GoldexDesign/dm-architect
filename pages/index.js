import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h1>DM Arhitekt - Projekti</h1>
      <p>Dobrodošli na naš sajt! Pogledajte neke od naših radova.</p>
      <ul>
        <li>
          <Link href="/projects/hotel-sky">Pogledajte Hotel Sky</Link>
        </li>
      </ul>
    </div>
  );
}
