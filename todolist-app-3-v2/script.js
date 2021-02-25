Vue.component('task', {
    props: ['data'],
    methods: {
        changeTaskStatus() {
            this.$emit('change-task-status');
        },

        editTaskTitle() {
            this.$emit('edit-task-title');
        },

        editTaskDesc() {
            this.$emit('edit-task-desc');
        }
    },
    template: `
    <div class="task">
        <input type="checkbox" class="task__done" :checked="data.isDone" @change="changeTaskStatus()">
        <div>
            <h3 class="task__title" @dblclick="editTaskTitle()">{{data.title}}</h3>
            <p class="task__desc" @dblclick="editTaskDesc()"><span v-html="data.desc"></span></p>
        </div>
    </div>
    `
});

var vue = new Vue({
    el: '#app',
    data() {
        return {
            filterText: '',
            newTask: { title: '', desc: '', isDone: false },

            taskList: [
                {
                    title: 'Доделать проект Х к 30.03.2021',
                    desc: 'Позвонить Х, <br>закрыть <i>сделку</i>',
                    isDone: false
                },
                {
                    title: 'Доделать проект У к 30.04.2021',
                    desc: 'Запустить <b>сайт</b> <a href="https://yandex.ru" target="_blank">Yandex</a>',
                    isDone: false
                },
                {
                    title: 'Доделать проект Z к 30.05.2021',
                    desc: '<span style="color: red">Купить Х</span>',
                    isDone: true
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
        }
    },
    methods: {
        resetTaskInput() {
            // Вариант 1 - сбрасывает все данные
            // Object.assign(this.$data, this.$options.data());

            // Вариант 2 - не работает как нужно
            // Object.assign(this.newTask, this.$options.data().newTask);

            // Вариант 3 - 
            this.newTask = { title: '', desc: '', isDone: false };

            // Вариант 4 - 
            // return { title: '', desc: '', isDone: false }

            // Вариант 5 - у меня с this.$options, заработало при двух вариантах:
            // this.newTask = this.$options.data().newTask;
            // или
            // this.newTask = Object.assign({}, this.$options.data().newTask);
        },

        changeStatusTask(id) {
            if (this.taskList[id]) {
                this.taskList[id].isDone = !this.taskList[id].isDone;
            }
        },

        editTaskTitle(id) {
            if (!this.taskList[id]) return;

            const newTaskTitle = prompt("Enter new task title: ", this.taskList[id].title);

            if (newTaskTitle) {
                this.taskList[id].title = newTaskTitle;
            }
        },

        editTaskDesc(id) {
            if (!this.taskList[id]) return;

            // вариант редактирования через prompt только однострочного desc
            const newTaskDesc = prompt("Enter new task desc: ", this.taskList[id].desc);

            if (newTaskDesc) {
                this.taskList[id].desc = newTaskDesc;
            }
        },

        addTask() {
            if (this.newTask.title) {
                console.log(this.newTask);

                // преобразовать desc для многострочного вывода в <span v-html="data.desc"></span>
                // Хорошо что поддерживает форматирование, ссылки и тд. 
                // Но без фильтрации опасно выводить html, созданный пользоватлем (XSS, внедрение js кода). Доработать.
                // при пустом desc элемент для вывода <p> будет с min-height: 20px, чтобы можно было изменить, кликнув
                this.newTask.desc = this.newTask.desc.split('\n').join('<br>');

                this.taskList.push(this.newTask);
                this.resetTaskInput();
            }
        }
    }
});