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
        handleInput (event) {
            this.valueInput = event.target.value;
        },
        addTask () {
            if (this.valueInput === '') return;

            const nowDateTime = new Date();
            var options = {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            var strDateTime = nowDateTime.toLocaleString("ru", options);

            this.needDoList.push({
                title: this.valueInput,
                datetime: strDateTime,
                id: Math.random()
            });

            this.valueInput = ''; 
        },
        doCheck (index, type) {
            if (type === 'need') {
                const completeTask = this.needDoList.splice(index, 1);
                this.completeList.push(...completeTask);
            }
            else {
                const noCompleteTask = this.completeList.splice(index, 1);
                this.needDoList.push(...noCompleteTask);
            }    
        },
        removeTask (index, type) {
            if (type === 'need') {
                const recycleTask = this.needDoList.splice(index, 1);
                this.recycleList.push(...recycleTask);
            }
            else if (type === 'complete') {
                const recycleTask = this.completeList.splice(index, 1);
                this.recycleList.push(...recycleTask);
            }
            else {  // Recover
                const noCompleteTask = this.recycleList.splice(index, 1);
                this.needDoList.push(...noCompleteTask);
            }
//             const toDoList = type === 'need' ? this.needDoList.splice(index, 1) : this.completeList.splice(index, 1);
//             this.recycleList.push(...toDoList);
        }
    }
}).mount('#app');