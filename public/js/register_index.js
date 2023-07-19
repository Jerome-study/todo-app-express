const errorExit = document.querySelectorAll('.error-exit')
const errorBox = document.querySelectorAll('.error-box')
const errorDiv = document.getElementById('error-div')
const messageBox = document.querySelectorAll('.message')
const errorHandler = []

let errMess = []

messageBox.forEach(err => {
    errMess.push(err)
})

errorBox.forEach(box => {
    errorHandler.push(box)
})


errorExit.forEach(button => {
    button.addEventListener('click', () => {
        clearField(button.id, button)

    })
})


function clearField(id) {

    messageBox.forEach(box => {
        if (box.id === id) {
            box.remove()
        }
    })
    
   
   
}