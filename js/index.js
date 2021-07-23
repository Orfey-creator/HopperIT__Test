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

//запрет ввода цифр в инпут ФИО
document.getElementById('name').addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/([^a-zа-яё]+)/gi, '');
});

//запрет ввода букв в инпут с телефоном
function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		console.log(template);
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}
maskPhone('input[type=phone]')

//маска на ввод даты
var input = document.querySelectorAll('#dob')[0];
 
var dateInputMask = function dateInputMask(elm) {
 
    elm.addEventListener('keyup', function(e) {
    if( e.keyCode < 47 || e.keyCode > 57) {
      e.preventDefault();
    }
 
   var len = elm.value.length;
 
    if(len !== 1 || len !== 3) {
      if(e.keyCode == 47) {
        e.preventDefault();
      }
    }
   if(len === 2) {
    if (e.keyCode !== 8 && e.keyCode !== 46) { 
      elm.value = elm.value+'.';
    }}
 
if(len === 5) {
    if (e.keyCode !== 8 && e.keyCode !== 46) { 
      elm.value = elm.value+'.';
    }}
  });
};
 
dateInputMask(input);

// //запрет ввода цифр в инпут ФИО
// document.getElementById('mail').addEventListener("input", (e) => {
//     e.target.value = e.target.value.replace(/\S+@\S+\.\S+/,'');
// });

//маска на email
// function validateEmail(email) 
//     {
//         var re = /\S+@\S+\.\S+/;
//         return re.test(email);
//     }
    
// console.log(validateEmail(document.getElementById('mail').value));

function validate(event) {
    event.preventDefault();
    function validateEmail(email) 
    {
        var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        ;
        return re.test(email);
    }
    
console.log(validateEmail(document.getElementById('mail').value));
}