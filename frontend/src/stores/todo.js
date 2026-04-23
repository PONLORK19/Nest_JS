import { defineStore } from "pinia";
import axios from "axios";

const API = "http://localhost:3100/tasks";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),

  getters: {
    countTodos: (state) => state.todos.filter((t) => !t.completedAt).length,
  },

  actions: {
    async fetchTodos() {
      const res = await axios.get(API);
      this.todos = res.data;
    },

    async addTodo(todo) {
      await axios.post(API, {
        ...todo,
        userId: 1,
      });
      await this.fetchTodos();
    },

    async deleteTodo(id) {
      await axios.delete(`${API}/${id}`);
      await this.fetchTodos();
    },

    async markDone(id) {
      await axios.patch(`${API}/${id}/done`);
      await this.fetchTodos();
    },

    async markPending(id) {
      await axios.patch(`${API}/${id}/pending`);
      await this.fetchTodos();
    },

    async clearAll() {
      const res = await axios.get(API);
      for (const t of res.data) {
        await axios.delete(`${API}/${t.id}`);
      }
      await this.fetchTodos();
    },
  },
});
