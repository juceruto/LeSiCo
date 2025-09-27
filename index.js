async function loadDB() {
    // Load and initialize sql.js
    const SQL = await initSqlJs({
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    });

    // Fetch the .db file from your folder
    const response = await fetch("LeSiCo.db");
    const buffer = await response.arrayBuffer();
    const db = new SQL.Database(new Uint8Array(buffer));

    // Run a SQL query
    const result = db.exec("SELECT * FROM Alternativas");

    // Render query results into an HTML table
    if (result.length > 0) {
        let html = "<table border='1'><tr>";

        // Add column headers
        result[0].columns.forEach(col => {
            html += `<th>${col}</th>`;
        });
        html += "</tr>";

        // Add rows
        result[0].values.forEach(row => {
            html += "<tr>";
            row.forEach(cell => {
                html += `<td>${cell}</td>`;
            });
            html += "</tr>";
        });

        html += "</table>";
        document.getElementById("output").innerHTML = html;
    } else {
        document.getElementById("output").innerHTML = "No data found.";
    }
}
console.log('Happy developing ✨')
