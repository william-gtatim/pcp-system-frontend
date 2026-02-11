'use client';
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import {Header} from "@/app/components/header";
import Sidebar from "@/app/components/sidebar/sidebar";
import Main from "@/app/components/main";
import QueryProvider from "@/app/queryProvider";
import React from "react";
const inter = Inter({subsets:['latin'],variable:'--font-sans'});
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="pt-BR" className={inter.variable}>
      <body className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}>
      <QueryProvider>
          <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex flex-1">
                  <Sidebar />
                  <Main>
                      {children}
                  </Main>
              </div>
          </div>
          <Toaster
              position="top-right"
              richColors
              closeButton
              expand
              duration={6000} />
      </QueryProvider>
      </body>
      </html>
  );
}
