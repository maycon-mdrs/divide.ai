import { api } from '@/services/api';
import { ICategory, ApiResponse } from '@/interfaces/ICategory';
import { getUserLocalStorage } from '@/context/AuthProvider/util';

export async function getAllCategories(): Promise<ICategory[] | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.get<ApiResponse<ICategory[]>>('/categories', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCategoryById(id: number): Promise<ICategory | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.get<ApiResponse<ICategory>>(`/categories/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export async function createCategory(category: ICategory): Promise<ICategory | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.post<ApiResponse<ICategory>>('/categories', category, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateCategory(category: ICategory): Promise<ICategory | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.put<ApiResponse<ICategory>>(`/categories/${category.id}`, category, {
      headers: { 'Authorization': `Bearer ${token}`, }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteCategory(id: number): Promise<void | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.delete<ApiResponse<null>>(`/categories/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.data.success) {
      throw new Error('Failed to delete category');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
