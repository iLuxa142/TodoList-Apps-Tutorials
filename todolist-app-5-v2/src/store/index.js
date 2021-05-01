import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
      if (task.status == "active" && new Date(task.date) < new Date()) {
        task.status = "outdated";
      }

      return task;
    }),
    lists: JSON.parse(localStorage.getItem('lists') || '[]'),

    icons: ["fiber_new", "monetization_on", "work", "assignment", "favorite", "add_shopping_cart"],

    // lists: [
    //         { id: 1, title: "List 1", icon: "fiber_new", tasks: [1617574933864]},
    //         { id: 2, title: "Finance", icon: "monetization_on", tasks: [1618331961444]},
    //         { id: 3, title: "Work", icon: "work", tasks: [1617575867688, 1617574935120, 1618320657442]},
    //         { id: 4, title: "Projects", icon: "assignment", tasks: [1618320657442]},
    //         { id: 5, title: "Health", icon: "favorite", tasks: [1617574935120]},
    //         { id: 6, title: "Shopping", icon: "add_shopping_cart", tasks: [1618331838965]},
    //        ]
  },
  mutations: {
    createTask(state, {listId, task}) {
      state.tasks.push(task);
      state.lists.find(l => l.id == listId).tasks.push(task.id);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('lists', JSON.stringify(state.lists));
    },

    deleteTask(state, taskId) {
      let tid = state.tasks.findIndex(t => t.id == taskId);
      if (tid == -1) return;

      state.tasks.splice(tid,1);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));

      let list = state.lists.find(l => l.tasks.includes(taskId));
      if (!list) return;
      
      tid = list.tasks.findIndex(id => id == taskId);
      if (tid == -1) return;

      list.tasks.splice(tid,1);
      localStorage.setItem('lists', JSON.stringify(state.lists));
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

    createList(state, list) {      
      list.icon = state.icons[Math.trunc(Math.random()*6)];
      state.lists.push(list);
      localStorage.setItem('lists', JSON.stringify(state.lists));
    },

    renameList(state, {id, title}) {
      const idx = state.lists.findIndex(l => l.id == id);
      if (idx == -1 || title.trim() === "") return;

      state.lists.find(l => l.id == id).title = title;
      localStorage.setItem('lists', JSON.stringify(state.lists));
    },

    deleteList(state, id) {
      const idx = state.lists.findIndex(l => l.id == id);
      if (idx == -1) return;

      state.lists.splice(idx,1);
      localStorage.setItem('lists', JSON.stringify(state.lists));
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
    createTask({commit}, {listId, task}) {
      commit('createTask', {listId, task});
    },

    deleteTask({commit}, taskId) {
      commit('deleteTask', taskId);
    },

    updateTask({commit}, task) {
      commit('updateTask', task);
    },

    createList({commit}, list) {
      commit('createList', list);
    },

    renameList({commit}, {id, title}) {
      commit('renameList', {id, title});
    },

    deleteList({commit}, id) {
      commit('deleteList', id);
    },
    
    toggleCompleteStatus({commit}, id) {
      commit('toggleCompleteStatus', id);
    }
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s => id => s.tasks.find(t => t.id == id),
    tasksFromListId: (s, getters) => id => s.lists.find(l => l.id == id).tasks.map(i => getters.taskById(i)),
    lists: s => s.lists,
    listById: s => id => s.lists.find(l => l.id == id),
  }
})
