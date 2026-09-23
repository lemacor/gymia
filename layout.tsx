import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GymIA",
  description: "Tu entrenador inteligente",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}