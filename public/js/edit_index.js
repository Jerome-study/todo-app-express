const editBtn = document.querySelectorAll('.edit-btn-todo');
const textBox = document.querySelectorAll('.input-box');
const hideBtn = document.querySelectorAll('.hide-btn');
const cancelBtn = document.querySelectorAll('.cancel-btn-todo');
const text = []
let originalValue
let previousValues = []
let previousBox = []
cancelBtn.forEach( (btn,index) => {

    btn.addEventListener('click', () => {
        textBox[index].value = originalValue
        textBox[index].setAttribute('readonly', "")
        reset()
    });
});

textBox.forEach(box => {
    text.push(box);
});


editBtn.forEach(btn => {
    btn.addEventListener('click', editTodo);
});




function editTodo() {
    previousValues.push(textBox[this.id].value)
    previousBox.push(textBox[this.id])
    reset();
    originalValue = textBox[this.id].value;
    textBox[this.id].removeAttribute('readonly');
    textBox[this.id].focus();
    textBox[this.id].selectionStart = textBox[this.id].value.length
    this.style.display ="none";
    hideBtn[this.id].style.display = "block";
    cancelBtn[this.id].style.display = "block";
};

function reset(id) {
    if (previousBox.length > 1) {
        previousBox[previousBox.length -2].value = previousValues[previousValues.length - 2]
        textBox[previousBox[previousBox.length -2].id].setAttribute('readonly', "")
    }
    editBtn.forEach( btn => {
        btn.style.display = "block";
    });

    hideBtn.forEach(save => {
        save.style.display = "none";
    })

    cancelBtn.forEach(cancel => {
        cancel.style.display = "none";
    });
};



const navShow = document.querySelector('.show-nav');
const navExit = document.querySelector('.exit-nav');
const navList = document.querySelector('.nav-list');


navShow.addEventListener('click', () => {
    navList.style.display = "block";
});

navExit.addEventListener('click', () => {
    navList.style.display = "none";
});


