import { useDebtDataGroupTransaction } from "@/hooks/debt/debtHook";
import { useParams } from 'react-router-dom';
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { DetailTransactions } from '@/components/groups/transactions/DetailTransactions';

import { useState } from 'react';

export function GroupTransactionDetails() {
  const { id } = useParams();
  const groupTransactionId = Number(id);
  const { data: debts } = useDebtDataGroupTransaction(groupTransactionId); 

  if (!debts) {
    return <div>Debts não encontrado.</div>;
  }


  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
      {/* Sidebar mobile */}
      <SheetMenu />
			<div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Débitos</h2> 
       
      </div>
      <DetailTransactions groupTransactionId={groupTransactionId}/>
    </div>
  );
}

