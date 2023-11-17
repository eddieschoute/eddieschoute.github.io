$('.collapser').on("click", function () {
    $(this).parent().next().collapse('toggle');
    $(this).toggleClass('collapsed')
});

$("#expandAll").on("click", function () {
    $('.accordion-collapse').collapse('show');
});

$("#collapseAll").on("click", function () {
    $('.accordion-collapse').collapse('hide');
});

function filterAccordions(text) {
    // case insensitive search
    const findText = text.toLowerCase();

    $(".accordion-item").each(function () {
        const accordion = $(this)
        // If the accordion item contains the text, show it, in case it was hidden.
        if (accordion.text().toLowerCase().indexOf(findText) >= 0) {
            accordion.show(400);
        } else {
            accordion.hide(400);
        }
    });
}

$("#search").on("keyup", function () {
    filterAccordions($(this).val());
});

