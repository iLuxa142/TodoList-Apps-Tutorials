import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
      if (task.status == "active" && new Date(task.date) < new Date()  ) {
        task.status = "outdated";
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
      if (idx == -1) return;

      state.tasks.splice(idx,1);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    updateTask(state, {id, title, desc, notesMD, status, isCompleted, tags, date }) {
      const tasks = state.tasks.concat();
      const idx = tasks.findIndex(t => t.id === id);
      if (idx == -1) return;

      const task = tasks[idx];

      tasks[idx] = {...task, title, desc, notesMD, status, isCompleted, tags, date };
      state.tasks = tasks;

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    toggleCompleteStatus(state, id) {
      const idx = state.tasks.findIndex(t => t.id === id);
      if (idx == -1) return;
      
      if (state.tasks[idx].status == "completed") {
        state.tasks[idx].status = (new Date(state.tasks[idx].date) < new Date()) ? "outdated" : "active";
      } else {
        state.tasks[idx].status = "completed";
      }

      state.tasks[idx].isCompleted = !state.tasks[idx].isCompleted;
     
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
    
    toggleCompleteStatus({commit}, id) {
      commit('toggleCompleteStatus', id);
    }
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s=> id => s.tasks.find(t => t.id === id)
  }
})
