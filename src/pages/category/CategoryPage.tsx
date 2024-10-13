import { TableCategory } from "@/components/table/TableCategory"


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
		<div className="flex" >
			<TableCategory data={categoryData} />
		</div>
	);
}