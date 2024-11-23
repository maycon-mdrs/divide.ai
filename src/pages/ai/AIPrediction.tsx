
import { ListCardsAI } from "@/components/ai/ListCardsAI";
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Alert } from "antd";
import { useEffect, useState } from "react";
import { ExpenseByCategory, ExpenseByCategoryWithName, IAIPrediction, IAIPredictionRequest } from "@/interfaces/IAIPrediction";
import { Piechart } from "@/components/ai/PieChartAI";
import { LoadingOutlined } from '@ant-design/icons';
import { Skeleton } from "@/components/ui/skeleton";
import { useAIPredictionData, useAIPredictionMutate } from "@/hooks/ai/aiPredictionHook";
import { getUserLocalStorage } from "@/context/AuthProvider/util";
import { getCategoryById } from "@/services/CategoryService";

export function AIPrediction() {
  const { data } = useAIPredictionData();

  const mutation = useAIPredictionMutate();
  const isPending = mutation.isPending;

  const [inputValue, setInputValue] = useState<string>("");

  const [expensesByCategoryWithNames, setExpensesByCategoryWithNames] = useState<ExpenseByCategoryWithName[]>([]);

  useEffect(() => {
    async function fetchCategoryNames() {
      if (data?.nextExpensesByCategory && data.nextExpensesByCategory.length > 0) {
        try {
          const expenseMap = new Map<number, number>();
  
          data.nextExpensesByCategory.forEach((item) => {
            const currentAmount = expenseMap.get(item.categoryId) || 0;
            expenseMap.set(item.categoryId, currentAmount + item.amount);
          });
  
          const categoriesWithNames: ExpenseByCategoryWithName[] = await Promise.all(
            Array.from(expenseMap.entries()).map(async ([categoryId, totalAmount]) => {
              const category = await getCategoryById(categoryId);
              return {
                amount: totalAmount,
                categoryName: category?.name || "Desconhecido",
              };
            })
          );
  
          setExpensesByCategoryWithNames(categoriesWithNames);
        } catch (error) {
          console.error("Erro ao buscar nomes das categorias:", error);
        }
      } else {
        setExpensesByCategoryWithNames([]);
      }
    }
  
    fetchCategoryNames();
  }, [data?.nextExpensesByCategory]);

  const fetchPrediction = async () => {
    const id = getUserLocalStorage()?.id;
    if(!id) return;

    mutation.mutate({ 
      userId: id,
      prompt: inputValue 
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
      {/* Sidebar mobile */}
      <SheetMenu />

      <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Previsão Financeira</h2>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              size={28}
              placeholder="Objetivo para o próximo mês"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              variant="divideDark"
              type="button"
              onClick={fetchPrediction}
              disabled={isPending}
            >
              {isPending ? <LoadingOutlined spin /> : 
                          <div className="flex items-center">
                            <span className="mr-2">Gerar</span>
                            <Sparkles size={20} />
                          </div>
              }
            </Button>
          </div>
        </div>
      </div>

      {/* Infos Card */}
      <ListCardsAI
        nextIncome={data?.nextIncome || null}
        nextExpenses={data?.nextExpenses || null}
        isPending={isPending}
      />

      <Card className="col-span-4 md:col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle>Despesas por categoria no próximo mês</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center items-center pt-10">
          {expensesByCategoryWithNames.length > 0 || isPending ? (
            <Piechart
              isPending={isPending}
              data={expensesByCategoryWithNames}
            />
          ) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <span>Sem dados disponíveis</span>
            </div>
          )}
        </CardContent>
      </Card>

      {(data || isPending) && (
        <>
          {isPending ? (
            <>
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </>
          ) : (
            <>
              {data?.hasAnalysis && 
                <Alert
                  message="Recomendação"
                  description={data?.recomendation}
                  type="warning"
                  showIcon
                />
              }
              <Alert
                message="Resumo"
                description={data?.response}
                type="info"
                showIcon
              />
            </>
          )}
        </>
      )}
    </div>
  );
}