import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { GroupAvatars } from "./GroupAvatars";
import { GroupOptions } from "./GroupOptions";
import { IGroup } from "@/interfaces/IGroup";

interface GroupCardProps {
  group: IGroup;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="flex flex-row justify-between items-start">
        <div className="flex flex-col">
          <CardTitle>
            <span
              className="inline-block bg-[#E9F3F2] text-[#438883] 
                        px-3 py-1 rounded-full text-lg font-medium mb-4"
            >
              {group.name}
            </span>
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Criado por: {group.createdBy.firstName} {group.createdBy.lastName}
          </CardDescription>
          <CardDescription className="text-sm text-gray-600">
            {group.description}
          </CardDescription>
        </div>
        <GroupOptions group={group} />
      </CardHeader>

      <CardFooter>
        <GroupAvatars users={group.members} />
      </CardFooter>
    </Card>
  );
}

