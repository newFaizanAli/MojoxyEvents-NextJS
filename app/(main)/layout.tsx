import Footer from "../components/footer";
import Navbar from "../components/navbar";


export default function MainLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}