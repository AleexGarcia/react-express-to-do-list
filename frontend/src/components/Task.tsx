import { Flex, IconButton, Text } from "@radix-ui/themes"
import { useState } from "react"
import { MdCheckCircleOutline, MdDeleteForever, MdRadioButtonUnchecked } from "react-icons/md"


interface Task {
    title: string,
    status: boolean,
    deleteTask: () => Promise<void>,
    updateTask: () => Promise<void>,
}
const Task = ({ title, status, deleteTask, updateTask }: Task) => {
    const [isChecked, setCheck] = useState(status);
    return (
        <Flex className="flex gap-4 justify-around p-4 bg-slate-800">
            <IconButton onClick={() => {
                updateTask();
                setCheck(true);
            }} disabled={isChecked}>
                {isChecked ? <MdCheckCircleOutline /> : <MdRadioButtonUnchecked />}
            </IconButton>
            <Text className={`flex-grow ${isChecked && 'line-through'}`}>{title}</Text>
            <IconButton onClick={deleteTask}>
                <MdDeleteForever />
            </IconButton>
        </Flex>
    )
}

export default Task;