function convertCsvToHtmlTable(csvData) {
    // Split CSV into rows
    const rows = csvData.split('\n');

    if (rows.length === 0) {
        return; // No data
    }

    // Extract headers
    const headers = rows[0].split(',');

    // Create table
    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');
    
    // Generate HTML for header row
    const headerRow = table.insertRow(-1);
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    // Generate HTML for each row
    rows.slice(1).forEach(row => {
        const cells = row.split(',');
        const rowElement = table.insertRow(-1);
        cells.forEach(cellText => {
            const cell = rowElement.insertCell(-1);
            cell.textContent = cellText;
        });
    });

    // Instead of appending to a container, this function now returns
    // the HTML representation of the table
    return table.outerHTML;
}