Vue.createApp({
    data() {
        return {
            newTask: "",
            checkedTasks: 0,
            taskList: [
                { text: "Task 1", checked: false },
                { text: "Task 2", checked: false },
                { text: "Task 3", checked: false },
                { text: "Task 4", checked: false },
                { text: "Task 5", checked: false }],
            isConfirmDelete: true
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
            if (this.taskList[index]) {

                // если опция подтверждения включена и ответ НЕТ, то выход
                // else (нет подтверждения | есть подтверждение и ответ ДА), то удалить задачу
                if (this.isConfirmDelete && !confirm("Are you sure you want to delete this task? \n" + this.taskList[index].text)) {
                    return;
                } else {
                    if (this.taskList[index].checked) {
                        this.checkedTasks--;
                    }

                    this.taskList.splice(index, 1);
                }
            }
        },

        clearList() {
            this.taskList = [];
            this.checkedTasks = 0;
        },

        removeCheckedTasks() {
            // обход элементов в обратном порядке (чтобы избежать пропусков нужных элементов из-за сдвига остальных при удалении одного)
            for (var i = this.taskList.length - 1; i >= 0; i--) {
                if (this.taskList[i].checked) {
                    this.removeTask(i);
                }
            }
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
