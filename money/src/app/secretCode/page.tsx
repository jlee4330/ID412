"use client";

import React, { useState, Suspense } from "react";
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

  // 코드별 selectedItem 데이터
  const routeMap: { [key: string]: string } = {
    ramen: "ramen",
    b56hf: "sushi",
    c78jk: "pizza",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (coin <= 0) {
      // 코인이 0인 경우
      alert("You used all your chances!"); // 경고 메시지 표시
      return; // 페이지 이동 방지
    }

    const selectedItem = routeMap[code];
    if (selectedItem) {
      // 기존 URL 정보 유지
      const query = new URLSearchParams(Array.from(searchParams.entries()));
      query.set("selectedItem", selectedItem); // selectedItem 추가
      router.push(`/purchase?${query.toString()}`);
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  return (
    <div className={styles.purchase1}>
      <div className={styles.welcomeMessage}>
        <h1>Welcome, {usernameFromUrl}!</h1>
        <p>Enter Your Secret Code</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.inputBox}
          placeholder="Enter the code"
        />
        <button type="submit" className={styles.primaryButton}>
          🎁 Get free item
        </button>
      </form>
      <div className={styles.cartParent}>{renderCartIcons()}</div>
    </div>
  );
};

const SecretCode: NextPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SecretCodeContent />
  </Suspense>
);

export default SecretCode;
