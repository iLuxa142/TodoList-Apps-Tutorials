Vue.createApp({
    data() {
        return {
            valueInput: '',
            needDoList: [],
            completeList: [],
            recycleList: []
        };
    },
    methods: {
        handleInput(event) {
            this.valueInput = event.target.value;
        },
        addTask() {
            if (this.valueInput === '') return;

            const nowDateTime = new Date();
            const options = {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            const strDateTime = nowDateTime.toLocaleString("ru", options);

            this.needDoList.push({
                title: this.valueInput,
                datetime: strDateTime,
                id: Math.random()
            });

            this.valueInput = '';
        },
        doCheckMoveToCompleteList(index) {
            const completeTask = this.needDoList.splice(index, 1);
            this.completeList.push(...completeTask);
        },
        doCheckMoveToDoList(index) {
            const noCompleteTask = this.completeList.splice(index, 1);
            this.needDoList.push(...noCompleteTask);
        },
        removeTaskFromDoList(index) {
            const recycleTask = this.needDoList.splice(index, 1);
            this.recycleList.push(...recycleTask);
        },
        removeTaskFromCompleteList(index) {
            const recycleTask = this.completeList.splice(index, 1);
            this.recycleList.push(...recycleTask);
        },
        recoverTaskFromRecycleList(index) {
            const noCompleteTask = this.recycleList.splice(index, 1);
            this.needDoList.push(...noCompleteTask);
        }
    }
}).mount('#app');