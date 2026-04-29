import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import { Geist } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Awwwards Components",
    description: "Components Inspired by Awwwards Winners",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn("font-sans", geist.variable)}
        >
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="bg-brand-light dark:bg-brand-dark text-brand-dark dark:text-brand-light w-full">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
