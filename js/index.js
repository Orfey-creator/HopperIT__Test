//API DaData для подсказок адреса

$(".hero-fields__residence").suggestions({
    token: "d0f559b1f0684ea156d3be189fb4d4fdbbfeb8fd",
    type: "ADDRESS",
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: function(suggestion) {
        console.log(suggestion);
    }
});