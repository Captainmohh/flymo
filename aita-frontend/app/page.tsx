import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full max-w-full overflow-x-hidden">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}