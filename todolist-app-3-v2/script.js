Vue.component('task', {
    props: ['data'],

    methods: {
        task_done() {
            this.$emit('task_done');
        }
    },
    template: `
    <div class="task">
        <div>
            <h3 class="task__title">{{data.title}}</h3>
            <p class="task__desc">{{data.desc}}</p>
        </div>
        <button @click="task_done()" class="task__done">✔️</button>
    </div>
    `
});

var vue = new Vue({
    el: '#app',
    data: {
        new_task: {
            title: '',
            desc: ''
        },
        tasks: [
            {
                title: 'Доделать проект Х к 31.03.2021',
                desc: 'Позвонить Х, узнать детали'
            },
            {
                title: 'Доделать проект У к 31.02.2021',
                desc: 'Запустить сайт'
            }]
    },

    methods: {
        delete_task(id) {
            this.tasks.splice(id, 1);
        },

        add_task() {
            if (this.new_task.title != '') {
                this.tasks.push(this.new_task);
                this.new_task = [];
            }
        }
    }
});