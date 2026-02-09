import axios from "axios";
import { toast } from "sonner";

const BASEURL = process.env.BASEURL || "http://127.0.0.1:8000/todos/";

export const getTodos = async () => {
  try {
    const response = await axios.get(BASEURL);
    console.log("Fetched todos: ", response.data);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch todos!");
    console.error("Error fetching todos: ", error);
  }
};

export const addTodo = async (name: string) => {
  try {
    const response = await axios.post(`${BASEURL}create`, {
      name: name.trim(),
    });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error("Failed to add todo!");
    console.error("Error adding todo: ", error);
  }
};

export const toggleTodo = async (id: number, completed: boolean) => {
  try {
    const response = await axios.patch(`${BASEURL}${id}/update`, { completed });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error("Failed to update todo!");
    console.error("Error updating todo: ", error);
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const response = await axios.delete(`${BASEURL}${id}/delete`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error("Failed to delete todo!");
    console.error("Error deleting todo: ", error);
  }
};

export const deleteCompletedTodos = async () => {
  try {
    const response = await axios.delete(`${BASEURL}completed/delete`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error("Failed to delete completed todos!");
    console.error("Error deleting completed todos: ", error);
  }
};
