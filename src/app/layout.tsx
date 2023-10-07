import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({ weight: '300', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PotatoTune',
  description:
    'Provides a unique way to visualize songs by displaying their lyrics and musical notes in sheet music format.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={notoSans.className}>
      <body className='flex flex-col w-full h-screen max-w-screen-2xl mx-auto overflow-auto'>
        {children}
      </body>
    </html>
  );
}
