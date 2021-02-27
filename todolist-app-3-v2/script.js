Vue.component('task-list', {
    template: '#task-list-template',
    props: {
        data: {}
    }
});

Vue.component('task', {
    template: '#task-template',
    props: {
        data: {}
    },
    methods: {
        changeTaskStatus() {
            if (this.data)
                this.data.isDone = !this.data.isDone;
        },

        toggleTaskEditing() {
            if (this.data)
                this.data.isEditing = !this.data.isEditing;
        }
    }
});

var vue = new Vue({
    el: '#app',
    data() {
        return {
            filterText: '',
            hideCompleteList: false,
            isCheckAllFiltered: false,
            newTask: { title: '', desc: '', isDone: false, isEditing: false },

            taskLists: [
                {
                    listName: "Текущие задачи",
                    isCollapse: false,
                    tasks: [
                        {
                            title: 'Доделать проект Х к 30.03.2021',
                            desc: 'Позвонить Х, закрыть сделку',
                            isDone: false,
                            isEditing: false
                        },
                        {
                            title: 'Доделать проект У к 30.04.2021',
                            desc: 'Запустить сайт Yandex',
                            isDone: false,
                            isEditing: false
                        }
                    ]
                },
                {
                    listName: "Завершённые задачи",
                    isCollapse: false,
                    tasks: [
                        {
                            title: 'Доделать проект Z к 30.05.2021',
                            desc: 'Купить Х',
                            isDone: true,
                            isEditing: false
                        }
                    ]
                },
                {
                    listName: "Удалённые задачи",
                    isCollapse: false,
                    tasks: [
                        {
                            title: 'Задача 1',
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
    },
    methods: {
        toggleCheckFiltered() {
            this.filteredList.forEach(element => element.isDone = !this.isCheckAllFiltered);
            this.isCheckAllFiltered = !this.isCheckAllFiltered;
        },

        clearTaskInput() {
            this.newTask = { ...this.$options.data().newTask };
        },

        addTask() {
            if (this.newTask.title) {
                this.taskList.push({ ...this.newTask });
                this.clearTaskInput();
            }
        }
    }
});