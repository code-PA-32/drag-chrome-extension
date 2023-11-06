import React from "react";

export const ErrorMessage = ({err}: { err: string }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "500px",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0px, 15px"
      }}
    >
      <img src="404.png" alt="404"/>
      <p style={{
        color: "rgb(230, 230, 230)",
        textShadow: "2px 2px 4px rgba(217, 217, 217, 0.5)",
        fontSize: "15px",
        textAlign: "center",
        margin: 0,
        padding: "15px"
      }}>{err}</p>
    </div>
  );
}