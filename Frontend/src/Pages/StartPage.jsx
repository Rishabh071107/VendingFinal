import React from "react";
import { useNavigate } from "react-router-dom";
import Iridescence from "./Iridescence";

function StartPage() {
  const navigate = useNavigate();

  const styles = {
    container: {
      height: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      zIndex: 2,
    },

    heading: {
      position: "absolute",
      top: "50px",
      fontSize: "52px",
      fontWeight: "700",
      color: "#ffffff",
      textShadow:
        "0 0 8px rgba(0,0,0,1)," +
        "0 0 20px rgba(255,255,255,0.9)",
    },

    buttonWrapper: {
      display: "flex",
      gap: "40px",
      marginTop: "120px",
    },

    button: {
      width: "220px",
      padding: "18px 0",
      fontSize: "24px",
      border: "none",
      borderRadius: "16px",
      cursor: "pointer",
      fontWeight: "700",

    
      background: "rgba(0, 0, 0, 0.45)",
      backdropFilter: "blur(14px)",
      color: "#ffffff",

      textShadow:
        "0 0 4px rgba(0,0,0,1)," +
        "0 0 12px rgba(255,255,255,0.9)",

      
      boxShadow:
        "0 0 15px rgba(0,255,255,0.8)," +
        "0 0 40px rgba(0,255,255,0.5)",

      transition: "0.3s ease",
    },

    buttonHover: {
      boxShadow:
        "0 0 25px rgba(0,255,255,1)," +
        "0 0 60px rgba(0,255,255,0.8)",
      transform: "scale(1.08)",
    },
  };

  return (
    <>
      <Iridescence
        color={[1, 1, 1]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      />

 
      <div style={styles.container}>
        <h1 style={styles.heading}>Vending Machine</h1>

        <div style={styles.buttonWrapper}>
        
          <button
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = styles.buttonHover.boxShadow;
              e.target.style.transform = styles.buttonHover.transform;
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = styles.button.boxShadow;
              e.target.style.transform = "scale(1)";
            }}
            onClick={() => navigate("/AdminLogin")}
          >
            Admin
          </button>

        
          <button
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = styles.buttonHover.boxShadow;
              e.target.style.transform = styles.buttonHover.transform;
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = styles.button.boxShadow;
              e.target.style.transform = "scale(1)";
            }}
            onClick={() => navigate("/UserLogin")}
          >
            User
          </button>
        </div>
      </div>
    </>
  );
}

export default StartPage;
