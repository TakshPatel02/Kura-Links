import type { Metadata } from "next";
import { Kaisei_Tokumin, Zen_Maru_Gothic, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const kaiseiTokumin = Kaisei_Tokumin({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "kura-links",
  description: "a quiet corner for links i find online",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${kaiseiTokumin.variable} ${zenMaruGothic.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sumi text-cream font-body">
        {children}
      </body>
    </html>
  );
}
