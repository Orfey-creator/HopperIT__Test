//API DaData для подсказок адреса
$(".hero-fields__residence").suggestions({
    token: "d0f559b1f0684ea156d3be189fb4d4fdbbfeb8fd",
    type: "ADDRESS",
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: function(suggestion) {
        console.log(suggestion);
    }
});
//Лейбл инпута при фокусе или заполнении уезжает вверх
document.querySelector('.hero-fields').addEventListener('focus', (e) => {
    if (e.target.classList.contains('input')) { //определяем инпут
        e.target.parentNode.querySelector('.input-wrapper__placeholder').classList.add('input-wrapper__placeholder-up') //находим лейбл через родителя
        e.target.parentNode.querySelector('.input-wrapper__placeholder-up').classList.remove('input-wrapper__placeholder-up--color') //удаляем блеклый цвет при фокусе
    }
}, true)
document.querySelector('.hero-fields').addEventListener('blur', (e) => {
    if (e.target.classList.contains('input')) { //определяем инпут
        e.target.parentNode.querySelector('.input-wrapper__placeholder-up').classList.add('input-wrapper__placeholder-up--color')//если инпут не пустой то добаляем блеклый к лейблу
        if (e.target.value === '') { 
            e.target.parentNode.querySelector('.input-wrapper__placeholder-up').classList.toggle('input-wrapper__placeholder-up') // если инпут пустой то возвращаем placeholder в стандартное положение          
        }
    }  
}, true)

//Прозрачность при переключении радио кнопок
document.querySelector('.hero-radio').addEventListener('click', e => {
    if (e.target.classList.contains('hero-radio__input')) {
        const radioBtnOne = document.getElementById('workbook1');
        const radioBtnTwo = document.getElementById('workbook2');
        if (radioBtnOne.checked) {
            radioBtnTwo.parentNode.classList.add('radio-opacity')
            radioBtnOne.parentNode.classList.remove('radio-opacity')
        } else {
            radioBtnOne.parentNode.classList.add('radio-opacity')
            radioBtnTwo.parentNode.classList.remove('radio-opacity')
        }
    }
})
