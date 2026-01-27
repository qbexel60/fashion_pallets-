import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Logo from "@/components/Logo";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const yourFont = localFont({
  src: [
    {
      path: '../fonts/FranieVariableTest-Bold.otf',
      weight: '700',
    },
  ],
  variable: '--font-yourfont',
  display: 'swap', // or 'optional' depending on your needs
});

export const metadata: Metadata = {
  title: "Fashion Pallet BD",
  description: "Fashion Palette BD brings you exclusive, limited-stock women's fashion from China! Each handpicked bag, shoe and accessory is a one-time offer-once it's gone,it's gone for good. Don't miss out on truly unique finds. Grab your piece before it's too late!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${yourFont.variable} antialiased bg-[#030507] text-white min-h-screen`}
      >
        <CartProvider>
          <div className="fixed inset-0 -z-10 h-full max-md:h-[100vh] w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#B947C7_100%)]"></div>
          <Logo />
          <AnimatedNavbar />
          {children}
          <Footer/>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
