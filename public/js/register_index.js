const errorExit = document.querySelectorAll('.error-exit')
const btn = document.getElementById('hehe')
const errorBox = document.querySelectorAll('.error-box')
const errorDiv = document.getElementById('error-div')

const errorHandler = []

errorBox.forEach(box => {
    errorHandler.push(box)
})


errorExit.forEach(button => {
    button.addEventListener('click', () => {
        clearField(button.id, button)

    })
})


function clearField(id,button) {
    errorHandler.forEach(e => {
        if (e.id === id) {
            e.innerText = ""
            button.innerText = ""
        }  else {
            return
        }
    })
}