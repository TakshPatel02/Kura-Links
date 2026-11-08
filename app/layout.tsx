import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New  } from "next/font/google";
import "./globals.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "500", "700"],
  preload: false,
  variable: "--font-zen-kaku",
});

export const metadata: Metadata = {
  title: "kura-links",
  description: "a quiet corner for links i find online",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${zenKakuGothicNew.variable} ${zenKakuGothicNew.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sumi text-cream font-body">
        {children}
      </body>
    </html>
  );
}
