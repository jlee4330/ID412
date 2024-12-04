"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

const LoginPage = () => {
  // 상태 초기값을 명확히 설정
  const [nickname, setNickname] = useState<string>(""); // 닉네임 입력 값, 초기값은 빈 문자열
  const isValid = nickname?.length >= 2; // undefined 방지: 닉네임 길이 확인

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value || ""); // 입력값이 없을 경우 빈 문자열로 설정
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.loginTitle}>Welcome</h1>
        <p className={styles.notice}>
          Your nickname will be public. Avoid using your real name.
        </p>
        <form className={styles.loginForm}>
          <input
            type="text"
            placeholder="Nickname"
            className={`${styles.loginInput} ${
              !isValid && nickname ? styles.invalidInput : ""
            }`}
            value={nickname}
            onChange={handleChange}
          />
          {!isValid && nickname && (
            <p className={styles.errorMessage}>
              Nickname must be at least 2 characters long.
            </p>
          )}
          <button
            type="submit"
            className={styles.loginButton}
            disabled={!isValid}
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
