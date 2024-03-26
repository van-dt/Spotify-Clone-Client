import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import ModalProvider from "../providers/ModalProvider";
import ToastContextProvider from "../contexts/ToastContext";
import UserContextProvider from "../contexts/UserContext";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "spotify clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContextProvider>
          <UserContextProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
          </UserContextProvider>
        </ToastContextProvider>
      </body>
    </html>
  );
}
