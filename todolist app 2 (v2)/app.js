Vue.createApp({
    data() {
        return {
            newTask: "",
            checkedTasks: 0,
            taskList: []
        };
    },
    computed: {
        isAllChecked() {
            return this.taskList.every(task => task.checked) && this.taskList.length > 0;
        }
    },
    methods: {
        addTask() {
            const task = this.newTask.trim();

            if (task) {
                this.taskList.push({
                    text: task,
                    checked: false
                });

                this.newTask = "";
            }
        },

        removeTask(index) {

            if (this.taskList[index] && this.taskList[index].checked) {
                this.checkedTasks--;
            }

            if (confirm("Are you sure you want to delete this task?")) {
                this.taskList.splice(index, 1);
            }
        },

        clearList() {
            this.taskList = [];
            this.checkedTasks = 0;
        },

        checkAll(task) {
            const targetValue = this.isAllChecked ? false : true;

            for (var i = 0; i < this.taskList.length; i++) {
                this.taskList[i].checked = targetValue;
            }

            if (targetValue == true) {
                this.checkedTasks = this.taskList.length;
            } else {
                this.checkedTasks = 0;
            }
        },

        checkTask(task) {
            task.checked ? this.checkedTasks-- : this.checkedTasks++;
        }
    }
}).mount('#todo');
