import {
  Tag,
  Users,
  Settings,
  ArrowRightLeft,
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
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
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
          href: "/transasoes",
          label: "Transações",
          active: pathname.includes("/transasoes"),
          icon: ArrowRightLeft,
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