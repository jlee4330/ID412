"use client";

import React, { useState, Suspense, useRef } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "./page.module.css";
import { useSearchParams, useRouter } from "next/navigation";

const SecretCodeContent: NextPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const usernameFromUrl = decodeURIComponent(
    searchParams.get("username") || ""
  ); // 디코딩된 username
  const coin = parseInt(searchParams.get("coins") || "0", 10); // coins 정보 가져오기 (기본값: 0)

  const [code, setCode] = useState(""); // 입력된 코드 상태
  const audioRef = useRef<HTMLAudioElement | null>(null); // 오디오 ref

  // 코드별 selectedItem 데이터
  const routeMap: { [key: string]: string } = {
    RAM123: "ramen",
    MSTENR56: "monster_energy",
    URLJU24: "traditional_rice_wine",
    MOVT849: "movie_ticket",
    BUR701: "burger",
    KEYA19: "keyboard",
    LIPCR84: "lip_product",
    SHOe57: "sneakers",
    NESPr3: "nespresso",
    AIRpOd58: "airpods_max",
    SONY$98: "sony_camera",
    CYb$2teSla4: "cybertruck",
  };

  const renderCartIcons = () => {
    const totalIcons = 5;
    const icons = [];
    for (let i = 0; i < totalIcons; i++) {
      icons.push(
        <Image
          key={i}
          className={styles.cartIcon}
          width={32}
          height={32}
          alt=""
          src={i < coin ? "/cartEmpty.png" : "/cartFull.png"}
        />
      );
    }
    return icons;
  };

  const handleCartClick = () => {
    const query = new URLSearchParams(Array.from(searchParams.entries()));
    router.push(`/cart?${query.toString()}`); // URL 정보를 유지하면서 cart 페이지로 이동
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (coin <= 0) {
      alert("You used all your chances!"); // 경고 메시지 표시
      return;
    }

    const selectedItem = routeMap[code];
    if (selectedItem) {
      // 사운드 재생
      if (audioRef.current) {
        audioRef.current.play();
      }

      // 사운드가 끝난 뒤 route 처리
      setTimeout(() => {
        const query = new URLSearchParams(Array.from(searchParams.entries()));
        query.set("selectedItem", selectedItem); // selectedItem 추가
        router.push(`/purchase?${query.toString()}`);
      }, 500); // 사운드 재생 시간 고려
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  const handleReceiveItems = () => {
    const query = new URLSearchParams(Array.from(searchParams.entries()));
    router.push(`/coinFlip?${query.toString()}`); // URL 정보를 유지하며 coinFlip 페이지로 이동
  };

  const handleNoMoreItemsClick = () => {
    const query = new URLSearchParams(Array.from(searchParams.entries()));
    router.push(`/coinFlip?${query.toString()}`); // URL 정보를 유지하며 coinFlip 페이지로 이동
  };

  return (
    <div className={styles.purchase1}>
      {/* 오디오 태그 추가 */}
      <audio ref={audioRef} src="/code_okay.mp3" />

      <div className={styles.welcomeMessage}>
        <h1>Welcome, {usernameFromUrl}!</h1>
        <p>{coin > 0 ? "Enter Your Secret Code" : "Receive Your Items"}</p>
      </div>

      {coin > 0 ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={styles.inputBox}
            placeholder="Enter the code"
          />
          <button type="submit" className={styles.primaryButton}>
            🎁 Get Free Item
          </button>
          <button
            type="button"
            onClick={handleNoMoreItemsClick}
            className={styles.textButton}
          >
            I don't need more items
          </button>
        </form>
      ) : (
        <button
          onClick={handleReceiveItems}
          className={`${styles.primaryButton} ${styles.receiveButton}`}
        >
          🎁 Receive Items
        </button>
      )}

      {/* cartParent 클릭 시 cart 페이지로 이동 */}
      <div className={styles.cartParent} onClick={handleCartClick}>
        {renderCartIcons()}
      </div>

      {/* 하단 배너 광고 */}
      <div className={styles.bannerContainer}>
        <Image
          src="/bannerAds.gif"
          alt="Banner Advertisement"
          layout="intrinsic"
          width={1179}
          height={578}
          className={styles.bannerImage}
        />
      </div>
    </div>
  );
};

const SecretCode: NextPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SecretCodeContent />
  </Suspense>
);

export default SecretCode;
