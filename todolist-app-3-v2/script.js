Vue.component('task', {
    props: ['data'],
    methods: {
        changeTaskStatus() {
            this.$emit('change-task-status');
        },

        toggleTaskEditing() {
            this.$emit('toggle-task-editing');
        }
    },
    template: `
    <div class="task" :class="{done: data.isDone}">
        <input type="checkbox" class="task__done" :checked="data.isDone" @change="changeTaskStatus()">&nbsp;&nbsp;
        <div v-if="!data.isEditing">
            <h3 class="task__title" @dblclick="toggleTaskEditing()">{{data.title}}</h3>
            <p class="task__desc" @dblclick="toggleTaskEditing()">{{data.desc}}</p>
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
            isCheckAllFiltered: false,
            newTask: { title: '', desc: '', isDone: false, isEditing: false },

            taskList: [
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
                },
                {
                    title: 'Доделать проект Z к 30.05.2021',
                    desc: 'Купить Х',
                    isDone: true,
                    isEditing: false
                }
            ]
        }
    },
    filters: {
        strReplace(value) {
            // заменяет только первое вхождение. Позже сделать замену всех вхождений
            return value.replace('важно', '☝️')
                .replace('срочно', '🕑');
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

            return this.taskList.filter(
                task => {
                    return task.title.toLowerCase().includes(filter) ||
                        task.desc.toLowerCase().includes(filter)
                }
            );
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

        changeStatusTask(task) {
            if (task) {
                task.isDone = !task.isDone;
            }
        },

        toggleTaskEditing(task) {
            if (!task) return;

            // Если заканчивается редактирование, то 
            // Произвести опциональные замены в desc (emoji)
            if (task.isEditing && task.desc) {
                task.desc = this.$options.filters.strReplace(task.desc);
            }

            task.isEditing = !task.isEditing;

            /* Вариант с модальным окном prompt (в будущем заменить на кастомное)
            const newTaskTitle = prompt("Enter new task title: ", this.taskList[id].title);
            if (newTaskTitle) {
                this.taskList[id].title = newTaskTitle;
            } */
        },

        addTask() {
            if (!this.newTask.title) return;

            // Произвести опциональные замены в desc (emoji)
            if (this.newTask.desc) {
                this.newTask.desc = this.$options.filters.strReplace(this.newTask.desc);
            }

            this.taskList.push({ ...this.newTask });
            this.clearTaskInput();
        }
    }
});