import { TableCategory } from "@/components/categories/TableCategory"
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { DrawerNewCategory } from "@/components/categories/DrawerNewCategory";
const categoryData = [
	{
		id: "INV001",
		name: "Categoria 1",
		description: "Descrição da categoria 1",
		cor: "#795548",
		action: "Editar"
	},
	{
		id: "INV002",
		name: "Categoria 2",
		description: "Descrição da categoria 2Descrição da categoria 2Descrição da categoria 2Descrição da categoria 2Descrição da categoria 2Descrição da categoria 2Descrição da categoria 2Descrição da categoria 2",
		cor: "#e91e63",
		action: "Editar"
	}
];


export function CategoryPage() {
	return (
		<div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
			<SheetMenu />
			<div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
				<h2 className="text-3xl font-bold tracking-tight">Categorias</h2>
				<div className="flex items-center space-x-2">
				<DrawerNewCategory />
				</div>
			</div>
						
			<div className="p-4 flex justify-center rounded-xl border bg-card text-card-foreground shadow" >
				<TableCategory data={categoryData} />
			</div>
		</div>
	);
}