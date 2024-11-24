const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    const url = "https://www.iplt20.com/stats";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    // Example: Scrape "Most Runs" data
    await page.click('button[data-stat="most-runs"]');
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
                season: "2023",
                category: "Most Runs"
            };
        });
    });

    fs.writeFileSync("most_runs.json", JSON.stringify(data, null, 2));
    console.log("Data scraped successfully!");

    await browser.close();
})();
