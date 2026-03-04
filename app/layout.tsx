import React from 'react';
import type { Metadata } from 'next';
import { Syne, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import CustomCursor from '@/components/ui/CustomCursor';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import Preloader from '@/components/ui/Preloader';
import SmoothScroll from '@/components/ui/SmoothScroll';

const pretendard = localFont({
  src: '../public/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '100 900',
});

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: '김지훈 | 프론트엔드 개발자',
  description: '프론트엔드 개발자 김지훈의 포트폴리오입니다.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: '김지훈 | 프론트엔드 개발자',
    description: '프론트엔드 개발자 김지훈의 포트폴리오입니다.',
    images: [
      {
        url: '/thumbnail.jpg',
        width: 1200,
        height: 700,
        alt: 'thumbnail',
      },
    ],
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
    <html
      lang="ko"
      className={`${pretendard.variable} ${syne.variable} ${geistMono.variable}`}
    >
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
