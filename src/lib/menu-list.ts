import {
  Tag,
  Users,
  Settings,
  CircleArrowUp,
  CircleArrowDown,
  ArrowDownToLine,
  ArrowUpToLine,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Controle pessoal",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname.includes("/"),
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: "/categorias",
          label: "Categorias",
          active: pathname.includes("/categorias"),
          icon: Tag,
          submenus: []
        },
        {
          href: "/entradas",
          label: "Entradas",
          active: pathname.includes("/entradas"),
          icon: CircleArrowUp,
          submenus: []
        },
        {
          href: "/saidas",
          label: "Saídas",
          active: pathname.includes("/saidas"),
          icon: CircleArrowDown,
          submenus: []
        },
      ]
    },
    {
      groupLabel: "Controle grupo",
      menus: [
        {
          href: "/grupos",
          label: "Grupos",
          active: pathname.includes("/grupos"),
          icon: Users
        },
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/conta",
          label: "Conta",
          active: pathname.includes("/conta"),
          icon: Settings
        }
      ]
    }
  ];
}