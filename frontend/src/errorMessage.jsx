import { Link } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div
            style={{
                height: "100vh",
                background: "#0b0b0b",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center"
            }}
        >
            <h1
                style={{
                    fontSize: "90px",
                    color: "#d4af37",
                    marginBottom: "10px"
                }}
            >
                404
            </h1>

            <h2 style={{ marginBottom: "10px" }}>
                Page Not Found
            </h2>

            <p
                style={{
                    color: "#aaa",
                    marginBottom: "30px"
                }}
            >
                Sorry, the page you are looking for doesn't exist.
            </p>

            <Link
                to="/"
                style={{
                    background: "#d4af37",
                    color: "#000",
                    padding: "12px 30px",
                    borderRadius: "30px",
                    textDecoration: "none",
                    fontWeight: "bold"
                }}
            >
                Back Home
            </Link>
        </div>
    );
}