import { Header } from "@/widgets/header";
import { Grid } from "@/widgets/grid";
import { Footer } from "@/widgets/footer";

export default function PapaPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Grid />
        <Footer />
      </div>
    </>
  );
}
