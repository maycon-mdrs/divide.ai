export interface ExpenseByCategory {
    amount: number;
    categoryId: number; 
}

export interface ExpenseByCategoryWithName {
  amount: number;
  categoryName: string;
}
  
export interface IAIPrediction {
    nextExpenses: number | null;
    nextIncome: number | null;
    nextExpensesByCategory: ExpenseByCategory[];
    recomendation: string;
    response: string;
    hasAnalysis: Boolean | null;
}

export interface IAIPredictionRequest {
  userId: number;
  prompt: string;
}