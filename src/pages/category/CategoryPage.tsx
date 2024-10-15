import { TableCategory } from "@/components/categories/TableCategory"
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { DrawerNewCategory } from "@/components/categories/DrawerNewCategory";
import React, { useEffect, useState } from 'react';
import { CategoryService } from '../../services/CategoryService'; 
import { Category } from '../../types/Category';




export function CategoryPage() {
	const [categories, setCategories] = useState<Category[]>([]); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null); 


    const loadCategories = async () => {
        const categoryService = new CategoryService();
        const token = localStorage.getItem('token'); 

        if (!token) {
            try {
                const data = await categoryService.getAllCategories('eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUyIiwic3ViIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE3Mjg5NjE3MDgsImV4cCI6MTcyODk2NTMwOH0.rMC8BH4fQE1HuASQ6EqbfdGQRooVrSHiJ-aLYV44ZD8'); 
                setCategories(data); 
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch categories'); 
                setLoading(false);
            }
        } else {
            setError('No token found');
            setLoading(false);
        }
    };

    
    useEffect(() => {
        loadCategories();
    }, []); 


    
    if (error) {
        return <div>Error: {error}</div>;
    }

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
				<TableCategory data={categories} />
			</div>
		</div>
	);
}