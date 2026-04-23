<!-- <template>
  <div class="input-field">
    <textarea
      @keyup.enter.prevent="addTodo"
      ref="input"
      placeholder="Enter your new todo"
    ></textarea>
    <i class="uil uil-notes note-icon"></i>
  </div>
</template>
<script>
export default {
  methods: {
    addTodo(e) {
      this.$emit("added", e.target.value);
      this.$refs.input.value = null;
    },
  },
};
</script> -->
<template>
  <div class="add">
    <input v-model="name" placeholder="What do you need to do?" />
    <button @click="add">Add</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    add() {
      if (!this.name) return;

      this.$emit("added", {
        name: this.name,
        description: "",
      });

      this.name = "";
    },
  },
};
</script>

<style>
.add {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
}

button {
  background: #3b82f6;
  color: white;
}
</style>
