import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "My Todos — Stay Organized",
  description:
    "Manage your daily tasks with ease. Add, edit, complete and delete todos in a clean, fast interface.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full">
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            duration={4000}
            toastOptions={{
              classNames: {
                toast:
                  "font-sans text-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
