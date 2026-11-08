import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "500", "700"],
  preload: false,
  variable: "--font-zen-kaku",
});

export const metadata: Metadata = {
  title: "蔵 Kura",
  description: "Everything worth keeping, in one place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${zenKakuGothicNew.variable} ${zenKakuGothicNew.className} h-full antialiased`}
    >
      <body className="flex h-screen flex-col overflow-hidden bg-sumi text-cream font-sans">
        <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-6 sm:px-10 lg:px-16">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
