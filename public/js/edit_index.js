const editBtn = document.querySelectorAll('.edit-btn-todo');
const textBox = document.querySelectorAll('.input-box');
const hideBtn = document.querySelectorAll('.hide-btn');
const cancelBtn = document.querySelectorAll('.cancel-btn-todo');
const text = []
let originalValue

cancelBtn.forEach( (btn,index) => {

    btn.addEventListener('click', () => {
        textBox[index].value = originalValue
        window.location.reload();
    });
});

textBox.forEach(box => {
    text.push(box);
});


editBtn.forEach(btn => {
    btn.addEventListener('click', editTodo);
});




function editTodo() {
    originalValue = textBox[this.id].value
    textBox[this.id].removeAttribute('readonly');
    this.style.display ="none"
    hideBtn[this.id].style.display = "block";
    cancelBtn[this.id].style.display = "block"
};