import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        try:
            await page.goto("http://localhost:5173")
            await page.wait_for_selector("main.max-w-7xl", timeout=10000)
            print("Successfully loaded the main content.")
            await page.screenshot(path="verification.png")
            print("Screenshot saved to verification.png")
        except Exception as e:
            print(f"An error occurred: {e}")
            await page.screenshot(path="verification_error.png")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
