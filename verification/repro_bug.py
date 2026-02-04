from playwright.sync_api import sync_playwright, expect

def test_expand_all_bug():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000/cv.html")

        # 1. Verify initial state
        # Find all accordion buttons
        buttons = page.locator(".accordion-button")
        count = buttons.count()
        print(f"Found {count} accordion buttons.")

        # Check that we have some open and some closed
        # .collapsed class means closed.
        open_buttons = page.locator(".accordion-button:not(.collapsed)")
        closed_buttons = page.locator(".accordion-button.collapsed")

        open_count_initial = open_buttons.count()
        closed_count_initial = closed_buttons.count()

        print(f"Initial: {open_count_initial} open, {closed_count_initial} closed.")

        # Take initial screenshot
        page.screenshot(path="verification/initial_state.png")

        # 2. Click "Expand All"
        page.locator("#expandAll").click()

        # Wait a bit for animations (Bootstrap collapse animation)
        page.wait_for_timeout(1000)

        # 3. Verify state after Expand All
        # We expect ALL to be open (0 closed)
        open_count_after = open_buttons.count()
        closed_count_after = closed_buttons.count()

        print(f"After Expand All: {open_count_after} open, {closed_count_after} closed.")

        page.screenshot(path="verification/after_expand_all.png")

        # The bug report says: "accordions that are already opened are closed"
        # So we expect failures here if the bug exists.

        if closed_count_after > 0:
            print("FAILURE: Some accordions are still closed!")
        else:
            print("SUCCESS: All accordions are open.")

        # 4. Check for Blue Highlight
        # Any open button should NOT have .collapsed class.
        # We can also check CSS if needed, but class check is a good proxy as per main.js logic.
        # Let's check the first open button's background color.
        if open_count_after > 0:
            first_open = open_buttons.first
            bg_color = first_open.evaluate("el => getComputedStyle(el).backgroundColor")
            color = first_open.evaluate("el => getComputedStyle(el).color")
            print(f"Open button style: bg={bg_color}, color={color}")
            # Standard Bootstrap 5 active bg is usually blue-ish (e.g. rgb(231, 241, 255))
            # and text blue (e.g. rgb(12, 99, 228))

        browser.close()

if __name__ == "__main__":
    test_expand_all_bug()
