import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

import Cookies from 'js-cookie';
import Login from "./components/Login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sample Next App",
  description: "Sample Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  const cookieStore = cookies();
  const loggedInCookie = cookieStore.get('loggedIn');
  console.log("LOGGED IN COOKIE: ", loggedInCookie);
  if (loggedInCookie && loggedInCookie.value === 'true') {
    return (<html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto p-6">
          <Nav/>
          {children}
        </div>
      </body>
    </html>)
  } else {
    return (<html lang="en">
    <body className={inter.className}>
      <div className="container mx-auto p-6">
        <Login/>
      </div>
    </body>
  </html>)
  }

  





}
