import { ICategory, ApiResponse } from '@/interfaces/ICategory';



export async function getAllCategories(): Promise<ICategory[]> {
    // const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUyIiwic3ViIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MjkxMDMzNjYsImV4cCI6MTcyOTEwNjk2Nn0.krse4ir2mkysxuu3J6cF8k9bLG414BwajPuEil1qRrQ';
    
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

    const jsonResponse: ApiResponse<ICategory[]> = await response.json();


    return jsonResponse.data;
}

export async function getCategoryById(id: number): Promise<ICategory | null> {
    // const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUyIiwic3ViIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MjkwNDk5MzQsImV4cCI6MTcyOTA1MzUzNH0.QBMPcHqUQVpSZ64_Jk6tNe5Sf6Ux5UJe6ST1Fs8sqSs';
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

    const jsonResponse: ApiResponse<ICategory> = await response.json();


    return jsonResponse.data;
}

export async function createCategory(category: ICategory): Promise<ICategory | null> {
    //const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUyIiwic3ViIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MjkxMDMzNjYsImV4cCI6MTcyOTEwNjk2Nn0.krse4ir2mkysxuu3J6cF8k9bLG414BwajPuEil1qRrQ';
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

    const newCategory: ApiResponse<ICategory> = await response.json();
    return newCategory.data;
}


export async function updateCategory(category: ICategory): Promise<ICategory | null> {
    //const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUyIiwic3ViIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MjkxMDMzNjYsImV4cCI6MTcyOTEwNjk2Nn0.krse4ir2mkysxuu3J6cF8k9bLG414BwajPuEil1qRrQ';
    const response = await fetch(`http://localhost:8080/categories/${category.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    });

    if (!response.ok) {
        throw new Error('Failed to update category');
    }

    const jsonResponse: ApiResponse<ICategory> = await response.json();


    return jsonResponse.data;
}


export async function deleteCategory(id: number): Promise<void> {
    //const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUyIiwic3ViIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MjkxMDMzNjYsImV4cCI6MTcyOTEwNjk2Nn0.krse4ir2mkysxuu3J6cF8k9bLG414BwajPuEil1qRrQ';
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
