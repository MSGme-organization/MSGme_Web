import HeaderBar from "@/components/client-components/HomeHeaderbar/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
  <HeaderBar/>
  {children}
  </>);
}
