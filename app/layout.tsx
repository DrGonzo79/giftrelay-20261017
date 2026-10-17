import type {Metadata} from "next";
import "./globals.css";
export const metadata: Metadata = {title:"GiftRelay — urgent gifts, locally sourced",description:"A demo reverse marketplace for same-day local gifts."};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
