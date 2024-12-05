"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 리로드 방지
    if (username.trim() === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    console.log("로그인 성공:", { username, referralCode });
    router.push(`/purchase?username=${encodeURIComponent(username)}`);
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
      <h1 style={{ fontSize: "1.8rem", marginBottom: "30px" }}>로그인</h1>
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
            유저 닉네임
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="닉네임을 입력하세요"
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
            추천 코드
          </label>
          <input
            type="text"
            id="referralCode"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            placeholder="추천 코드를 입력하세요"
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
          코인 받기 🪙🪙🪙🪙🪙
        </button>
      </form>
    </div>
  );
}
