const baseClass = 'toggle-btn';
const toggleBtn: JQuery<HTMLElement> = $(`.${baseClass}-wrapper`);

toggleBtn.click((e) => {
    event.preventDefault();
    const labelBaseClass = `${baseClass}-label`;
    const buttonLabel = $(e.currentTarget).children().first();
    const labelText = buttonLabel.children().first();
    const buttonStates = {
        active: labelText.data('active'),
        inactive: labelText.data('inactive'),
    };
    if (!buttonLabel.hasClass(`${labelBaseClass}--active`)) {
        buttonLabel.addClass(`${labelBaseClass}--active`);
        labelText.html(buttonStates.active);
    } else {
        buttonLabel.removeClass(`${labelBaseClass}--active`);
        labelText.html(buttonStates.inactive);
    }
})