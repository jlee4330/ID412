"use client";

import React, { useState, useRef, useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "./page.module.css";

const Purchase: NextPage = () => {
  const [position, setPosition] = useState({ x: 0, y: 673 }); // 초기 위치
  const [smooth, setSmooth] = useState(false); // transition 활성화 여부
  const dragRef = useRef(false);

  useEffect(() => {
    // purchase1Child의 위치 계산
    const parent = document.querySelector(`.${styles.purchase1Child}`);
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const startX = parentRect.left; // 좌측 끝

    setPosition({ x: startX, y: 673 }); // 초기 위치 설정
  }, []);

  const handleDragStart = () => {
    dragRef.current = true;
    setSmooth(false); // 드래그 중에는 transition 비활성화
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!dragRef.current) return;

    const parent = document.querySelector(`.${styles.purchase1Child}`);
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const dragX = clientX - parentRect.left;
    const dragY = clientY - parentRect.top;

    const newX = Math.max(0, Math.min(dragX - 40, parentRect.width - 80)); // 40은 offset
    const newY = Math.max(0, Math.min(dragY, parentRect.height - 60));

    setPosition({ x: newX + parentRect.left, y: 673 });
  };

  const handleDragEnd = () => {
    dragRef.current = false;

    const parent = document.querySelector(`.${styles.purchase1Child}`);
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const rectangleCenterX = position.x + 40; // rectangleParent의 중심 X 좌표
    const parentCenterX = parentRect.left + parentRect.width / 2;

    setSmooth(true); // transition 활성화

    // 좌측 또는 우측으로 이동 결정
    if (rectangleCenterX < parentCenterX) {
      setPosition({ x: parentRect.left, y: 673 }); // 좌측 끝
    } else {
      setPosition({
        x: parentRect.left + parentRect.width - 80, // 우측 끝
        y: 673,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  return (
    <div
      className={styles.purchase1}
      onMouseMove={handleMouseMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleDragEnd}
    >
      <div className={styles.coinParent}>
        <Image
          className={styles.coinIcon}
          width={32}
          height={32}
          alt=""
          src="/coin.png"
        />
        <Image
          className={styles.coinIcon}
          width={32}
          height={32}
          alt=""
          src="/coin.png"
        />
        <Image
          className={styles.coinIcon}
          width={32}
          height={32}
          alt=""
          src="/coin.png"
        />
        <Image
          className={styles.coinIcon}
          width={32}
          height={32}
          alt=""
          src="/coin.png"
        />
        <Image
          className={styles.coinIcon}
          width={32}
          height={32}
          alt=""
          src="/coin.png"
        />
      </div>
      <Image
        className={styles.white_carIcon}
        width={320}
        height={320}
        alt=""
        src="/white_car.png"
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

export default Purchase;
