"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useSearchParams, useRouter } from "next/navigation";

const PurchaseContent = () => {
  const [position, setPosition] = useState({ x: 0, y: 580 }); // 초기 위치
  const [smooth, setSmooth] = useState(false); // transition 활성화 여부
  const dragRef = useRef(false);
  const searchParams = useSearchParams();
  const router = useRouter(); // 라우터 사용
  const username = decodeURIComponent(searchParams.get("username") || ""); // username 디코딩
  const selectedItem = decodeURIComponent(
    searchParams.get("selectedItem") || "default"
  );
  const coin = parseInt(searchParams.get("coins") || "0", 10);
  const audioRef = useRef<HTMLAudioElement | null>(null); // 오디오 참조

  useEffect(() => {
    const parent = document.querySelector(`.${styles.purchase1Child}`);
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    setPosition({ x: parentRect.left, y: 580 }); // 초기 위치 설정
  }, []);

  const handleGoBack = () => {
    const query = new URLSearchParams(Array.from(searchParams.entries()));
    query.delete("selectedItem");
    router.push(`/secretCode?${query.toString()}`);
  };

  const handleDragStart = () => {
    dragRef.current = true;
    setSmooth(false);
  };

  const handleDragMove = (clientX: number) => {
    if (!dragRef.current) return;

    const parent = document.querySelector(`.${styles.purchase1Child}`);
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const dragX = clientX - parentRect.left;

    const newX = Math.max(0, Math.min(dragX - 40, parentRect.width - 80));
    setPosition({ x: newX + parentRect.left, y: 580 });
  };

  const handleDragEnd = async () => {
    dragRef.current = false;

    const parent = document.querySelector(`.${styles.purchase1Child}`);
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const rectangleEndX = position.x + 80; // rectangleParent 오른쪽 끝
    const parentEndX = parentRect.left + parentRect.width;

    setSmooth(true);

    if (rectangleEndX >= parentEndX) {
      const query = new URLSearchParams(Array.from(searchParams.entries()));
      const purchasedItems = JSON.parse(query.get("purchasedItems") || "[]");

      if (purchasedItems.includes(selectedItem)) {
        // 아이템이 이미 존재하는 경우
        alert("Purchase Failed: This item exists in your shopping cart");
        query.delete("selectedItem");
        router.push(`/secretCode?${query.toString()}`);
      } else {
        // 아이템 추가 및 coin 감소
        query.set("coins", Math.max(0, coin - 1).toString());
        query.set(
          "purchasedItems",
          JSON.stringify([...purchasedItems, selectedItem])
        );
        query.delete("selectedItem");

        // 사운드 재생 후 route
        if (audioRef.current) {
          audioRef.current.play(); // 사운드 재생
          audioRef.current.onended = () => {
            router.push(`/secretCode?${query.toString()}`);
          };
        } else {
          router.push(`/secretCode?${query.toString()}`);
        }
      }
    } else {
      setPosition({ x: parentRect.left, y: 580 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDragMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX);
  };

  const renderCartIcons = () => {
    const totalIcons = 4;
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

  const itemImageSrc = (() => {
    switch (selectedItem) {
      case "ramen":
        return "/ramen.gif";
      case "monster_energy":
        return "/monster_energy.gif";
      case "traditional_rice_wine":
        return "/traditional_rice_wine.gif";
      case "movie_ticket":
        return "/movie_ticket.gif";
      case "burger":
        return "/burger.gif";
      case "keyboard":
        return "/keyboard.gif";
      case "lip_product":
        return "/lip_product.gif";
      case "sneakers":
        return "/sneakers.gif";
      case "nespresso":
        return "/nespresso.gif";
      case "airpods_max":
        return "/airpods_max.gif";
      case "sony_camera":
        return "/sony_camera.gif";
      case "cybertruck":
        return "/cybertruck.gif";
      default:
        return "/default.png";
    }
  })();

  return (
    <div
      className={styles.purchase1}
      onMouseMove={handleMouseMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleDragEnd}
    >
      {/* 오디오 요소 */}
      <audio ref={audioRef} src="/purchase.mp3" style={{ display: "none" }} />

      {/* 뒤로가기 버튼 */}
      <div className={styles.goBackButton} onClick={handleGoBack}>
        <Image
          src="/goBack.png"
          alt="Go back"
          width={32}
          height={32}
          className={styles.goBackIcon}
        />
      </div>

      {/* 환영 메시지 */}
      <div className={styles.welcomeMessage}>
        <h1>Welcome, {username}!</h1>
        <p>Would you like to purchase this item?</p>
      </div>

      {/* cartIcons 렌더링 */}
      <div className={styles.cartParent}>{renderCartIcons()}</div>

      {/* selectedItem 이미지 */}
      <Image
        className={styles.itemsIcon}
        width={320}
        height={320}
        alt={selectedItem}
        src={itemImageSrc}
        unoptimized
      />

      <div className={styles.purchase1Child} />
      <div className={styles.swipeToPurchase}>{`>> Swipe to Purchase`}</div>
      <div
        className={`${styles.rectangleParent} ${smooth ? "smooth" : ""}`}
        style={{ left: position.x, top: position.y }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className={styles.groupChild} />
        <b className={styles.b}>{`> >`}</b>
      </div>
    </div>
  );
};

const Purchase = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PurchaseContent />
  </Suspense>
);

export default Purchase;
