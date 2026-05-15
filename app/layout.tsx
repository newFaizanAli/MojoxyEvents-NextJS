import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { baseMetadata } from "./lib/metadata";
import ClientRoot from "./ClientRoot";
import { ToastProvider } from "./components/shared";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientRoot>
          <main className="flex-1">{children}</main>
        </ClientRoot>
        <ToastProvider />

      </body>

    </html>
  );
}
