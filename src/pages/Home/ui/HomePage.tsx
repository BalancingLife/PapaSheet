import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Sheet } from "@/widgets/grid/ui/Sheet";

export default function PapaPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="pb-13">
          <Header />
        </div>

        <Sheet />

        <Footer />
      </div>
    </>
  );
}
