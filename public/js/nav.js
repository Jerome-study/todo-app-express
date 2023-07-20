const navShow = document.querySelector('.show-nav');
const navExit = document.querySelector('.exit-nav');
const navList = document.querySelector('.nav-list');


navShow.addEventListener('click', () => {
    navList.style.display = "block";
});

navExit.addEventListener('click', () => {
    navList.style.display = "none";
});


