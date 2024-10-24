import { SheetMenu } from "@/components/global/sidebar/SheetMenu";

export function PredictionPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
      {/* Sidebar mobile */}
      <SheetMenu />
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Previsão financeria com IA</h2>
        <div className="flex items-center space-x-2">

        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
        teste 
      </div>
    </div>
  );
}