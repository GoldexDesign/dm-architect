import React, { useEffect, useState, useCallback } from "react";
import styles from "../styles/PictureModal.module.css";

export default function ImageModal({
  images,
  onClose,
  startIndex = 0,
  projectName,
}) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleNext = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setImageLoaded(false);
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
    // ❗ Prevent modal on mobile portrait
    if (typeof window !== "undefined") {
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
        setShowModal(false);
        onClose();
        return;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("no-scroll");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("no-scroll");
    };
  }, [handleKeyDown, onClose]);

  if (!showModal) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles.modal}>
        <button className={styles["close-button"]} onClick={onClose}>
          Close
        </button>

        {images.length > 0 && (
          <>
            <img
              key={images[currentIndex]}
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className={`${styles["modal-image"]} ${
                imageLoaded ? styles.loaded : ""
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            <div className={styles.caption}>
              {`Image ${currentIndex + 1} of ${images.length}`}
            </div>

            {projectName && (
              <div className={styles.projectName}>{projectName}</div>
            )}

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
