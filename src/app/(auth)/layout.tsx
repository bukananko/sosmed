import "../globals.css";
import Image from "next/image";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="flex flex-col justify-center items-center min-h-screen gap-8">
          <div className="w-40">
            <Image src="/logo.png" width={200} height={200} alt="Netai" />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
