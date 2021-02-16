new Vue({
    el: "#todo",
    data: 
    {
        newTask: "",
        checkedTasks: 0,
        taskList: []
    },

    computed: 
    {
        areAllChecked: function()
        {
            return this.taskList.every( function(task){return task.checked;} ) && this.taskList.length > 0;
        }
    },

    methods: 
    {
        addTask: function() 
        {
            var task = this.newTask.trim();
            if (task) {
                this.taskList.push( { text: task, checked: false } );

                this.newTask = "";
            }
        },

        removeTask: function(task) 
        {
            this.taskList.$remove(task);
            if (task.checked)
                this.checkedTasks--;
        },

        clearList: function() 
        {
            this.taskList =[];
            this.checkedTasks = 0;
        },

        checkAll: function(task) 
        {
            const targetValue = this.areAllChecked ? false : true;

            for (var i = 0; i < this.taskList.length; i++) {
                this.taskList[i].checked = targetValue;
            }

            targetValue ? this.checkedTasks = this.taskList.length  : this.checkedTasks = 0;
        },

        checkTask: function(task) 
        {
            task.checked ? this.checkedTasks-- : this.checkedTasks++;
        }
    }
});