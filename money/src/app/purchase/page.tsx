import type { NextPage } from "next";
import Image from "next/image";
import styles from "./page.module.css";

const Purchase: NextPage = () => {
  return (
    <div className={styles.purchase1}>
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
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <b className={styles.b}>{`> >`}</b>
      </div>
      <Image
        className={styles.coinIcon1}
        width={32}
        height={32}
        alt=""
        src="/coin.png"
      />
    </div>
  );
};

export default Purchase;
