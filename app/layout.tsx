import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Training App",
  description: "Mi app de seguimiento de entrenamiento",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
