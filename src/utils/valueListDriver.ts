import { Remult } from "remult";
import { ValueList } from "../shared/valuelist";

export async function fetchValueListByCategory(category: string, remult: Remult): Promise<any[]> 
{
    const repo = remult.repo(ValueList)
    return repo.find
    ({where: { category }})
}