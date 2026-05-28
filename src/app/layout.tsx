import type { Metadata } from "next";
// @ts-ignore: Allow side-effect CSS import without type declarations
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Tax Harvesting Dashboard",
  description: "Optimize your crypto taxes with smart loss harvesting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
