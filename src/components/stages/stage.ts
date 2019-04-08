import { throttled } from './../../throttle';
const stagesBlock = $('.stages-wrapper');
const stagesList = stagesBlock.find('.stages-labels');
let clickedLabelNum = null;
const handleFilledTrack = throttled(100, calculateTrackWidth);

stagesBlock.on('click', (e) : void => {
    const stages = stagesList.children().length;
    if (e.target.tagName === 'LI') {
        const clickedItemParent = $(e.target).parent();
        const buttonsNum = clickedItemParent.children().length;
        clickedLabelNum = clickedItemParent.children().index(e.target);
        const classNameToManage = `${e.target.classList[0]}--active`;
        const filledTrack = $(e.currentTarget).find('.stages-backbone__filled-track');
        // Закрасим кнопки, которые предшествуют выбранному этапу
        $(clickedItemParent.children()).each((index, element) => {
            if (index <= clickedLabelNum) {
                if (!$(element).hasClass(classNameToManage)) {
                    $(element).addClass(classNameToManage);
                }
            } else {
                if ($(element).hasClass(classNameToManage)) {
                    $(element).removeClass(classNameToManage);
                }
            }
        })
        // Закрасим полоску, соединяющую кнопки до нужной кнопки
        filledTrack.css('transform', `scaleX(${handleFilledTrack(filledTrack.parent(), stagesList, clickedLabelNum)})`);
    }
})

$( window ).on('resize', (e) : void => {
    const filledTrack = stagesBlock.find('.stages-backbone__filled-track');
    filledTrack.css('transform', `scaleX(${handleFilledTrack(filledTrack.parent(), stagesList, clickedLabelNum)})`);
})

function calculateTrackWidth(container: JQuery<HTMLElement>, buttonsList: JQuery<HTMLElement>, clickedBtnNum: number): number {
    const buttonsNum = buttonsList.children().length;
    const singleButtonWidth = buttonsList.children().eq(0).width();
    const measureUnit = Math.round(container.width() / buttonsNum);
    const clickedButtonPosition = buttonsList.children().eq(clickedBtnNum).position();
    return clickedButtonPosition.left + (singleButtonWidth / 2);
}