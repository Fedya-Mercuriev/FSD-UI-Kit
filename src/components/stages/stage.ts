const stagesBlock = $('.stages-wrapper');
const stagesList = stagesBlock.find('stages-labels');

stagesBlock.on('click', (e) => {
    const stages = stagesList.children().length;
    if (e.target.tagName === 'LI') {
        const clickedItemParent = $(e.target).parent();
        const buttonsNum = clickedItemParent.children().length;
        const clickedLabelNum = clickedItemParent.children().index(e.target);
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
        filledTrack.css('transform', `scaleX(${calculateTrackWidth(buttonsNum, clickedLabelNum)})`);
    }
})

function calculateTrackWidth(buttonsNum: number, clickedBtnNum: number): number {
    const measureUnit = 100 / (buttonsNum - 1);
    let result = measureUnit * clickedBtnNum;
    if (result === 0) {
        return result;
    }
    return result - 2;
}