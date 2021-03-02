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

            for (let list of this.taskLists) {
                let filterTasks = list.tasks.filter(task =>
                    task.title.toLowerCase().includes(filter) ||
                    task.desc.toLowerCase().includes(filter));

                filteredList.push(...filterTasks);
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
            if (!this.taskLists[listIndex] && !this.taskLists[listIndex].tasks[taskIndex]) return;

            // Варианты сортировки задач по статусу завершённости
            // Вариант вырезать отмеченный и вставить в конец списка
            const isDone = this.taskLists[listIndex].tasks[taskIndex].isDone;
            const checkTask = this.taskLists[listIndex].tasks.splice(taskIndex, 1);

            if (isDone) {
                this.taskLists[listIndex].tasks.push(...checkTask); // завершённые в конец списка
            } else {
                this.taskLists[listIndex].tasks.unshift(...checkTask); // вновь открытые в начало списка
            }

            // Вариант сортировки array.sort // более дорогой метод
            // this.taskLists[listIndex].tasks.sort((a, b) => a.isDone - b.isDone);

            // Вариант сортировки filter
            // const doTask = this.taskLists[listIndex].tasks.filter(task => !task.isDone);
            // const doneTask = this.taskLists[listIndex].tasks.filter(task => task.isDone);
            // const newList = doTask.concat(...doneTask);
            // Как правильно присвоить newList в this.taskLists[listIndex] ?
            // Vue не отслеживает прямое присвоение по индексу (this.taskLists[listIndex] = newList)
        },

        toggleTaskEditing(listIndex, taskIndex) {
            if (!this.taskLists[listIndex] && !this.taskLists[listIndex].tasks[taskIndex]) return;

            this.taskLists[listIndex].tasks[taskIndex].isEditing = !this.taskLists[listIndex].tasks[taskIndex].isEditing;
        },

        activateTaskAdding(listIndex) {
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
        },

        changeListOrder(listIndex, direction) {
            if (!this.taskLists[listIndex]) return;

            // не передвигать за границы массива списков (0..length)
            if (direction == 'up' && listIndex == 0) return;
            if (direction == 'down' && listIndex == this.taskLists.length - 1) return;
            if (direction != 'up' && direction != 'down') return; // direction unknown

            // вырезать
            let movedList = this.taskLists.splice(listIndex, 1);

            // вставить
            if (direction == 'up') {
                this.taskLists.splice(listIndex - 1, 0, ...movedList);
            } else {
                this.taskLists.splice(listIndex + 1, 0, ...movedList);
            }
        },

        changeTaskOrder(listIndex, taskIndex, direction) {
            if (!this.taskLists[listIndex] && !this.taskLists[listIndex].tasks[taskIndex]) return;

            // не передвигать если:
            if (direction == 'up' && taskIndex == 0) return; // первый в списке
            if (direction == 'down' && taskIndex == this.taskLists[listIndex].tasks.length - 1) return; // последний в списке
            if (direction != 'up' && direction != 'down') return; // direction unknown
            if (this.taskLists[listIndex].tasks[taskIndex].isDone) return; // завершённый
            if (direction == 'down' && this.taskLists[listIndex].tasks[taskIndex + 1].isDone) return; // при движении вниз следующий (ниже) таск завершённый

            // Да когда уже можно передвигать!?!?!

            // вырезать
            let movedTask = this.taskLists[listIndex].tasks.splice(taskIndex, 1);

            // вставить
            if (direction == 'up') {
                this.taskLists[listIndex].tasks.splice(taskIndex - 1, 0, ...movedTask);
            } else {
                this.taskLists[listIndex].tasks.splice(taskIndex + 1, 0, ...movedTask);
            }
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