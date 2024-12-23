"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

const CartContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 coin 및 purchasedItems 가져오기
  const coin = parseInt(searchParams.get("coins") || "0", 10);
  const purchasedItems = JSON.parse(searchParams.get("purchasedItems") || "[]");

  const handleGoBack = () => {
    router.back();
  };

  const renderCartIcons = () => {
    const totalIcons = 4;
    return Array.from({ length: totalIcons }).map((_, index) => (
      <Image
        key={index}
        className={styles.cartIcon}
        width={32}
        height={32}
        alt={`Cart Icon ${index + 1}`}
        src={index < coin ? "/cartEmpty.png" : "/cartFull.png"}
      />
    ));
  };

  return (
    <div className={styles.cartPage}>
      {/* 뒤로 가기 버튼 */}
      <div className={styles.goBackButton} onClick={handleGoBack}>
        <Image
          src="/goBack.png"
          alt="Go Back"
          width={32}
          height={32}
          className={styles.goBackIcon}
        />
      </div>

      {/* cartParent */}
      <div className={styles.cartParent}>{renderCartIcons()}</div>

      {/* 중앙부에 purchasedItems 표시 */}
      <div className={styles.itemsList}>
        <h2>Your Purchased Items</h2>
        {purchasedItems.length > 0 ? (
          <ul>
            {purchasedItems.map((item: string, index: number) => (
              <li key={index} className={styles.item}>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in your cart.</p>
        )}
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

const Cart = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CartContent />
  </Suspense>
);

export default Cart;
