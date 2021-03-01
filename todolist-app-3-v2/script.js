Vue.component('task-list', {
    template: '#task-list-template',
    props: {
        filtertext: '',
    },
    data() {
        return {
            itemId: 6,
            newTask: { id: 0, title: '', desc: '', isDone: false, isEditing: false },

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
                            id: 1,
                            title: 'Задача 1',
                            desc: 'Описание 1',
                            isDone: false,
                            isEditing: false
                        },
                        {
                            id: 2,
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
                            id: 3,
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
                            id: 4,
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
                            id: 5,
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
        filteredList() {
            const filter = this.filtertext.toLowerCase();

            let filteredList = [];

            // да-да, знаю-знаю
            for (let list of this.taskLists) {
                for (let task of list.tasks) {
                    if (task.title.toLowerCase().includes(filter) || task.desc.toLowerCase().includes(filter))
                        filteredList.push(task);
                }
            }

            return filteredList;
        }
    },


    methods: {
        addList() {
            if (!this.newList.listName) return;

            this.taskLists.unshift({ ...this.newList });
            this.newList = { ...this.$options.data().newList };
        },

        addTask(listIndex) {
            if (!this.newTask.title) return;

            this.newTask.id = this.itemId++;
            this.taskLists[listIndex].tasks.unshift({ ...this.newTask });
            this.clearTaskInput();

            // фокус на поле ввода
            this.focusInputTitle();
        },

        deleteList(listIndex) {
            if (!this.taskLists[listIndex]) return;

            const tasksCount = this.taskLists[listIndex].tasks.length;
            const answer = confirm('Вы точно хотите удалить список "' + this.taskLists[listIndex].listName +
                '" содержащий: ' + tasksCount + ' задач?');

            if (answer) {
                this.taskLists.splice(listIndex, 1);
            }
        },

        changeTaskStatus(listIndex, taskIndex) {
            let targetTask = this.taskLists[listIndex].tasks[taskIndex];

            if (!targetTask) return;

            // Вариант сортировки array.sort
            this.taskLists[listIndex].tasks.sort((a, b) => a.isDone - b.isDone);
        },

        toggleTaskEditing(task) {
            if (!task) return;

            task.isEditing = !task.isEditing;
        },

        toggleTaskAdding(listIndex) {
            const isCurrListAdding = this.taskLists[listIndex].isAddingTask;

            this.clearTaskInput();

            // закрыть форму добавления задачи, если она возможно открыта другом списке
            this.taskLists = this.taskLists.map(tasklist => ({ ...tasklist, isAddingTask: false }));

            // Если в текущем списке форма не была открытой, то открыть 
            const currList = this.taskLists[listIndex];
            if (isCurrListAdding == currList.isAddingTask) {
                currList.isAddingTask = !currList.isAddingTask;
            }

            if (currList.isAddingTask) {
                this.focusInputTitle();
            }
        },

        clearTaskInput() {
            this.newTask = { ...this.$options.data().newTask };
        },

        focusInputTitle() {
            // фокус на поле ввода
            // Вариант c getElementById
            setTimeout(() => document.getElementById('inputtitle').focus(), 100);

            // Вариант с refs
            //setTimeout(() => this.$refs['inputtitle'].focus(), 100);

            // Нормальный вариант... найти позже
        }
    }
});


let vue = new Vue({
    el: '#app',
    data() {
        return {
            filterText: '',
        }
    },

    methods: {
        clearFilterText() {
            this.filterText = '';
        },
    }
});

/* архив (может потребоваться)

    // фокус на поле ввода
    // Вариант c getElementById
    //setTimeout(() => document.getElementById('inputtitle').focus(), 100);

    // Вариант с refs
    //setTimeout(() => this.$refs['inputtitle'].focus(), 100);


moveToBottom = this.taskLists[listIndex].tasks.splice(taskIndex, 1);
//this.taskLists[listIndex].tasks.push(...moveToBottom);


    computed: {
        /*
        listSortedByDone(listIndex) {
            console.log(listIndex);
            const sortedList = this.taskLists[listIndex].tasks;
            sortedList.sort((a, b) => a.isDone - b.isDone);
            return sortedList;
        }
    },

*/