"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

const RouletteWheel = () => {
  const [spinResult, setSpinResult] = useState<string | null>(null); // 결과 저장
  const [isSpinning, setIsSpinning] = useState(false); // 스핀 상태 관리
  const [remainingSpins, setRemainingSpins] = useState(5); // 남은 기회
  const [rotation, setRotation] = useState(0); // 현재 회전각도 저장

  const segments = [
    "TRY AGAIN", // 실패
    "TRY AGAIN", // 실패
    "TRY AGAIN", // 실패
    "TRY AGAIN", // 실패
    "TRY AGAIN", // 실패
    "TRY AGAIN", // 실패
  ];

  useEffect(() => {
    // Disable scrolling globally
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable scrolling when the component is unmounted
      document.body.style.overflow = "auto";
    };
  }, []);

  const spinWheel = () => {
    if (isSpinning || remainingSpins === 0) return;

    setIsSpinning(true);
    setSpinResult(null);

    const randomIndex = Math.floor(Math.random() * segments.length);
    const additionalRotation = 360 * 5 + randomIndex * (360 / segments.length); // 여러 바퀴 회전 후 멈춤
    const newRotation = rotation + additionalRotation;

    setRotation(newRotation);

    setTimeout(() => {
      setSpinResult(segments[randomIndex]);
      setIsSpinning(false);
      setRemainingSpins((prev) => prev - 1);
    }, 5000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>🎡 Spin the Wheel!</h1>
        <p>Remaining Spins: {remainingSpins}</p>
      </div>

      <div className={styles.wheelContainer}>
        <div className={styles.pin}></div>

        <div
          className={styles.rouletteImageContainer}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <img
            src="/r.png" // Your image in the public folder
            alt="Roulette Wheel"
            className={styles.rouletteImage}
          />
        </div>
      </div>

      <button
        onClick={spinWheel}
        className={`${styles.spinButton} ${
          isSpinning || remainingSpins === 0 ? styles.disabledButton : ""
        }`}
        disabled={isSpinning || remainingSpins === 0}
      >
        {isSpinning
          ? "Spinning…"
          : remainingSpins > 0
          ? "SPIN"
          : "No Spins Left"}
      </button>

      {spinResult && <div className={styles.result}>Result: {spinResult}</div>}
    </div>
  );
};

export default RouletteWheel;
