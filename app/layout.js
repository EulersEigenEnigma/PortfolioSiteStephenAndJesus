import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: [
    {
      path: "../public/fonts/NotoSerifDisplay.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/NotoSerifDisplay-Italic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-primary",
});

export const metadata = {
  title: "Portfolio Site",
  description: "Work in Progress",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${myFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}