import { Toaster } from 'react-hot-toast';
import "./globals.css";
import { ContextProvider } from "@/providers/ContextProviders";
import Navbar from "./components/Navbar/Navbar";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Navbar/>
        {children}
        </ContextProvider> 
        <Toaster />
      </body>
    </html>
  );
}
