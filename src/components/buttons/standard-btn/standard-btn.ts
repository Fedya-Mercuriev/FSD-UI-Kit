$(document).ready((e) => {
    const containedBtn: JQuery<HTMLElement> = $('.contained-btn');
    let animationProps = {};

    containedBtn.on({
        'mousedown touchstart': (e) => {
            const rippleShape: JQuery<HTMLElement> = $(e.currentTarget).children().first();
            // Вызовем функцию, которая поместит ripple в место клика
            placeRipple(rippleShape, e);
            // Добавим анимацию
            addAnimation(rippleShape);
        },
        'mouseup touchend mouseleave': (e) => {
            const rippleShape: JQuery<HTMLElement> = $(e.currentTarget).children().first();
            removeAnimation(rippleShape, animationProps);
        }
    })

    function placeRipple(element: JQuery<HTMLElement>, event: any): void {
        const offset = $(event.currentTarget).offset();
            // Определим где на кнопке кликнул пользователь и поместим туда анимируемый элемент
            const clickX = event.clientX - (offset.left + element.width() / 2);
            const clickY = event.clientY - (offset.top + element.height() / 2);
            element.css({
                'position': 'absolute',
                'top': `${clickY}px`,
                'left': `${clickX}px`
            });
    }

    function addAnimation(element: JQuery<HTMLElement>):void {
        animationProps['transform'] = 'scale(1)';
        animationProps['opacity'] = '0.3';
        animationProps['transition'] = `all 200ms cubic-bezier(0,.67,.6,.92)`;
        element.css(animationProps);
    }

    function removeAnimation(element: JQuery<HTMLElement>, animationProps: Object): void {
        for (let prop in animationProps) {
            if (animationProps.hasOwnProperty(prop)) {
                element.css(prop, '');
                animationProps[prop] = '';
            }
        }
    }
})