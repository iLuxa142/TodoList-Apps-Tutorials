Vue.component('task', {
    props: ['data'],

    methods: {
        change_task_status() {
            this.$emit('change_task_status');
        },

        edit_task_title() {
            this.$emit('edit_task_title');
        },

        edit_task_desc() {
            this.$emit('edit_task_desc');
        }
    },

    template: `
    <div class="task">
        <input type="checkbox" class="task__done" :checked="data.isDone" @change="$emit('change_task_status')">
        <div>
            <h3 class="task__title" @dblclick="edit_task_title()">{{data.title}}</h3>
            <p class="task__desc" @dblclick="edit_task_desc()">{{data.desc}}</p>
        </div>
    </div>
    `
});

var vue = new Vue({
    el: '#app',

    data: {
        new_task: {
            title: '',
            desc: '',
            isDone: false
        },
        Tasks: [{
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
        }]
    },

    methods: {

        changeStatusTask(id) {
            if (this.Tasks[id]) {
                this.Tasks[id].isDone = !this.Tasks[id].isDone;
            }
        },



        editTaskTitle(id) {
            if (!this.Tasks[id]) {
                return;
            }

            const newTaskTitle = prompt("Enter new task title: ", this.Tasks[id].title);

            if (newTaskTitle) {
                this.Tasks[id].title = newTaskTitle;
            }
        },

        editTaskDesc(id) {
            if (!this.Tasks[id]) {
                return;
            }

            // вариант редактирования через prompt только однострочного desc
            const newTaskDesc = prompt("Enter new task desc: ", this.Tasks[id].desc);

            if (newTaskDesc) {
                this.Tasks[id].desc = newTaskDesc;
            }
        },

        /*  1. desc записывается из textarea как многострочный, но выводится в шаблон как однострочный.
            Доработать до многострочного вывода desc?
            2. Если desc не заполнен при добавлении задачи, то нет возможности его редактировать в будущем, 
            т.к. выводящий элемент <p> будет иметь нулевой размер. Добавлять пробел в desc, 
            даже если при создании задачи поле new_task.desc не заполнено?
        */
        addTask() {
            if (this.new_task.title) {
                this.new_task.isDone = false;
                this.Tasks.push({ ...this.new_task });
                this.new_task = [];
            }
        }
    }
});