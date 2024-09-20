import { FaTrashAlt } from "react-icons/fa";
import useDeleteData from "../../hooks/deleteData/deleteData";

export default function DeleteButton({entityType, id, onDelete={onDelete}}) {
    const deleteData = useDeleteData();

    async function deleteItem(id) {
        const result = await deleteData(entityType, id);
        onDelete(id);
    }

    return (
        <FaTrashAlt className="delete-button" onClick={() => deleteItem(id)}/>
    );
}