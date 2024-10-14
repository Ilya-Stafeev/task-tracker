import { KanbanData } from "../../widgets/kanban/data/Kanban.data";
import Kanban from "../../widgets/kanban/Kanban";

export default function Tasks() {
    return <Kanban columns={KanbanData}/>
}