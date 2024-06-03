import { Inter } from "next/font/google";
import "../assets/globals.css";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sport Management System",
  description: "Generated by create next app",
  image: "/vercel.svg",
  url: "https://nextjs.org",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        <Navbar />
        {children}
      </AuthProvider>
      </body>
    </html>
  );
}
