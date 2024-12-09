"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

const CoinFlip = () => {
  const searchParams = useSearchParams();
  const username = decodeURIComponent(searchParams.get("username") || ""); // URL에서 username 가져오기

  return (
    <div className={styles.coinFlipPage}>
      {/* 상단 텍스트 */}
      <div className={styles.welcomeMessage}>
        <h1>Welcome, {username}!</h1>
        <p>Flip coins to receive the items.</p>
      </div>

      {/* 중앙에 코인 이미지 */}
      <div className={styles.coinContainer}>
        <Image
          src="/coin.png"
          alt="Coin"
          width={200}
          height={200}
          className={styles.coinImage}
        />
      </div>
    </div>
  );
};

export default CoinFlip;
