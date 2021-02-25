Vue.component('task', {
    props: ['data'],
    methods: {
        changeTaskStatus() {
            this.$emit('change-task-status');
        },

        toggleTaskEditing() {
            this.$emit('toggle-task-editing');
        },
    },
    template: `
    <div class="task">
        <input type="checkbox" class="task__done" :checked="data.isDone" @change="changeTaskStatus()">&nbsp;&nbsp;
        <div v-if="!data.isEditing">
            <h3 class="task__title" @dblclick="toggleTaskEditing()">{{data.title}}</h3>
            <p v-if="!data.isEditing" class="task__desc" @dblclick="toggleTaskEditing()"><span v-html="data.desc"></span></p>
        </div>
        <div v-else class="add_task">
            <div class="add_task__input">
                <input type="text" v-model="data.title" @keyup.enter="toggleTaskEditing()">
                <textarea v-model="data.desc"></textarea>
            </div>
            <button class="add_task__btn" @click="toggleTaskEditing()">✅</button>
        </div>
    </div>
    `
});

var vue = new Vue({
    el: '#app',
    data() {
        return {
            filterText: '',
            hideCompleteList: false,
            newTask: { title: '', desc: '', isDone: false, isEditing: false },

            taskList: [
                {
                    title: 'Доделать проект Х к 30.03.2021',
                    desc: 'Позвонить Х, <br>закрыть <i>сделку</i>',
                    isDone: false,
                    isEditing: false
                },
                {
                    title: 'Доделать проект У к 30.04.2021',
                    desc: 'Запустить <b>сайт</b> <a href="https://yandex.ru" target="_blank">Yandex</a>',
                    isDone: false,
                    isEditing: false
                },
                {
                    title: 'Доделать проект Z к 30.05.2021',
                    desc: '<span style="color: red">Купить Х</span>',
                    isDone: true,
                    isEditing: false
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
            this.newTask = { title: '', desc: '', isDone: false, isEditing: false };

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

        toggleTaskEditing(id) {
            if (!this.taskList[id]) return;

            // Если заканчивается редактирование, то преобразовать переводы строки в <br>
            if (this.taskList[id].isEditing) {
                this.taskList[id].desc = this.taskList[id].desc.split('\n').join('<br>');
            }

            this.taskList[id].isEditing = !this.taskList[id].isEditing;

            /* Вариант с модальным окном prompt
            const newTaskTitle = prompt("Enter new task title: ", this.taskList[id].title);
            if (newTaskTitle) {
                this.taskList[id].title = newTaskTitle;
            } */
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