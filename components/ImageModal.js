import React, { useEffect, useState, useCallback } from "react";
import styles from "../styles/PictureModal.module.css";

export default function ImageModal({ images, onClose, startIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles.modal}>
        <button className={styles["close-button"]} onClick={onClose}>
          Close
        </button>

        {images.length > 0 && (
          <>
            {/* ✅ re-render fix */}
            <img
              key={images[currentIndex]}
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className={styles["modal-image"]}
            />
            <div className={styles.caption}>
              {`Image ${currentIndex + 1} of ${images.length}`}
            </div>
            {/* ✅ DM Arhitekt Logo */}
            <img
              src="/images/DM_logo.svg"
              alt="DM Arhitekt Logo"
              className={styles.logo}
            />
          </>
        )}

        <div className={styles.leftZone} onClick={handlePrev}></div>
        <div className={styles.rightZone} onClick={handleNext}></div>
      </div>
    </div>
  );
}
