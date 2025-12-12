export default function Home() {
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #40C8FF, #1E4F8E)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      color: "#fff",
      fontFamily: "Raleway, sans-serif",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      padding: "40px",
      borderRadius: "20px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      textAlign: "center",
      width: "100%",
      maxWidth: "500px",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      fontWeight: "700",
    },
    text: {
      fontSize: "1.2rem",
      marginBottom: "30px",
      fontWeight: "300",
    },
    button: {
      backgroundColor: "#016EC2",
      padding: "12px 25px",
      borderRadius: "10px",
      border: "none",
      color: "#fff",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Bienvenido 👋</h1>
        <p style={styles.text}>
          Esta es tu página de inicio. ¡Tu proyecto está funcionando
          correctamente! 🚀
        </p>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.opacity = "0.7")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Explorar más
        </button>
      </div>
    </div>
  );
}
