import { TableCategory } from "@/components/categories/TableCategory"
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { DrawerNewCategory } from "@/components/categories/DrawerNewCategory";
import React, { useEffect, useState } from 'react';
import { useCategoryData } from "@/hooks/category/categoryHook";
import { ICategory } from "@/interfaces/ICategory";


export function CategoryPage() {
	// const [categories, setCategories] = useState<Category[]>([]); 
    // const [loading, setLoading] = useState<boolean>(true); 
    // const [error, setError] = useState<string | null>(null); 

    const { data } = useCategoryData();


    // const loadCategories = async () => {
    //     const categoryService = new CategoryService();
    //     const token = localStorage.getItem('token'); 

    //     if (!token) {
    //         try {
    //             const data = await categoryService.getAllCategories(); 
    //             setCategories(data); 
    //             setLoading(false);
    //         } catch (err) {
    //             setError('Failed to fetch categories'); 
    //             setLoading(false);
    //         }
    //     } else {
    //         setError('No token found');
    //         setLoading(false);
    //     }
    // };

    
    // useEffect(() => {
    //     loadCategories();
    // }, []); 


    
    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

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
				<TableCategory />
			</div>
		</div>
	);
}