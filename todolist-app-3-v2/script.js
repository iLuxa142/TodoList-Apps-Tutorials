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
            <p class="task__desc" @dblclick="editTaskDesc()">{{data.desc}}</p>
        </div>
    </div>
    `
});

var vue = new Vue({
    el: '#app',
    data: {
        filterText: '',
        newTask: { title: '', desc: '', isDone: false },

        taskList: [
            {
                title: 'Доделать проект Х к 30.03.2021',
                desc: 'Позвонить Х, закрыть сделку',
                isDone: false
            },
            {
                title: 'Доделать проект У к 30.04.2021',
                desc: 'Запустить сайт Y',
                isDone: false
            },
            {
                title: 'Доделать проект Z к 30.05.2021',
                desc: 'Купить Х',
                isDone: true
            }
        ]
    },
    methods: {
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

        /*  1. desc записывается из textarea как многострочный, но выводится в шаблон как однострочный.
            Доработать до многострочного вывода desc?
            2. Если desc не заполнен при добавлении задачи, то нет возможности его редактировать в будущем, 
            т.к. выводящий элемент <p> будет иметь нулевой размер. Добавлять пробел в desc, 
            даже если при создании задачи поле new_task.desc не заполнено?
        */
        addTask() {
            if (this.newTask.title) {
                this.taskList.push(this.newTask);
                this.newTask = { title: '', desc: '', isDone: false };
            }
        }
    }
});