const scalelessSlider: JQuery<HTMLElement> = $('.scaleless-slider');
const rangeSlider: JQuery<HTMLElement> = $('.range-slider');

scalelessSlider.on('mouseenter', (e) => {
    // Показывает ярлычок
    controlIndicator($(e.currentTarget), 'show');
})

scalelessSlider.on('mouseleave', (e) => {
    // прячет ярлычок
    controlIndicator($(e.currentTarget), 'hide');
})

scalelessSlider.on('mousedown', (e) => {
    // Обрабатывает действия с слайдером
    // Переменная sliderIsActive нужна для того, чтобы ярлычок не 
    // реагировал на действия извне (не внутри слайдера)
    // Обработчик mouseleave убирается, чтоб во время прокрутки слайдера
    // ярлычок не прятался
    $(e.currentTarget).off('mouseleave');
    controlSlider(e, true);
});

rangeSlider.on('mousedown', (e) => {
    // Обрабатывает действия с слайдером
    controlSlider(e);
})

$(document).on('mouseup', (e) => {
    console.log('Отпустили кнопку мыши');
    $(document).off('mousemove');
    // Этот блок срабатывает только когда пользователь навел курсор на слайдер
    // и подвигал его
    scalelessSlider.on('mouseleave', (e) => {
        controlIndicator($(e.currentTarget), 'hide');
    })
})

function controlSlider(e: any, hasIndicator: boolean = false) : void {
    // Эта функция собирает в себе другие подфункции и занимается
    // управлением (в общем) слайдером
    const container: HTMLElement = e.currentTarget;
    const sliderControl: JQuery<HTMLElement> = $(e.currentTarget).find('.slider-control');
    const filledTrack: JQuery<HTMLElement> = $(container).find('.slider-filled-track');
    // Блок ниже сработает только если пользователь кликнул на ползунок слайдера
    if (e.target === sliderControl[0]) {
        const startPosition: number = e.currentTarget.getBoundingClientRect().left;
        const finishPosition: number = startPosition + e.currentTarget.clientWidth;
        console.log('Нажали на ползунок слайдера и держим его');
        // Этот обработчик добавляется только при зажатии левой кнопки мыши
        $(document).on('mousemove', (e) => {
            // Пользунок двигается только внутри трека, а потому устанавливаем ограничения
            // на перемещения и другие вычисления
            if (e.pageX >= startPosition && e.pageX <= finishPosition) {
                const minVal: number = $(container).data('min');
                const maxVal: number = $(container).data('max');
                // Рассчитывает позицию и добавляет ее ползунку и закрашенной
                // полоске, идущей за ним
                const currPosition: number = moveElemHor(e, startPosition, finishPosition, sliderControl);
                const filledTrackWidth: number = calculateFilledTrackWidth(finishPosition - startPosition, currPosition);
                filledTrack.css('transform', `translateY(-50%) scaleX(${filledTrackWidth})`);
                // Функция обрабатывает оба случая; 
                // блок кода ниже выполняется, если у слайдера есть ярлычок
                if (hasIndicator) {
                    const sliderValue = calculateSliderValue(minVal, maxVal, finishPosition - startPosition, currPosition);
                    const indicator = sliderControl.find('.slider-indicator');
                    indicator.html(`${sliderValue}`);
                }
            }
        })
    }
}

function controlIndicator(parent: JQuery<HTMLElement>, action: string) : void {
    const indicatorWrapper: JQuery<HTMLElement> = parent.find('.slider-indicator-wrapper');
    const classThatHidesIndicator: string = `${indicatorWrapper.attr('class').split(' ')[0]}--hidden`
    if (action === 'hide') {
        indicatorWrapper.addClass(classThatHidesIndicator);
    } else {
        indicatorWrapper.removeClass(classThatHidesIndicator);
    }
}

function moveElemHor (event: JQuery.Event, start: number, finish: number, controlElem: JQuery<HTMLElement>): number {
    const position: number = calculatePosition(start, event.pageX);
    controlElem.css('transform', `translateX(${position}px)`);
    return position;
}

function calculatePosition(start: number, curr: number) : number {
    return curr - Math.round(start);
}

function calculateFilledTrackWidth(containerWidth: number, currentPosition: number) : number  {
    const measureUnit: number = containerWidth / 100;
    return Math.round(currentPosition / measureUnit);
}

function calculateSliderValue(min: number, max: number, containerWidth: number, currentPosition: number): number {
    const measureUnit: number = containerWidth / (max - min);
    return min + Math.round(currentPosition / measureUnit);
}