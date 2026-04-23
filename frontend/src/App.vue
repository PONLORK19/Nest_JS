<template>
  <div class="app">
    <div class="card">
      <h1>📝 Todo Manager</h1>

      <AddTodo @added="handleAddTodo" />

      <div class="section">
        <h3>Pending Tasks</h3>
        <TodoList status="pending" />
      </div>

      <div class="section">
        <h3>Completed Tasks</h3>
        <TodoList status="completed" />
      </div>

      <div class="footer">
        <span>
          You have <b>{{ nbOfTodo }}</b> tasks pending
        </span>
        <button @click="clearAllTodos">Clear All</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { mapState } from "pinia";
import AddTodo from "./components/AddTodo.vue";
import TodoList from "./components/TodoList.vue";
import { useTodoStore } from "./stores/todo";

export default {
  components: { AddTodo, TodoList },

  setup() {
    const store = useTodoStore();

    onMounted(() => {
      store.fetchTodos();
    });

    return { store };
  },

  computed: {
    ...mapState(useTodoStore, {
      nbOfTodo: "countTodos",
    }),
  },

  methods: {
    handleAddTodo(todo) {
      this.store.addTodo(todo);
    },
    clearAllTodos() {
      this.store.clearAll();
    },
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
  background: linear-gradient(135deg, #e0e7ff, #f8fafc);
}

.app {
  display: flex;
  justify-content: center;
  padding: 50px 20px;
}

.card {
  background: white;
  padding: 30px;
  width: 500px;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.section {
  margin-top: 25px;
}

.footer {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  opacity: 0.8;
}

.footer button {
  background: #ef4444;
  color: white;
}
</style>