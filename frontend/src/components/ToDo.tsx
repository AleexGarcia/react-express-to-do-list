import { Box, Flex, TextField, IconButton, Tooltip, colorProp } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { ITask } from "../interfaces";
import Task from "./Task";
import { useForm, SubmitHandler } from 'react-hook-form'
import { createTask, deleteTask, getAllTasks, updateTask } from "../services/taskService";
import { getToken } from "../services/storage";

type Inputs = {
    title: string,
}

const ToDo = () => {

    const token = getToken() as string;
    const [toDos, setToDos] = useState<Array<ITask>>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { title } = data;
        if (token) {
            const response = await createTask(title, token);
            response.status === 201 ? setToDos([...toDos, response.data]) : alert('Erro server')
        }
    }

    useEffect(() => {
        if (token) {
            getAllTasks(token).then(response => {
                setToDos(response.data);
            })
        }
    }, [])

    const removeTask = async (id: string,token: string) => {
        try{
            const res = await deleteTask(id,token)
            if(res.status === 204){
                const list = toDos.filter(task => task.id !== id);
                setToDos(list);
            }else{
                throw console.error('Erro ao deletar user');
            }
            
        }catch{

        }
    }

    const updateStatus = async(id: string, token: string) => {
       
       try{
           await updateTask(id,token);
       }catch(err: any){
            console.log(err.message)
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
                            return (
                                <Task
                                    key={task.id}
                                    title={task.title}
                                    status={task.status}
                                    deleteTask={() => removeTask(task.id, token)}
                                    updateTask={() => updateStatus(task.id, token)}
                             
                                />

                            )

                        })
                    }
                </Flex>
            </Flex>
        </Box>
    )
}

export default ToDo;