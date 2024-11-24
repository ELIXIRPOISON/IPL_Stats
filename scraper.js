const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    const url = "https://www.iplt20.com/stats";
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url);

    // Example: Scraping Orange Cap Data (Most Runs)
    await page.click('button[data-stat="most-runs"]'); // Click 'Most Runs'
    await page.waitForSelector(".stats-table");

    const data = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll(".stats-table tbody tr"));
        return rows.map(row => {
            const cols = row.querySelectorAll("td");
            return {
                player: cols[1].innerText.trim(),
                team: cols[2].innerText.trim(),
                matches: parseInt(cols[3].innerText.trim()),
                runs: parseInt(cols[4].innerText.trim()),
                season: "2023" // Hardcoded season
            };
        });
    });

    fs.writeFileSync("most_runs.json", JSON.stringify(data, null, 2));
    console.log("Data scraped successfully!");

    await browser.close();
})();
