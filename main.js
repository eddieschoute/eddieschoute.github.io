$('.collapser').click(function () {
    $(this).parent().next().collapse('toggle');
    $(this).toggleClass('collapsed')
});

$("#expandAll").on("click", function () {
    $('.accordion-collapse').collapse('show');
})

$("#collapseAll").on("click", function () {
    $('.accordion-collapse').collapse('hide');
})