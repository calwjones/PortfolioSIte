export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontFamily: "var(--f-px)", fontSize: 48, marginBottom: 12 }}>
          callum jones
        </h1>
        <p style={{ color: "var(--fg-dim)", fontFamily: "var(--f-mono)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 11 }}>
          portfolio · coming soon
        </p>
      </div>
    </main>
  );
}
