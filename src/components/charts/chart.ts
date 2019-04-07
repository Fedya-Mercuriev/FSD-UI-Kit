(function() {
    $('.chart-wrapper').mouseover(e => {
        const donutChart = $(e.currentTarget).find('.donut-chart');
        if (donutChart.length !== 0) {
            const chartPieces = $(donutChart).children();
            const display = $(e.currentTarget).find('.donut-chart-display-value');
            const displayBaseClass = display[0].classList[0];
            const target = e.target;
            console.log(target);
            chartPieces.each((_, element) => {
                transparentizeUnhoveredElems(target, element);
                if (element === target) {
                    display.html($(element).data('value'));
                    display.removeClass(`${displayBaseClass}--hidden`);
                }
            })
            if (target === donutChart[0]) {
                removeTransparency(chartPieces);
            }
        } else {
            return;
        }
    })
    
    $('.chart-wrapper').mouseleave(e => {
        const donutChart = $(e.currentTarget).find('.donut-chart');
        if (donutChart.length !== 0) {
            const display = $(e.currentTarget).find('.donut-chart-display-value');
            const displayBaseClass = display[0].classList[0];
            const chartPieces = $(donutChart).children();
            removeTransparency(chartPieces);
            display.addClass(`${displayBaseClass}--hidden`);
        }
    })
    
    function removeTransparency(elemCollection) {
        elemCollection.each((_, element) => {
            $(element).css('opacity', '');
        })
    }
    
    function transparentizeUnhoveredElems(target, curr) {
        if (curr !== target) {
            $(curr).css('opacity', '0.5');
        } else {
            $(curr).css('opacity', '');
        }
    }
})();