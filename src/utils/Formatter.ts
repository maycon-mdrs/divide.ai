import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatInitialName = (name: string) => {
  return name?.toString().charAt(0).toUpperCase();
}

export const formatMoney = (value: number | null) => {
  if (value === null || value === undefined) return "";
  
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const formatDate = (date: string | Date) => {
  if (!date) return;

  try {
    return format(new Date(date), 'dd/MM/yyyy');
  }
  catch {
    return "";
  }
}

export const formatDateTime = (date: string | Date) => {
  if (!date) return "";

  try {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: ptBR });
  } catch {
    return "";
  }
};