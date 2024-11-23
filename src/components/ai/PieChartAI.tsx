import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { formatMoney } from '@/utils/Formatter';
import { Skeleton } from '../ui/skeleton';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

interface PiechartProps {
    data: { amount: number; categoryName: string }[];
    isPending?: Boolean; 
  }
  
  export function Piechart({ data, isPending }: PiechartProps) {
    if (isPending) {
      return (
        <div className="relative w-48 h-48">
        <Skeleton className="absolute inset-0 rounded-full" />
        <div className="absolute top-[15%] left-[15%] w-[70%] h-[70%] rounded-full bg-white"></div>
      </div>
      );
    }
  
    const chartData = data.map((item) => ({
      value: item.amount,
      label: item.categoryName,
    }));
  
    const totalValue = formatMoney(data.reduce((acc, curr) => acc + curr.amount, 0));
  
    const size = {
      margin: { right: 5 },
      maxwidth: 400,
      height: 200,
      legend: { hidden: true },
      sx: {
        touchAction: 'pan-y',
      },
    };
  
    return (
      <PieChart
        series={[
          {
            data: chartData,
            innerRadius: 70,
            valueFormatter: (value) => formatMoney(value.value),
          },
        ]}
        {...size}
      >
        <PieCenterLabel>{totalValue}</PieCenterLabel>
      </PieChart>
    );
  }
  