"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useSearchParams, useRouter } from "next/navigation";

const PurchaseContent = () => {
  const [position, setPosition] = useState({ x: 0, y: 673 }); // 초기 위치
  const [smooth, setSmooth] = useState(false); // transition 활성화 여부
  const dragRef = useRef(false);
  const searchParams = useSearchParams();
  const router = useRouter(); // 라우터 사용
  const username = decodeURIComponent(searchParams.get("username") || ""); // username 디코딩
  const selectedItem = decodeURIComponent(
    searchParams.get("selectedItem") || "default"
  );
  const coin = parseInt(searchParams.get("coins") || "0", 10);

  useEffect(() => {
    const parent = document.querySelector(`.${styles.purchase1Child}`);
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    setPosition({ x: parentRect.left, y: 673 }); // 초기 위치 설정
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
    setPosition({ x: newX + parentRect.left, y: 673 });
  };

  const handleDragEnd = () => {
    dragRef.current = false;

    const parent = document.querySelector(`.${styles.purchase1Child}`);
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const rectangleEndX = position.x + 80; // rectangleParent 오른쪽 끝
    const parentEndX = parentRect.left + parentRect.width;

    setSmooth(true);

    if (rectangleEndX >= parentEndX) {
      alert("Purchase Succeeded!");

      const query = new URLSearchParams(Array.from(searchParams.entries()));
      const purchasedItems = JSON.parse(query.get("purchasedItems") || "[]");

      query.set("coins", Math.max(0, coin - 1).toString()); // Decrement coins
      query.set(
        "purchasedItems",
        JSON.stringify([...purchasedItems, selectedItem])
      ); // Add selectedItem
      query.delete("selectedItem"); // Remove selectedItem

      router.push(`/secretCode?${query.toString()}`);
    } else {
      setPosition({ x: parentRect.left, y: 673 });
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

  const itemImageSrc = (() => {
    switch (selectedItem) {
      case "ramen":
        return "/ramen.png";
      case "sushi":
        return "/sushi.png";
      case "pizza":
        return "/pizza.png";
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
