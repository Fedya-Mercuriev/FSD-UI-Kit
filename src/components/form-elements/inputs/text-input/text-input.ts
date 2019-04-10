// Обработать ввод данных для всех тестовых инпутов (e-mail, text)
$(document).ready((e) => {
    const textInput: JQuery<HTMLElement> = $('.text-input-wrapper');

    textInput.on('click', (e) => {
        const input: JQuery<HTMLElement> = $(e.currentTarget).find('.text-input');
        const notificationWrapper: JQuery<HTMLElement> = $(e.currentTarget).find('.text-input-notification-wrapper');
        const notificationWrapperBaseClass: string = notificationWrapper[0].classList[0];
        // Если рядом с инпутом был ярлычок, спрячем его пока пользователь водит данные
        if (notificationWrapper.hasClass(`${notificationWrapperBaseClass}--visible`)) {
            notificationWrapper.removeClass(`${notificationWrapperBaseClass}--visible`);
        }
        input.focus();
        input.on('change', (e) => {
            let result: boolean;
            const notificationWrapper: JQuery<HTMLElement> = $(e.currentTarget).siblings();
            const notificationWrapperBaseClass: string = notificationWrapper[0].classList[0];
            e.preventDefault();
            result = validateTextData($(e.currentTarget).attr('type'), $(e.currentTarget).val().toString());
            showNotification(result, notificationWrapper);
        })
    })

    function validateTextData(inputType: string, data: string): boolean {
        if (data.length === 0 || data.length < 3) {
            return false;
        }
        if (inputType === 'text') {
            const textRegexp = /[\d\s\W<>()\[\]\\.,;:\s@"]/;
            // Обрабатывает обычную текстовую информацию (в нашем случае – имя)
            return (textRegexp.test(data)) ? false : true;
        } else {
            // Обрабатывает e-mail по определенному формату
            // Регулярное выражение не мое – взято отсюда: http://emailregex.com/
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(data);
        }
    }

    function showNotification(result: boolean, notificationWrapper: JQuery<HTMLElement>) {
        const notificationWrapperBaseClass: string = notificationWrapper[0].classList[0];
        const notificationBody: JQuery<HTMLElement> = notificationWrapper.find(`.${notificationWrapperBaseClass}__notification-body`);
        const bodyBaseClass: string = notificationBody[0].classList[0];
        const notificationText: JQuery<HTMLElement> = notificationWrapper.find(`.${notificationWrapperBaseClass}__notification-text`);
        // Если ранее для ярлычка был добавлен класс-модификатор – удалим его
        if (notificationBody.hasClass(`${bodyBaseClass}--error`) || notificationBody.hasClass(`${bodyBaseClass}--correct`)) {
            const classToRemove: string = notificationBody[0].classList[notificationBody[0].classList.length - 1];
            notificationBody.removeClass(classToRemove);
        }
        //  Если результат положительный - добавим зеленый ярлычок с надписью "Thanks!" 
        // (или другое сообщение, переданное при отрисовке компонента)
        if (result) {
            notificationBody.addClass(`${bodyBaseClass}--correct`);
            notificationText.html(notificationText.data('correct'));
            notificationWrapper.addClass(`${notificationWrapperBaseClass}--visible`);
        } else {
            notificationBody.addClass(`${bodyBaseClass}--error`);
            notificationText.html(notificationText.data('error'));
            notificationWrapper.addClass(`${notificationWrapperBaseClass}--visible`);
        }
    }
})