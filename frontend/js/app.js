fetch("http://localhost:3000/api/top-players?season=2023&category=Most Runs")
    .then(response => response.json())
    .then(data => {
        const labels = data.map(player => player.player);
        const runs = data.map(player => player.runs);

        const ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Runs",
                    data: runs,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1
                }]
            }
        });
    })
    .catch(error => console.error(error));
