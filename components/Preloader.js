import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/preloader.module.css";

export default function Preloader({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2000); // nakon 2s, fade-out
    const timer2 = setTimeout(() => onFinish(), 2500); // nakon 2.5s, sakrij

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className={`${styles.preloader} ${fadeOut ? styles.fadeOut : ""}`}>
      <Image
        src="/images/DM_logo.svg"
        alt="DM Arhitekt Logo"
        width={300}
        height={150}
        priority
      />
    </div>
  );
}
