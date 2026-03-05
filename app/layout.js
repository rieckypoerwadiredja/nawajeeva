import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./components/fragments/Footer";
import Header from "./components/fragments/Header";
import { IMAGES } from "./constants/images";

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
        <Header />

        <main className="px-8 py-12 min-h-screen flex flex-col space-y-6 mt-15">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
