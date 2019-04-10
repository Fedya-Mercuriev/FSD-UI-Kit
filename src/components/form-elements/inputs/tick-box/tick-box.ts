/* 
Алгоритм:
1) Document.ready - 
2) Обрабатывааем клики по чекбоксам
*/
$(document).ready((e) => {
    const tickBox = $('.tick-box-wrapper');
    // Проверяем какие чекбоксы уже checked - им присваиваем класс *--active
    tickBox.each((_, item) => {
        const input: JQuery<HTMLElement> = $(item).find('input');
        const inputWrapper: JQuery<HTMLElement> = $(item).find('.tick-box-block');
        const elementBaseClass: string = inputWrapper[0].classList[0];
        if (input.is(':checked')) {
            inputWrapper.addClass(`${elementBaseClass}--active`);
        }
    })
    // Обработаем клики
    tickBox.on('click', (e) => {
        e.preventDefault();
        const inputWrapper: JQuery<HTMLElement> = $(e.currentTarget).find('.tick-box-block');
        const elemBaseClass: string = inputWrapper[0].classList[0];
        if (inputWrapper.hasClass(`${elemBaseClass}--active`)) {
            inputWrapper.removeClass(`${elemBaseClass}--active`);
        } else {
            inputWrapper.addClass(`${elemBaseClass}--active`);
        }
    })
})