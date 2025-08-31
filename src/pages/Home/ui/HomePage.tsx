import { Header } from "@/widgets/header";
import { Grid } from "@/widgets/grid";
import { Footer } from "@/widgets/footer";
import { GridHeader } from "@/widgets/grid/ui/GridHeader";
import { GridIndex } from "@/widgets/grid/ui/GridIndex";

export default function PapaPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="pb-20">
          <Header />
        </div>
        <GridHeader />
        <GridIndex />
        <Grid />
        <Footer />
      </div>
    </>
  );
}
