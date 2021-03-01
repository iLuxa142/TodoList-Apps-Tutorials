Vue.component('task-list', {
    template: '#task-list-template',
    props: {
        filtertext: '',
    },
    data() {
        return {
            newTask: { title: '', desc: '', isDone: false, isEditing: false },

            newList: {
                listName: '',
                isCollapse: false,
                isAddingTask: false,
                tasks: []
            },

            taskLists: [
                {
                    listName: 'Inbox',
                    isCollapse: false,
                    isAddingTask: false,
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
                    listName: 'Проект Y',
                    isCollapse: false,
                    isAddingTask: false,
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
                    listName: 'Хобби',
                    isCollapse: false,
                    isAddingTask: false,
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
                    listName: 'Архив',
                    isCollapse: false,
                    isAddingTask: false,
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
    methods: {
        addList() {
            if (this.newList.listName) {
                this.taskLists.unshift({ ...this.newList });
                this.newList = { ...this.$options.data().newList };
            }
        },

        addTask(list) {
            if (this.newTask.title) {
                list.tasks.unshift({ ...this.newTask });
                this.clearTaskInput();
            }
        },

        deleteList(index) {
            if (!this.taskLists[index]) return;

            const tasksCount = this.taskLists[index].tasks.length;
            const answer = confirm('Вы точно хотите удалить список "' + this.taskLists[index].listName +
                '" содержащий: ' + tasksCount + ' задач?');

            if (answer) {
                this.taskLists.splice(index, 1);
            }
        },

        changeTaskStatus(task) {
            if (task)
                task.isDone = !task.isDone;
        },

        toggleTaskEditing(task) {
            if (task)
                task.isEditing = !task.isEditing;
        },

        toggleTaskAdding(list) {
            const isCurrListAdding = list.isAddingTask;

            this.clearTaskInput();

            // закрыть форму добавления задачи, если она возможно открыта другом списке
            this.taskLists.forEach(tasklist => tasklist.isAddingTask = false);

            // Если в текущем списке форма не была открытой, то открыть 
            if (isCurrListAdding == list.isAddingTask)
                list.isAddingTask = !list.isAddingTask;
        },

        clearTaskInput() {
            this.newTask = { ...this.$options.data().newTask };
        },
    }
});


var vue = new Vue({
    el: '#app',
    data() {
        return {
            filterText: '',
        }
    },
    computed: {
        /*
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
    }
});