"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

const RouletteWheel = () => {
  const [spinResult, setSpinResult] = useState<string | null>(null); // 결과 저장
  const [isSpinning, setIsSpinning] = useState(false); // 스핀 상태 관리
  const [remainingSpins, setRemainingSpins] = useState(5); // 남은 기회
  const [rotation, setRotation] = useState(0); // 현재 회전각도 저장
  const wheelRef = useRef<HTMLDivElement | null>(null);

  // 사운드 ref
  const spinAudioRef = useRef<HTMLAudioElement | null>(null); // 스핀 사운드
  const resultAudioRef = useRef<HTMLAudioElement | null>(null); // 결과 사운드

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const spinWheel = () => {
    if (isSpinning || remainingSpins === 0) return;

    setIsSpinning(true);
    setSpinResult(null);

    // 사운드 재생 (스핀 시작 사운드)
    if (spinAudioRef.current) {
      try {
        spinAudioRef.current.currentTime = 0;
        spinAudioRef.current.play();
      } catch (error) {
        console.error("Spin audio playback error:", error);
      }
    }

    const minAngle = 30;
    const maxAngle = 330;
    const randomAngle = Math.random() * (maxAngle - minAngle) + minAngle;

    const extraRotations = 5; // 5바퀴 회전
    const totalRotation = extraRotations * 360 + randomAngle;

    // 1단계: transition 제거, rotation을 0으로 초기화
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      setRotation(0);
    }

    // 2단계: 다음 frame에서 transition 복구 후 회전 적용
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (wheelRef.current) {
          wheelRef.current.style.transition = "transform 5s ease-out";
          setRotation(totalRotation);
        }
      });
    });

    setTimeout(() => {
      // 항상 TRY AGAIN 결과
      setSpinResult("TRY AGAIN");
      setIsSpinning(false);
      setRemainingSpins((prev) => prev - 1);

      // 결과 사운드 재생 (TRY AGAIN 시)
      if (resultAudioRef.current) {
        try {
          resultAudioRef.current.currentTime = 0;
          resultAudioRef.current.play();
        } catch (error) {
          console.error("Result audio playback error:", error);
        }
      }
    }, 5000); // 애니메이션 시간과 동일
  };

  return (
    <div className={styles.container}>
      {/* Spin 사운드 */}
      <audio
        ref={spinAudioRef}
        src="/rrsound.mp3"
        preload="auto"
        style={{ display: "none" }}
      />
      {/* Result 사운드 */}
      <audio
        ref={resultAudioRef}
        src="/ExplosionSound.mp3"
        preload="auto"
        style={{ display: "none" }}
      />

      <div className={styles.title}>
        <h1>🎡 Win Your Item!</h1>
        <p>Remaining Spins: {remainingSpins}</p>
      </div>

      <div className={styles.wheelContainer}>
        <div className={styles.pin}></div>

        <div
          className={styles.rouletteImageContainer}
          ref={wheelRef}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <img
            src="/r.png" // 룰렛 이미지
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
