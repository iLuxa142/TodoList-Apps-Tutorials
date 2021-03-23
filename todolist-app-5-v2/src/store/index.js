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
      state.tasks.splice(idx,1);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    updateTask(state, {title, desc, id, status, tags, date }) {
      const tasks = state.tasks.concat();
      const idx = tasks.findIndex(t => t.id === id);
      const task = tasks[idx];

      tasks[idx] = {...task, title, desc, status, tags, date };
      state.tasks = tasks;

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    changeComplete(state, id) {
      const idx = state.tasks.findIndex(t => t.id === id);
      
      if (state.tasks[idx].status == "completed")      {
        state.tasks[idx].status = "active";
      } else {
        state.tasks[idx].status = "completed";
      }
     
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
    
    changeComplete({commit}, id) {
      commit('changeComplete', id);
    }
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s=> id => s.tasks.find(t => t.id === id)
  }
})
