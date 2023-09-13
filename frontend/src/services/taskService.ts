import { api } from "./api";

import { AxiosResponse } from "axios";
export const createTask = async (title: string, token: string) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
    const response = await api.post(
      "/task",
      {
        title: title,
      },
      { headers }
    );
    return response;
  } catch (err) {
    throw err;
  }
};
export const updateTask = async (
  idTask: string,
  token: string
): Promise<AxiosResponse> => {
  return await api.patch(`/task/${idTask}`, undefined, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const deleteTask = async (
  idTask: string,
  token: string
): Promise<AxiosResponse> => {
  return await api.delete(`/task/${idTask}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const deleteCompletedTasks = async (
  token: string
): Promise<AxiosResponse> => {
  return await api.delete(`/tasks`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getAllTasks = async (token: string) => {
  const response = await api.get("/tasks", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};
