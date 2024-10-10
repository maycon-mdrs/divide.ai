import { GroupCard } from "@/components/groups/listGroup/GroupCard";
import { IGroupCard } from "@/interfaces/IGroup";
import { IUserCard } from "@/interfaces/IUser";
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { DrawerInsertCode } from "@/components/groups/DrawerInsertCode";
import { DrawerNewGroup } from "@/components/groups/saveGroup/DrawerNewGroup";

const users: IUserCard[] = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Brown",
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Williams",
  },
];

const groups: IGroupCard[] = [
  {
    id: 1,
    name: 'Grupo A',
    description: 'Grupo divertido de amigos',
    status: 'active',
    creator: { id: 0, firstName: 'João', lastName: 'Pereira' },
    users: users,
    groupCode: 'XXX' 
  },
  {
    id: 2,
    name: 'Grupo B',
    description: 'Grupo de trabalho',
    status: 'active',
    creator: { id: 0, firstName: 'Maria', lastName: 'Silva'},
    users: users,
    groupCode: 'YYYYY' 
  },
  {
    id: 3,
    name: 'Grupo C',
    description: 'Grupo de estudos',
    status: 'active',
    creator: { id: 0, firstName: 'Carlos', lastName: 'Oliveira'},
    users: users,
    groupCode: 'ZZZZZ' 
  },
];

export function Groups() {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
			{/* Sidebar mobile */}
			<SheetMenu />
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciar grupos</h2>
        <div className="flex items-center space-x-2">
          <DrawerNewGroup />
          <DrawerInsertCode />
        </div>
      </div>
			
			{/* Lista de Grupos */}
      {groups.map((groupCard) => (
          <GroupCard key={groupCard.id} group={groupCard} />
        ))}

		</div> 
    );
}
