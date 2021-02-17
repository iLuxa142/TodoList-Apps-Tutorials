Vue.component('task', {
    props: ['data'],

    methods: {
        task_done() {
            this.$emit('task_done');
        },

        task_title_edit() {
            this.$emit('task_title_edit');
        },

        task_desc_edit() {
            this.$emit('task_desc_edit');
        }
    },
    template: `
    <div class="task">
        <input type="checkbox" @change="task_done()" class="task__done" :checked="data.isDone">
        <div>
            <h3 class="task__title" @dblclick="task_title_edit()">{{data.title}}  ({{data.isDone}})</h3>
            <p class="task__desc" @dblclick="task_desc_edit()">{{data.desc}}</p>
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
            title: 'Доделать проект Х к 31.03.2021',
            desc: 'Позвонить Х, узнать детали',
            isDone: false
        },
        {
            title: 'Доделать проект У к 31.02.2021',
            desc: 'Запустить сайт',
            isDone: false
        },
        {
            title: 'Доделать проект Z к 31.04.2021',
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
            if (this.Tasks[id]) {
                const newTaskTitle = prompt("Enter new task title: ", this.Tasks[id].title);

                if (newTaskTitle) {
                    this.Tasks[id].title = newTaskTitle;
                }
            }
        },

        editTaskDesc(id) {
            if (this.Tasks[id]) {
                const newTaskDesc = prompt("Enter new task desc: ", this.Tasks[id].desc);

                if (newTaskDesc) {
                    this.Tasks[id].desc = newTaskDesc;
                }
            }
        },

        addTask() {
            if (this.new_task.title != '') {
                this.new_task.isDone = false;
                this.Tasks.push(this.new_task);
                this.new_task = [];
            }
        }
    }
});