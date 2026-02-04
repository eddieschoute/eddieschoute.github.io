from playwright.sync_api import sync_playwright, expect

def test_expand_all_bug():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000/cv.html")

        # 1. Verify initial state
        buttons = page.locator(".accordion-button")

        # 2. Click "Expand All"
        page.locator("#expandAll").click()

        # Wait a bit
        page.wait_for_timeout(1000)

        # 3. Verify all are open
        open_buttons = page.locator(".accordion-button:not(.collapsed)")
        closed_buttons = page.locator(".accordion-button.collapsed")

        open_count = open_buttons.count()
        closed_count = closed_buttons.count()

        print(f"After Expand All: {open_count} open, {closed_count} closed.")

        if closed_count > 0:
            print("FAILURE: Some accordions are still closed!")
            exit(1)

        # 4. Check for Blue Highlight on ALL open buttons
        # rgb(207, 226, 255) is the bg color we saw.
        # We can also check that it is NOT white/transparent.

        all_blue = True
        for i in range(open_count):
            btn = open_buttons.nth(i)
            bg_color = btn.evaluate("el => getComputedStyle(el).backgroundColor")
            # We expect some blue. White is rgb(255, 255, 255) or rgba(0, 0, 0, 0)
            if bg_color == "rgb(255, 255, 255)" or bg_color == "rgba(0, 0, 0, 0)":
                print(f"FAILURE: Button {i} is not highlighted! bg={bg_color}")
                all_blue = False

        if all_blue:
            print("SUCCESS: All open buttons have a background color.")

        page.screenshot(path="verification/final_verification.png")

        browser.close()

if __name__ == "__main__":
    test_expand_all_bug()
