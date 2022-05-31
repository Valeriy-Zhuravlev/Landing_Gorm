const burgerBtn = document.querySelector('.burger');
const burgerIcon = document.querySelector('.burger__icon');
const navigation = document.querySelector('.header__nav');

burgerBtn.addEventListener('click', function () {
    burgerIcon.classList.toggle('active');
    navigation.classList.toggle('active');
});