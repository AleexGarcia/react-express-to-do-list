import {
  Flex,
  TextField,
  IconButton,
  Tooltip,
  Button,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ITask } from "../interfaces";
import Task from "./Task";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../services/taskService";
import { getToken } from "../services/storage";

type Inputs = {
  title: string;
};

const ToDo = () => {
  const token = getToken() as string;
  const [toDos, setToDos] = useState<Array<ITask>>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { title } = data;
    if (token) {
      const response = await createTask(title, token);
      if (response.status === 201) {
        setToDos([...toDos, response.data]);
      } else {
      }
    }
    reset();
  };

  useEffect(() => {
    if (token) {
      getAllTasks(token).then((response) => {
        setToDos(response.data);
      });
    }
  }, []);

  const removeTask = async (id: string, token: string) => {
    try {
      const res = await deleteTask(id, token);
      if (res.status === 204) {
        const list = toDos.filter((task) => task.id !== id);
        setToDos(list);
      } else {
        throw console.error("Erro ao deletar user");
      }
    } catch {}
  };

  const updateStatus = async (id: string, token: string) => {
    try {
      await updateTask(id, token);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const filterToDos = (params: "active" | "completed" | "all"): void => {
    getAllTasks(token).then((response) => {
      const fullList: Array<ITask> = response.data;
      if (params === "all") {
        setToDos(fullList);
      } else {
        const filteredList =
          params === "active"
            ? fullList.filter((task) => !task.status)
            : fullList.filter((task) => task.status);
        setToDos(filteredList);
      }
    });
  };

  return (
    <Flex className="flex-grow py-10 flex flex-col container max-w-[280px] sm:max-w-lg mx-auto text-primary-default dark:text-primary-dark gap-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex className="p-4 bg-bg-default dark:bg-bg-dark rounded-lg flex justify-between gap-4 items-center">
          <TextField.Root>
            <TextField.Input
              {...register("title", { required: true })}
              className="bg-transparent outline-none w-full"
              placeholder="Create a new todo..."
            />
            {errors.title && <span>This field is required</span>}
          </TextField.Root>
          <Tooltip multiline content="Add to do.">
            <IconButton radius="full" type="submit">
              <AiOutlinePlusCircle />
            </IconButton>
          </Tooltip>
        </Flex>
      </form>
      <Flex className="flex flex-col rounded overflow-y-auto h-[45vh]">
        {toDos?.map((task) => {
          return (
            <Task
              key={task.id}
              title={task.title}
              status={task.status}
              deleteTask={() => removeTask(task.id, token)}
              updateTask={() => updateStatus(task.id, token)}
            />
          );
        })}
        {toDos && (
          <Flex className="flex flex-row justify-between p-4 bg-bg-default dark:bg-bg-dark rounded-b-lg">
            <Text>
              <span>5</span> item left
            </Text>
            <Flex className="flex flex-row gap-4">
              <Button onClick={() => filterToDos("all")}>All</Button>
              <Button onClick={() => filterToDos("active")}>Active</Button>
              <Button onClick={() => filterToDos("completed")}>
                Completed
              </Button>
            </Flex>
            <Button>Clear Completed</Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ToDo;
