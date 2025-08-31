import Header from "@/widgets/header/ui/Header";
import PapaSheet from "@/widgets/papasheet/ui/PapaSheet";
import Footer from "@/widgets/footer/ui/Footer";

export default function PapaPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <PapaSheet />
        <Footer />
      </div>
    </>
  );
}
