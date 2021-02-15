new Vue({
    el: "#todo",
    data: {
        newTask: "",
        taskList: []
    },
    computed: {
        areAllSelected: function(){
            return this.taskList.every(function(task){
                return task.checked;
            }) && this.taskList.length > 0;
        }
    },
    methods: {
        addTask: function() {
            var task = this.newTask.trim();
            if (task) {
                this.taskList.push({
                    text: task,
                    checked: false
                });

                this.newTask = "";
            }
        },
        removeTask: function(task) {
            this.taskList.$remove(task);
        },
        clearList: function() {
            this.taskList =[];
        },
        selectAll: function(task) {
            var targetValue = this.areAllSelected ? false : true;

            for (var i = 0; i < this.taskList.length; i++) {
                this.taskList[i].checked = targetValue;
            }
        }
    }
});