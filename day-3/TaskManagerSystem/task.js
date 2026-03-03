import { validateDueDate, validateTitle, validatePriority } from './validator.js'

const tasks = []

function addTask(title, priority, dueDate){
    if (validateDueDate(dueDate) && validatePriority(priority) && validateTitle(title)){
        tasks.push({ title, priority, dueDate })
        console.log("Task is successfully added")
    }
    else{
        console.log("Task not added")
    }
}

function getAllTasks(){
    return tasks
}

export { addTask, getAllTasks }