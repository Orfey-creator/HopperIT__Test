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
    sessionStorage.name = e.target.value;
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
        sessionStorage.phone = document.getElementById('phone').value;
        
	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}
maskPhone('input[type=phone]')

//маска на ввод даты
let input = document.querySelector('#dob');
 
let dateInputMask = function dateInputMask(elm) {
 
    elm.addEventListener('keyup', function(e) {
    if( e.keyCode < 47 || e.keyCode > 57) {
      e.preventDefault();
    }
 
   let len = elm.value.length;
 
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
    sessionStorage.dob = elm.value;
    });

};
 
dateInputMask(input);

document.getElementById('mail').addEventListener('input', () => {
    function validateEmail(email) //валидация почты
    {
        let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        ;
        sessionStorage.mail = email;
        return re.test(email);
        
    }
    validateEmail(document.getElementById('mail').value);
})


//адрес проживания
document.getElementById('search_input').addEventListener('change', (e)=> {
    sessionStorage.residence = e.target.value;
})

//Прикрепление файла
document.getElementById('file').addEventListener('change', () => {
    document.querySelector('.hero-clip__label').style.display = 'none';
    document.querySelector('.hero-clip__file-txt').innerHTML = document.getElementById('file').value.split('\\').pop();
    document.querySelector('.hero-clip__file').style.display = 'flex';
    document.querySelector('.hero-clip__file').querySelector('.hero-clip__file-img').addEventListener('click', (e) => {
        document.getElementById('file').value = '';
        e.target.parentNode.style.display = 'none';
        document.querySelector('.hero-clip__label').style.display = 'flex';
    })
    sessionStorage.file = document.getElementById('file').value;
})

//Заолнение из локального хранилища
function getSessionStorage () {
    if (sessionStorage.name !== undefined) {
        document.getElementById('name').value = sessionStorage.name;
    }
    if (sessionStorage.dob !== undefined) {
        document.getElementById('dob').value = sessionStorage.dob;
    }
    if (sessionStorage.mail !== undefined) {
        document.getElementById('mail').value = sessionStorage.mail;
    }
    if (sessionStorage.phone !== undefined) {
        document.getElementById('phone').value = sessionStorage.phone;
    }
    if (sessionStorage.residence !== undefined) {
        document.getElementById('search_input').value = sessionStorage.residence;
    }    
    if (sessionStorage.jsSkill!== undefined) {
        document.getElementById('js').value = sessionStorage.jsSkill;
    }    
    
}
getSessionStorage();

//Подсказка у инпутов вверх при заполнении из сессион стораджа
document.querySelectorAll('.input').forEach((elem) => {
    if (elem.value !== '' ) {
        elem.parentNode.querySelector('.input-wrapper__placeholder').classList.add('input-wrapper__placeholder-up') //находим лейбл через родителя
        elem.parentNode.querySelector('.input-wrapper__placeholder-up').classList.add('input-wrapper__placeholder-up--color') //добавляем блеклый цвет 
    }
})

//отправка данных
function validate(event) {
    event.preventDefault();
    console.log(document.getElementById('name').value);
    console.log(document.getElementById('dob').value);
    console.log(document.getElementById('mail').value);
    console.log(document.getElementById('phone').value);
    console.log(document.getElementById('search_input').value);
    console.log(document.getElementById('js').value);
    if (document.getElementById('workbook1').checked) {
        console.log(document.querySelectorAll('.hero-radio__label')[0].innerHTML)    
    } else {
        console.log(document.querySelectorAll('.hero-radio__label')[1].innerHTML)    
    }
    console.log(document.getElementById('file').value)
}

//ф-ия смены навыка js
function changeJsSkill (e) {
    const jsSkill =  document.getElementById('js');
    const jsSkillLabel = jsSkill.parentNode.querySelector('label');
    if (e.target.value === '1' ) {
        jsSkill.value = 'Начинающий'
    }
    if (e.target.value === '2' ) {
        jsSkill.value = 'Базовый'
    }
    if (e.target.value === '3' ) {
        jsSkill.value = 'Продвинутый'
    }
    if (e.target.value === '4' ) {
        jsSkill.value = 'Отличный'
    }
    if (e.target.value === '5' ) {
        jsSkill.value = 'Гуру'
    }
    jsSkillLabel.classList.add('input-wrapper__placeholder-up');
    jsSkillLabel.classList.add('input-wrapper__placeholder-up--color');
    sessionStorage.jsSkill = jsSkill.value;
}

//слушаем события изменения ползунка
const inputJs = document.getElementById('js-range');
inputJs.addEventListener('change' , (e) => {
    changeJsSkill(e);
})
