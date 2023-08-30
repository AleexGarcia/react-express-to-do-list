import { Flex, IconButton,Text } from "@radix-ui/themes"
import { MdCheckCircleOutline, MdDeleteForever, MdRadioButtonUnchecked } from "react-icons/md"
import { ITask } from "../interfaces"



const Task = ({title,status}:ITask) => {
    
    return (
        <Flex className="flex gap-4 justify-around p-4 bg-slate-800">
            <IconButton >
                {status ? <MdCheckCircleOutline /> : <MdRadioButtonUnchecked />}
            </IconButton>
            <Text className="flex-grow">{title}</Text>
            <IconButton>
                <MdDeleteForever />
            </IconButton>
        </Flex>
    )
}

export default Task;