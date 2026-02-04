// Initialize behaviors
document.addEventListener('DOMContentLoaded', () => {

    // 1. Accordion Icon State Management via Bootstrap Events
    // This ensures the icon stays in sync regardless of how the collapse is triggered (click, expand all, etc.)
    document.querySelectorAll('.accordion-collapse').forEach(collapseEl => {
        // When opening
        collapseEl.addEventListener('show.bs.collapse', () => {
            const button = collapseEl.parentElement.querySelector('.collapser');
            if (button) button.classList.remove('collapsed');
        });

        // When closing
        collapseEl.addEventListener('hide.bs.collapse', () => {
            const button = collapseEl.parentElement.querySelector('.collapser');
            if (button) button.classList.add('collapsed');
        });
    });

    // 2. Individual Accordion Toggles
    document.querySelectorAll('.collapser').forEach(button => {
        button.addEventListener('click', function (e) {
            // Find the collapse element: parent (h3) -> next sibling (div.accordion-collapse)
            const collapseElement = this.parentElement.nextElementSibling;
            if (collapseElement && collapseElement.classList.contains('accordion-collapse')) {
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseElement);
                bsCollapse.toggle();
            }
        });
    });

    // 3. Expand All
    const expandAllBtn = document.getElementById("expandAll");
    if (expandAllBtn) {
        expandAllBtn.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelectorAll('.accordion-collapse').forEach(el => {
                bootstrap.Collapse.getOrCreateInstance(el).show();
            });
        });
    }

    // 4. Collapse All
    const collapseAllBtn = document.getElementById("collapseAll");
    if (collapseAllBtn) {
        collapseAllBtn.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelectorAll('.accordion-collapse').forEach(el => {
                bootstrap.Collapse.getOrCreateInstance(el).hide();
            });
        });
    }

    // 5. Search filtering
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const findText = this.value.toLowerCase();
            document.querySelectorAll(".accordion-item").forEach(accordion => {
                if (accordion.textContent.toLowerCase().includes(findText)) {
                    accordion.classList.remove('d-none');
                } else {
                    accordion.classList.add('d-none');
                }
            });

            // Update sections visibility
            document.querySelectorAll("section").forEach(section => {
                let sectionVisible = false;

                // Look for accordion groups within section
                section.querySelectorAll(".accordion").forEach(accordionGroup => {
                    let groupVisible = false;

                    accordionGroup.querySelectorAll(".accordion-item").forEach(item => {
                        if (!item.classList.contains('d-none')) {
                            groupVisible = true;
                        }
                    });

                    // Preceding h3 handling
                    // The HTML structure is <h3>...</h3> <div class="accordion ...">
                    // So we look for the previous element sibling of the accordion group
                    const header = accordionGroup.previousElementSibling;
                    const isHeader = header && header.tagName === 'H3';

                    if (groupVisible) {
                        accordionGroup.classList.remove('d-none');
                        if (isHeader) header.classList.remove('d-none');
                        sectionVisible = true;
                    } else {
                        accordionGroup.classList.add('d-none');
                        if (isHeader) header.classList.add('d-none');
                    }
                });

                if (sectionVisible) {
                    section.classList.remove('d-none');
                } else {
                    section.classList.add('d-none');
                }
            });

            updateClearButton(this.value);
        });
    }

    // 6. Clear button
    const clearBtn = document.getElementById("searchClear");
    if (clearBtn) {
        clearBtn.addEventListener("click", function() {
            if (searchInput) {
                searchInput.value = "";
                searchInput.dispatchEvent(new Event('keyup')); // Trigger the keyup handler to reset filter
                searchInput.focus();
            }
        });
    }

    function updateClearButton(text) {
        if (clearBtn) {
            if (text.length > 0) {
                clearBtn.style.display = "block";
            } else {
                clearBtn.style.display = "none";
            }
        }
    }
});
