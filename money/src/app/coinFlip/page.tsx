"use client";

import React, { Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

const CoinFlipContent = () => {
  const searchParams = useSearchParams();
  const username = decodeURIComponent(searchParams.get("username") || ""); // URL에서 username 가져오기

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // 버튼 상태 관리
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 비활성화 상태 관리
  const [resultImage, setResultImage] = useState<string | null>(null); // 결과 이미지 상태 관리

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play(); // 비디오 재생
      setIsPlaying(true); // 재생 상태 업데이트
      setIsButtonDisabled(true); // 버튼 비활성화
      setResultImage(null); // 이전 결과 이미지 초기화
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false); // 재생 상태 초기화
    setIsButtonDisabled(false); // 버튼 다시 활성화
    // 50% 확률로 이미지 선택
    const randomImage = Math.random() < 0.5 ? "/heads.png" : "/tails.png";
    setResultImage(randomImage); // 선택된 이미지 상태 업데이트
  };

  return (
    <div className={styles.coinFlipPage}>
      {/* 상단 텍스트 */}
      <div className={styles.welcomeMessage}>
        <h1>Welcome, {username}!</h1>
        <p>Flip coins to receive the items.</p>
      </div>

      {/* 결과 이미지 */}
      {resultImage && (
        <div className={styles.resultContainer}>
          <img src={resultImage} alt="Result" className={styles.resultImage} />
        </div>
      )}

      {/* 영상과 버튼 */}
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          src="/cointoss.mp4"
          className={styles.videoPlayer}
          onEnded={handleVideoEnd} // 비디오가 끝날 때 이벤트 처리
          playsInline
          style={{
            objectFit: "cover",
          }}
        />
        <button
          onClick={handlePlay}
          className={`${styles.playButton} ${
            isButtonDisabled ? styles.disabledButton : ""
          }`}
          disabled={isButtonDisabled} // 버튼 비활성화 상태 적용
        >
          {isPlaying ? "Tossing…" : "Toss a Coin to Win"}
        </button>
      </div>
    </div>
  );
};

const CoinFlip = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <CoinFlipContent />
  </Suspense>
);

export default CoinFlip;
