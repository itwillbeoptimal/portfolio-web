import React from 'react';
import type { Metadata } from 'next';
import { Syne, Geist_Mono } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/ui/CustomCursor';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import Preloader from '@/components/ui/Preloader';
import SmoothScroll from '@/components/ui/SmoothScroll';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '김지훈 | 프론트엔드 개발자',
  description: '프론트엔드 개발자 김지훈의 포트폴리오입니다.',
  openGraph: {
    title: '김지훈 | 프론트엔드 개발자',
    description: '프론트엔드 개발자 김지훈의 포트폴리오입니다.',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${syne.variable} ${geistMono.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <Preloader />
        <SmoothScroll>
          <CustomCursor />
          <NoiseOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
