const { chromium } = require("playwright");

async function runTest() {
  // Launch the browser
  const browser = await chromium.launch();

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();

  // Navigate to the landing page
  await page.goto("http://localhost:3000/");

  //Title
  try {
    await page.waitForSelector("#title", { timeout: 5000 });
    console.log("Title is visible");
  } catch (error) {
    console.error("Title is not visible" + error.message);
  }

  // 1st button - Redesign Room
  try {
    await page.waitForSelector("#room-btn", { timeout: 5000 });
    console.log("Room Button is visible");
  } catch (error) {
    console.error("Room Button is not visible" + error.message);
  }

  // 2nd button - Redesign Building
  try {
    await page.waitForSelector("#building-btn", { timeout: 5000 });
    console.log("Buidlding Button is visible");
  } catch (error) {
    console.error("Buidlding Button is not visible" + error.message);
  }

  // Close the browser
  await browser.close();
}

runTest();
