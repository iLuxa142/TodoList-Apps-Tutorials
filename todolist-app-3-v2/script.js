Vue.component('task-list', {
    template: '#task-list-template',
    props: {
        tasklist: {}
    }
});

Vue.component('task', {
    template: '#task-template',
    props: {
        task: {}
    },
    methods: {
        changeTaskStatus() {
            if (this.task)
                this.task.isDone = !this.task.isDone;
        },

        toggleTaskEditing() {
            if (this.task)
                this.task.isEditing = !this.task.isEditing;
        }
    }
});

var vue = new Vue({
    el: '#app',
    data() {
        return {
            filterText: '',
            newTask: { title: '', desc: '', isDone: false, isEditing: false },

            taskLists: [
                {
                    listName: "Inbox",
                    isCollapse: false,
                    tasks: [
                        {
                            title: 'Задача 1',
                            desc: 'Описание 1',
                            isDone: false,
                            isEditing: false
                        },
                        {
                            title: 'Задача 2',
                            desc: 'Описание 2',
                            isDone: false,
                            isEditing: false
                        },
                    ]
                },
                {
                    listName: "Проект Y",
                    isCollapse: false,
                    tasks: [
                        {
                            title: 'Купить материалы',
                            desc: 'контакты поставщика: ...',
                            isDone: true,
                            isEditing: false
                        }
                    ]
                },
                {
                    listName: "Хобби",
                    isCollapse: false,
                    tasks: [
                        {
                            title: 'Сыграть партию в Го',
                            desc: 'использовать стратегию Х',
                            isDone: true,
                            isEditing: false
                        }
                    ]
                },
                {
                    listName: "Архив",
                    isCollapse: false,
                    tasks: [
                        {
                            title: 'Задача 6',
                            desc: 'Описание ...',
                            isDone: false,
                            isEditing: false
                        }
                    ]
                }
            ]
        }
    },
    computed: {
        /*
        doTasksCount() {
            return this.taskList.filter(task => !task.isDone).length;
        },

        checkedTasksCount() {
            return this.taskList.filter(task => task.isDone).length;
        },

        filteredList() {
            const filter = this.filterText.toLowerCase();

            return this.taskList.filter(task =>
                task.title.toLowerCase().includes(filter) ||
                task.desc.toLowerCase().includes(filter));
        }
        */
    },
    methods: {
        clearFilterText() {
            this.filterText = '';
        },

        clearTaskInput() {
            this.newTask = { ...this.$options.data().newTask };
        },

        addTask() {
            if (this.newTask.title) {
                this.taskLists[0].tasks.push({ ...this.newTask });
                this.clearTaskInput();
            }
        }
    }
});