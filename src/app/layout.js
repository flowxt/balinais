import { Source_Sans_3, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

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
  metadataBase: new URL("https://bohemianhouse.fr"),
  title: {
    default: "Bohemian House - Décoration balinaise authentique",
    template: "%s | Bohemian House",
  },
  description:
    "Découvrez notre collection exclusive de décoration et mobilier balinais authentiques. Bohemian House vous propose des pièces uniques artisanales pour créer une atmosphère zen et élégante chez vous.",
  keywords: [
    "décoration balinaise",
    "mobilier balinais",
    "artisanat bali",
    "décoration intérieur",
    "luminaires bali",
    "paniers rotin",
    "vases artisanaux",
    "bohemian house",
  ],
  authors: [{ name: "Bohemian House" }],
  creator: "Bohemian House",
  publisher: "Bohemian House",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://bohemianhouse.fr",
    siteName: "Bohemian House",
    title: "Bohemian House - Décoration balinaise authentique",
    description:
      "Collection exclusive de décoration et mobilier balinais artisanaux. Des pièces uniques pour une atmosphère zen et élégante.",
    images: [
      {
        url: "/images/fond1.jpeg",
        width: 1200,
        height: 630,
        alt: "Bohemian House - Intérieur balinais chaleureux et élégant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bohemian House - Décoration balinaise authentique",
    description:
      "Collection exclusive de décoration et mobilier balinais artisanaux.",
    images: ["/images/fond1.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${sourceSans.variable} ${cormorant.variable} antialiased`}
      >
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>{children}</CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
