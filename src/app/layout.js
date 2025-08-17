import { Source_Sans_3, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Bohemian House - Meubles Balinais Authentiques",
  description:
    "Découvrez notre collection exclusive de meubles balinais authentiques. Bohemian House vous propose des pièces uniques pour créer une atmosphère zen et élégante.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${sourceSans.variable} ${cormorant.variable} antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
