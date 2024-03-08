import React from "react"

export const OutOf = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "500px",
        height: "590px",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-evenly",
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
      <div style={{display: "flex", flexDirection: "column", gap: "15px", padding: 0}}>
        <p style={{
          color: "white",
          textShadow: "2px 2px 4px rgba(217, 217, 217, 0.5)",
          fontSize: "30px",
          fontWeight: "bold",
          textAlign: "center",
          margin: 0,
          padding: "5px"
        }}>This browser’s page is out of the ecosystem.</p>
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
        >Please open one of these existing pages:</p>
      </div>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}>
        <a style={{
          color: "white",
          textShadow: "2px 2px 4px rgba(217, 217, 217, 0.5)",
          fontSize: "13px",
          textAlign: "center",
          width: "43%",
          margin: 0,
          padding: "10px",
          borderRadius: "6px",
          textDecoration: "none",
          filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
          fontWeight: "bold",
          background: "#85bf31",
          border: "2px solid #85bf31",
        }} href="https://manojkukreja.followupboss.com/2/people/" target="_blank">FollowUpBoss Buyer (TM)</a>
        <a style={{
          color: "white",
          textShadow: "2px 2px 4px rgba(217, 217, 217, 0.5)",
          fontSize: "13px",
          textAlign: "center", width: "43%",
          margin: 0,
          padding: "10px",
          borderRadius: "6px",
          textDecoration: "none",
          filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
          fontWeight: "bold",
          background: "#85bf31",
          border: "2px solid #85bf31",
        }} href="https://www.findbusinesses4sale.com/broker-dashboard/" target="_blank">FB4S: Dashboard (TM or ISA)</a>
        <a style={{
          color: "white",
          textShadow: "2px 2px 4px rgba(217, 217, 217, 0.5)",
          fontSize: "13px",
          textAlign: "center",
          margin: 0,
          padding: "10px", width: "43%",
          borderRadius: "6px",
          filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
          textDecoration: "none",
          fontWeight: "bold",
          background: "#85bf31",
          border: "2px solid #85bf31",
        }} href="https://findbusinessesforsale.pipedrive.com/pipeline" target="_blank">PipeDrive Buyer (ISA)</a>
        <a style={{
          color: "white",
          textShadow: "2px 2px 4px rgba(217, 217, 217, 0.5)",
          fontSize: "13px",
          textAlign: "center", width: "43%",
          margin: 0,
          padding: "10px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
          filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
          background: "#85bf31",
          border: "2px solid #85bf31",
        }} href="https://www.findbusinesses4sale.com/restaurants-for-sale-canada/" target="_blank">FB4S: Listing (TM or
          ISA)</a>

      </div>
    </div>
  );
}