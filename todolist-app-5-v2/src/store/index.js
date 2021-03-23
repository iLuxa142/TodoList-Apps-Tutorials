import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
      if (new Date(task.date) < new Date()) {
        task.status = 'outdated';
      }

      return task;
    })
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    deleteTask(state,id) {
      const idx = state.tasks.findIndex(t => t.id === id);
      state.tasks.splice(idx,1);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    updateTask(state, {id, title, desc, date}) {
      const tasks = state.tasks.concat();
      const idx = tasks.findIndex(t => t.id === id);
      const task = tasks[idx];

      const status = new Date(date) > new Date() ? 'active' : 'outdated';
      tasks[idx] = {...task, date, title, desc, status };
      state.tasks = tasks;

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    completeTask(state, id) {
      const idx = state.tasks.findIndex(t => t.id === id);
      state.tasks[idx].status = 'completed';
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
  actions: {
    createTask({commit}, task) {
      commit('createTask', task);
    },

    deleteTask({commit}, id) {
      commit('deleteTask', id);
    },

    updateTask({commit}, task) {
      commit('updateTask', task);
    },
    
    completeTask({commit}, id) {
      commit('completeTask', id);
    }
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s=> id => s.tasks.find(t => t.id === id)
  }
})
