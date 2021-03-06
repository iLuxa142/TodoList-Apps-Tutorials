Vue.createApp({
    data() {
        return {
            newTask: "",
            isConfirmDelete: true,
            taskList: [
                { text: "Task 1", checked: false },
                { text: "Task 2", checked: false },
                { text: "Task 3", checked: false },
                { text: "Task 4", checked: false },
                { text: "Task 5", checked: false }]
        };
    },
    computed: {
        isAllChecked() {
            return (this.taskList.length > 0) && this.taskList.every(task => task.checked);
        },

        checkedTasksCount() {
            return this.taskList.filter(task => task.checked).length;
        }
    },
    methods: {
        addTask() {
            const task = this.newTask.trim();

            if (task) {
                this.taskList.push({ text: task, checked: false });
                this.newTask = "";
            }
        },

        removeTask(index) {
            if (!this.taskList[index]) {
                return;
            }

            // если опция подтверждения включена и ответ НЕТ, то выход
            if (this.isConfirmDelete && !confirm("Are you sure you want to delete this task? \n" + this.taskList[index].text)) {
                return;
            }

            this.taskList.splice(index, 1);
        },

        clearList() {
            this.taskList = [];
        },

        removeCheckedTasks() {
            this.taskList = this.taskList.filter(task => !task.checked);
        },

        checkAll() {
            const targetValue = !this.isAllChecked;
            this.taskList = this.taskList.map(task => ({ ...task, checked: targetValue }));
        }
    }
}).mount('#todo');
