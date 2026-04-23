<!-- <template>
  <ul class="todoLists">
    <template v-if="status == 'completed'">
      <TodoItem
        v-for="todo of completedTasks"
        icon="uil-adobe-alt"
        :todo="todo"
      />
    </template>
    <template v-else>
      <TodoItem
        v-for="todo of pendingTasks"
        icon="uil-adobe-alt"
        :todo="todo"
      />
    </template>
  </ul>
</template>
<script>
import { mapState } from "pinia";
import TodoItem from "./TodoItem.vue";
import { useTodoStore } from "../stores/todo";

export default {
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  name: "TodoList",
  props: ["status"],
  components: {
    TodoItem,
  },
  data() {
    return {
      color: "red",
    };
  },
  async mounted() {
    // we will call action fetchTodos
    await this.todoStore.fetchTodos();
  },
  computed: {
    ...mapState(useTodoStore, ["todos", "countTodos"]),
    completedTasks() {
      if (this.todos) {
        return this.todos.filter((todo) => todo.completedAt != null);
      }
      return [];
    },
    pendingTasks() {
      if (this.todos) {
        // if (this.todos.length > 2) {
        //   this.todos.push({ task: "new" });
        // }
        return this.todos.filter((todo) => todo.completedAt == null);
      }
      return [];
    },
  },
  watch: {
    todos: {
      immediate: true,
      handler: function (dataChanged) {
        console.log("todos are changed");
      },
    },
  },
};
</script> -->
<template>
  <div>
    <div v-for="todo in filteredTodos" :key="todo.id" class="todo">
      <span :class="{ done: todo.completedAt }">
        {{ todo.name }}
      </span>

      <div class="actions">
        <button
          v-if="!todo.completedAt"
          class="done-btn"
          @click="markDone(todo.id)"
        >
          ✔
        </button>

        <button v-else class="pending-btn" @click="markPending(todo.id)">
          ↺
        </button>

        <button class="delete-btn" @click="remove(todo.id)">✖</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useTodoStore } from "../stores/todo";

export default {
  props: ["status"],

  setup() {
    const store = useTodoStore();
    return { store };
  },

  computed: {
    filteredTodos() {
      if (this.status === "pending") {
        return this.store.todos.filter((t) => !t.completedAt);
      }
      return this.store.todos.filter((t) => t.completedAt);
    },
  },

  methods: {
    markDone(id) {
      this.store.markDone(id);
    },
    markPending(id) {
      this.store.markPending(id);
    },
    remove(id) {
      this.store.deleteTodo(id);
    },
  },
};
</script>

<style>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-top: 10px;
  background: #f9fafb;
  border-radius: 12px;
}

.done {
  text-decoration: line-through;
  color: gray;
}

.actions button {
  margin-left: 6px;
  padding: 6px 10px;
  border-radius: 8px;
}

.done-btn {
  background: #22c55e;
  color: white;
}

.pending-btn {
  background: #f59e0b;
  color: white;
}

.delete-btn {
  background: #ef4444;
  color: white;
}
</style>
