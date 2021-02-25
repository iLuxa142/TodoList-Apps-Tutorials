Vue.component('task', {
    props: ['data', 'filter'],
    methods: {
        changeTaskStatus() {
            this.$emit('change-task-status');
        },

        toggleTaskEditing() {
            this.$emit('toggle-task-editing');
        },

        isFoundFilterStr() {
            return this.data.title.toLowerCase().includes(this.filter.toLowerCase()) ||
                this.data.desc.toLowerCase().includes(this.filter.toLowerCase());
        }
    },
    template: `
    <div class="task" v-show="isFoundFilterStr()">
        <input type="checkbox" class="task__done" :checked="data.isDone" @change="changeTaskStatus()">&nbsp;&nbsp;
        <div v-if="!data.isEditing">
            <h3 class="task__title" @dblclick="toggleTaskEditing()">{{data.title}}</h3>
            <p class="task__desc" @dblclick="toggleTaskEditing()"><span v-html="data.desc"></span></p>
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
    filters: {
        emoji(value) {
            return value.replace('важно', '☝️').replace('срочно', '🕑');
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
        clearTaskInput() {
            this.newTask = { ...this.$options.data().newTask };
        },

        changeStatusTask(id) {
            if (this.taskList[id]) {
                this.taskList[id].isDone = !this.taskList[id].isDone;
            }
        },

        toggleTaskEditing(id) {
            if (!this.taskList[id]) return;

            // Если заканчивается редактирование, то заменить ключевые слова на значки
            // + преобразовать переводы строки в <br>
            if (this.taskList[id].isEditing && this.taskList[id].desc) {
                this.taskList[id].desc = this.$options.filters.emoji(this.taskList[id].desc);
                this.taskList[id].desc = this.taskList[id].desc.split('\n').join('<br>');
            }

            this.taskList[id].isEditing = !this.taskList[id].isEditing;

            /* Вариант с модальным окном prompt (в будущем заменить на кастомное)
            const newTaskTitle = prompt("Enter new task title: ", this.taskList[id].title);
            if (newTaskTitle) {
                this.taskList[id].title = newTaskTitle;
            } */
        },

        addTask() {
            if (!this.newTask.title) return;

            // заменить ключевые слова на значки
            // А также преобразовать desc для многострочного вывода в <span v-html="data.desc"></span>
            // Хорошо что поддерживает форматирование, ссылки и тд. 
            // Но без фильтрации опасно выводить html, созданный пользоватлем (XSS, внедрение js кода). Доработать.
            // при пустом desc элемент для вывода <p> будет с min-height: 20px, чтобы можно было изменить мышью.
            if (this.newTask.desc) {
                this.newTask.desc = this.$options.filters.emoji(this.newTask.desc);
                this.newTask.desc = this.newTask.desc.split('\n').join('<br>');
            }

            this.taskList.push({ ...this.newTask });
            this.clearTaskInput();
        }
    }
});