import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import LoadingIndicator from "@/components/loading";

export const metadata = {
    metadataBase: new URL("https://postgres-prisma.vercel.app"),
    title: "Vercel Postgres Demo with Prisma",
    description: "A simple Next.js app with Vercel Postgres as the database and Prisma as the ORM"
};

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // const throwError = () => {
    //   throw new Error("This is a test error!");
    // };
    // throwError();
    return (
        <html lang="en">
            <body className={inter.variable}>
                {children}
                <Toaster />
                <SonnerToaster />
                <LoadingIndicator />
            </body>
        </html>
    );
}
