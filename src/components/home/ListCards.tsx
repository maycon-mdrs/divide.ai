import { CardData } from "@/components/global/card/CardData";
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { formatMoney, formatDate } from "@/utils/Formatter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function ListCards() {

  const infos = [
    {
      title: 'Entradas',
      value: formatMoney(1000),
      icon: <IoArrowUpCircleOutline size={26} color="15803d" />,
      text: `Última entrada em ${formatDate("10/02/2024")}`,
      route: "/entradas",
      tooltip: "Valor total de suas receitas cadastradas."
    },
    {
      title: 'Saídas',
      value: formatMoney(1000),
      icon: <IoArrowDownCircleOutline size={26} color="be123c" />,
      text: `Última saída em ${formatDate("10/02/2024")}`,
      route: "/saidas",
      tooltip: "Valor total de suas despesas cadastradas, pagas ou pendentes."
    },
    {
      title: 'Saldo atual',
      value: formatMoney(1000),
      icon: <MdAttachMoney size={26} />,
      route: "/saldo",
      tooltip: "Saldo atual de suas receitas e despesas."
    },
  ];

  return (
    <ScrollArea className="whitespace-nowrap pb-4">
      <div className="flex gap-4 w-full">
        {infos.map((info, index) => (
          <CardData
            key={index}
            title={info.title}
            value={info.value}
            icon={info.icon}
            text={info.text}
            route={info.route}
            style={{ width: '100%' }}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea >
  );
}