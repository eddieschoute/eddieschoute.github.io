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
                bootstrap.Collapse.getOrCreateInstance(el, { toggle: false }).show();
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
        });
    }

    // 6. Auto-close hamburger menu
    document.addEventListener('click', function (event) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        // Only act if the menu is open
        if (!navbarCollapse || !navbarCollapse.classList.contains('show')) {
            return;
        }

        const isClickInside = navbarCollapse.contains(event.target);
        const isClickOnToggler = event.target.closest('.navbar-toggler');
        const isClickOnLink = event.target.closest('.nav-link');

        // Close if click is outside menu/toggler OR if click is on a link
        if ((!isClickInside && !isClickOnToggler) || isClickOnLink) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });
});
