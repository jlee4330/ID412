"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string>(""); // 타입 명시
  const [referralCode, setReferralCode] = useState<string>(""); // 타입 명시
  const [errorMessage, setErrorMessage] = useState<string>(""); // 에러 메시지 상태

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 리로드 방지

    if (username.trim() === "") {
      setErrorMessage("Please enter your nickname."); // 에러 메시지 설정
      return;
    }

    if (username.trim().length < 2) {
      setErrorMessage("The nickname must be at least 2 characters long."); // 닉네임 길이 검사
      return;
    }

    setErrorMessage(""); // 에러 메시지 초기화

    // 기본값 설정
    const coins: number = 5; // 기본 코인 수
    const products: string[] = []; // 빈 배열로 초기화, 타입 명시

    // URL에 데이터 추가
    const queryParams = new URLSearchParams({
      username: encodeURIComponent(username),
      coins: coins.toString(),
      products: encodeURIComponent(JSON.stringify(products)), // 배열을 JSON 문자열로 변환
    }).toString();

    console.log("Login succeeded:", {
      username,
      referralCode,
      coins,
      products,
    });
    router.push(`/secretCode?${queryParams}`);
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", marginBottom: "30px" }}>Login</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "360px",
          backgroundColor: "#2c2c2c",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="username"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#ddd",
            }}
          >
            Nickname
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your nickname"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "1rem",
              border: `1px solid ${errorMessage ? "#ff4d4d" : "#444"}`, // 에러 시 테두리 색 변경
              borderRadius: "8px",
              backgroundColor: "#333",
              color: "#fff",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {/* 에러 메시지 출력 */}
          {errorMessage && (
            <p
              style={{
                color: "#ff4d4d",
                fontSize: "0.875rem",
                marginTop: "8px",
              }}
            >
              {errorMessage}
            </p>
          )}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="referralCode"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#ddd",
            }}
          >
            Referral Code
          </label>
          <input
            type="text"
            id="referralCode"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            placeholder="Enter the referral code"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "1rem",
              border: "1px solid #444",
              borderRadius: "8px",
              backgroundColor: "#333",
              color: "#fff",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          🎁 Get Free Goods
        </button>
      </form>
    </div>
  );
}
