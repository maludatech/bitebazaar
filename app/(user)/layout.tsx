import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import "../globals.css";

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
  description: "BiteBazaar is your ultimate destination for fresh and delicious meals delivered right to your doorstep.",
  icons: {
    icon: "/favicon.ico",
  },
  links: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&family=Pacifico&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Lato&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
  );
}
