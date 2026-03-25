import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/fragments/Footer";
import Header from "@/app/components/fragments/Header";
import { IMAGES } from "@/app/constants/images";
import AuthProvider from "@/app/components/AuthProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "NawaJeeva App",
  description: "Revolutionary Agricultural Industry",
  icons: {
    icon: IMAGES.LOGO_NAWAJEEVA_ICON,
    shortcut: IMAGES.LOGO_NAWAJEEVA_ICON,
    apple: IMAGES.LOGO_NAWAJEEVA_ICON,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-background min-h-screen text-primary-font ${poppins.variable} antialiased`}
      >
        <AuthProvider>
          <Header />

          <main className="px-8 py-12 min-h-screen flex flex-col space-y-6 mt-15">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
