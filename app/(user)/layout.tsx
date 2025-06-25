import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import "../globals.css";
import CartIcon from "@/components/CartIcon";
import { AuthContextProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

// Local fonts
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Use the Metadata API for proper metadata handling
export const metadata = {
  title: "BiteBazaar",
  description:
    "BiteBazaar is your ultimate destination for fresh and delicious meals delivered right to your doorstep.",
  icons: {
    icon: "/favicon.ico",
  },
  links: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&family=Pacifico&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Lato&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap",
    },
  ],
  openGraph: {
    title: "BiteBazaar",
    description:
      "BiteBazaar is your ultimate destination for fresh and delicious meals delivered right to your doorstep.",
    url: "https://bitebazaer.vercel.app",
    siteName: "Bitebazaar",
    images: [
      {
        url: "/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bitebazaar Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "Bitebazaar",
    title: "Bitebazaar",
    description:
      "BiteBazaar is your ultimate destination for fresh and delicious meals delivered right to your doorstep.",
    images: ["/assets/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <AuthContextProvider>
        <html lang="en">
          <body className={`antialiased`}>
            <Navbar />
            {children}
            <div className="fixed right-7 bottom-16 z-50">
              <CartIcon />
            </div>
          </body>
        </html>
      </AuthContextProvider>
    </CartProvider>
  );
}
