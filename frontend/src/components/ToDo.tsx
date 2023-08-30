import { Box, Flex, TextField, IconButton, Tooltip } from "@radix-ui/themes";
import { useState } from "react";
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { ITask } from "../interfaces";
import Task from "./Task";
import { useForm, SubmitHandler } from 'react-hook-form'
import { createTask } from "../services/taskService";
import { getToken } from "../services/storage";

type Inputs = {
    title: string,
}

const ToDo = () => {

    const [toDos, setToDos] = useState<Array<ITask>>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { title } = data;
        const token = getToken();
        if(token){
            const response = await createTask(title,token);
            console.log(response);
            response.status === 201 ? setToDos([...toDos, response.data]) : alert('Erro server')
        } 
    }

    return (
        <Box>
            <Flex className="flex flex-col container w-10/12 mx-auto text-stone-300 gap-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex className="p-4 bg-slate-800 rounded-lg flex justify-between gap-4 items-center">

                        <TextField.Root>
                            <TextField.Input
                                {...register("title", { required: true })}
                                className="bg-transparent outline-none " placeholder="Create a new todo..."
                            />
                            {errors.title && <span>This field is required</span>}
                        </TextField.Root>

                        <Tooltip
                            multiline
                            content="Add to do."
                        >
                            <IconButton radius="full" type="submit">
                                <AiOutlinePlusCircle />
                            </IconButton>
                        </Tooltip>
                    </Flex>
                </form>
                <Flex className="flex flex-col rounded">
                    {
                        toDos?.map(task => {
                            return <Task key={task.id} {...task} />
                        })
                    }
                </Flex>
            </Flex>
        </Box>
    )
}

export default ToDo;