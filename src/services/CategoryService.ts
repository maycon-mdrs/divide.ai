//import { Category, CategoryCRUD } from '../types/Category'; 

import { ICategory } from '@/interfaces/ICategory';


export async function getAllCategories(): Promise<ICategory[]> {
    // const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUyIiwic3ViIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MjkwMDA3NjYsImV4cCI6MTcyOTAwNDM2Nn0.X5d1ouHympO8qlViHQSbiTHFvE8ntosyHimzb5E4jnw';
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

    const data: ICategory[] = await response.json();
    console.log(data);
    return data;
}

export async function getCategoryById(id: number): Promise<ICategory | null> {
    const token = localStorage.getItem('token');
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

    const category: ICategory = await response.json();
    return category;
}

export async function createCategory(category: Omit<ICategory, 'id' | 'creationDate'>): Promise<ICategory> {
    const token = localStorage.getItem('token');
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

    const newCategory: ICategory = await response.json();
    return newCategory;
}


export async function updateCategory(id: number, category: Partial<Omit<ICategory, 'id'>>): Promise<ICategory | null> {
    const token = localStorage.getItem('token');
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

    const updatedCategory: ICategory = await response.json();
    return updatedCategory;
}


export async function deleteCategory(id: number): Promise<void> {
    const token = localStorage.getItem('token');
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
