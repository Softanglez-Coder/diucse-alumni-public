import React from "react";

const ComingSoonPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: "2rem" }}
      >
        <circle cx="40" cy="40" r="40" fill="#fff" fillOpacity="0.1" />
        <path
          d="M40 20V44"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="40" cy="56" r="3" fill="#fff" />
      </svg>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>
        Coming Soon
      </h1>
      <p style={{ fontSize: "1.25rem", marginBottom: "2rem", opacity: 0.9 }}>
        We’re working hard to bring you something amazing.<br />
        Stay tuned!
      </p>
      <footer style={{ marginTop: "3rem", opacity: 0.7, fontSize: "0.95rem" }}>
        &copy; {new Date().getFullYear()} DIU CSE Alumni. All rights reserved.
      </footer>
    </div>
  );
};

export default ComingSoonPage;