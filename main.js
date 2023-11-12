$('.collapser').click(function () {
    $(this).parent().next().collapse('toggle');
    $(this).toggleClass('collapsed')
});