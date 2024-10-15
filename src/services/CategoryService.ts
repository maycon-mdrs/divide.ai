import { Category, CategoryCRUD } from '../types/Category'; 

export class CategoryService implements CategoryCRUD {

    async getAllCategories(token: string): Promise<Category[]> {
        console.log(token);
        const response = await fetch('http://localhost:8080/categories', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
    
        const data: Category[] = await response.json();
        console.log(data);
        return data;
    }

    async getCategoryById(id: number, token: string): Promise<Category | null> {
        const response = await fetch(`http://localhost:8080/categories/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return null; 
        }

        const category: Category = await response.json();
        return category;
    }

    async createCategory(category: Omit<Category, 'id' | 'creationDate'>, token: string): Promise<Category> {
        const response = await fetch('http://localhost:8080/categories', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...category,
                creationDate: new Date() 
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create category');
        }

        const newCategory: Category = await response.json();
        return newCategory;
    }

    
    async updateCategory(id: number, category: Partial<Omit<Category, 'id' | 'creationDate'>>, token: string): Promise<Category | null> {
        const response = await fetch(`http://localhost:8080/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });

        if (!response.ok) {
            return null; 
        }

        const updatedCategory: Category = await response.json();
        return updatedCategory;
    }

    
    async deleteCategory(id: number, token: string): Promise<void> {
        const response = await fetch(`http://localhost:8080/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete category');
        }
    }
}