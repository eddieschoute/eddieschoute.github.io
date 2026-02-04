const TRANSITION_SPEED = 400;

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

    // 1. Filter individual accordion items
    $(".accordion-item").each(function () {
        const accordion = $(this)
        // If the accordion item contains the text, show it, in case it was hidden.
        if (accordion.text().toLowerCase().indexOf(findText) >= 0) {
            accordion.show(TRANSITION_SPEED);
        } else {
            accordion.hide(TRANSITION_SPEED);
        }
    });

    // 2. Hide sections/subsections if they become empty
    $("section").each(function() {
        const section = $(this);
        let sectionVisible = false;

        // Check each accordion group within the section
        section.find(".accordion").each(function() {
            const accordionGroup = $(this);
            let groupVisible = false;

            // Check if any item in this group matched
            accordionGroup.find(".accordion-item").each(function() {
                if ($(this).text().toLowerCase().indexOf(findText) >= 0) {
                    groupVisible = true;
                }
            });

            if (groupVisible) {
                accordionGroup.show(TRANSITION_SPEED);
                // Show the preceding h3 if it exists (for subsections)
                const prev = accordionGroup.prev("h3");
                if (prev.length) prev.show(TRANSITION_SPEED);
                sectionVisible = true;
            } else {
                accordionGroup.hide(TRANSITION_SPEED);
                // Hide the preceding h3 if it exists
                const prev = accordionGroup.prev("h3");
                if (prev.length) prev.hide(TRANSITION_SPEED);
            }
        });

        if (sectionVisible) {
            section.show(TRANSITION_SPEED);
        } else {
            section.hide(TRANSITION_SPEED);
        }
    });
}

function updateClearButton(text) {
    if (text.length > 0) {
        $("#searchClear").show();
    } else {
        $("#searchClear").hide();
    }
}

$("#search").on("keyup", function () {
    const text = $(this).val();
    filterAccordions(text);
    updateClearButton(text);
});

$("#searchClear").on("click", function() {
    $("#search").val("");
    filterAccordions("");
    updateClearButton("");
    $("#search").focus();
});
