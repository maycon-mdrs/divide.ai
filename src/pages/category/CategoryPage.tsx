import { TableCategory } from "@/components/table/TableCategory"
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { DrawerTransition } from "@/components/newTransition/DrawerTransition";

const categoryData = [
	{
		id: "INV001",
		name: "Categoria 1",
		description: "Descrição da categoria 1",
		cor: "blue",
		action: "Editar"
	},
	{
		id: "INV002",
		name: "Categoria 2",
		description: "Descrição da categoria 2Descrição da categoria 2Descrição da categoria 2Descrição da categoria 2",
		cor: "red",
		action: "Editar"
	}
];


export function CategoryPage() {
	return (
		<div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
			<SheetMenu />
				
			<div className="p-4 flex justify-center rounded-xl border bg-card text-card-foreground shadow" >
				<TableCategory data={categoryData} />
			</div>
		</div>
	);
}