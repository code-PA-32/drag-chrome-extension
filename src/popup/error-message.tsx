import React from "react";

export const ErrorMessage = ({err, link, err2, padding, email, reload, link2}: {
  err: string,
  link?: string,
  err2?: string,
  padding?: string
  email?: string
  reload?: JSX.Element
  link2?: string
}) => {
  return (
    <div
      style={{
        display: "flex",
        width: "500px",
        height: "590px",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        boxSizing: "border-box",
        padding: "10px 15px",
        background: "rgb(243, 162, 45)"
      }}
    >
      <img src="icon.png" alt="404" height={100} width={100} style={{margin: "0 auto"}}/>
      <p
        style={{
          color: "white",
          textShadow: "2px 2px 4px rgba(217, 217, 217, 0.5)",
          fontSize: "35px",
          fontWeight: "bold",
          textAlign: "center",
          paddingTop: "30px"
        }}>
        Attention!
      </p>
      <div style={{display: "flex", flexDirection: "column", gap: "15px", padding: padding}}>
        <p style={{
          color: "white",
          textShadow: "2px 2px 4px rgba(217, 217, 217, 0.5)",
          fontSize: "30px",
          fontWeight: "bold",
          textAlign: "center",
          margin: 0,
          padding: "5px"
        }}>{err}</p>
        <p
          style={{
            color: "white",
            textShadow: "2px 2px 4px rgba(217, 217, 217, 0.5)",
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
            margin: 0,
            padding: "5px"
          }}
        >{reload ? reload : err2}</p>
      </div>
      {link && <a href={link} id="login" target="_blank" style={{
        color: "white",
        textShadow: "2px 2px 4px rgba(217, 217, 217, 0.5)",
        fontSize: "15px",
        textAlign: "center",
        margin: 0,
        padding: "10px",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: "bold",
        background: "#85bf31",
        border: "2px solid #85bf31",
        filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))"
      }}>{email || "Sign In"}</a>}
      {link2 &&
          <a href={link2} target="_blank" style={{
            color: "white",
            textShadow: "2px 2px 4px rgba(217, 217, 217, 0.5)",
            fontSize: "15px",
            textAlign: "center",
            margin: 0,
            padding: "10px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
            background: "#85bf31",
            border: "2px solid #85bf31",
            filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))"
          }}>Visit FB4S Dashboard</a>}
      {!link && <div style={{
        padding: 30
      }}/>}
    </div>
  );
}