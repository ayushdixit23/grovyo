import { Plus_Jakarta_Sans } from 'next/font/google'

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus_jakarta_sans',
})
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import Script from 'next/script';
import { SocketContextProvider } from "@/app/(utitlies)/utils/SocketWrapper";
import Providers from "./redux/Providers";
import { AuthContextProvider } from '@/app/(utitlies)/utils/AuthWrapper';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "Grovyo",
  description: "Created by Grovyo Platforms Private Ltd",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GFZQDF58V2" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GFZQDF58V2');
          `}
        </Script>
      </head>
      <body className={`${plus_jakarta_sans.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthContextProvider>
            <Providers>
              <SocketContextProvider>
                <Toaster />
                {children}
              </SocketContextProvider>
            </Providers>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
