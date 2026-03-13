function validateTitle(title) {
    if (title.length >= 3)
        return true
    return false
}

function validatePriority(priority) {
    let priorities = ['high', 'medium', 'low']
    if (priorities.includes(priority))
        return true
    return false
}

function validateDueDate(date) {
    let today = new Date()
    let due = new Date(date)

    if (today < due)
        return true
    return false
}

export { validateDueDate, validateTitle, validatePriority }