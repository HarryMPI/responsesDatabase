let entries = [];
let editingIndex = null; // Track the index of the entry being edited

// Show specific view
function showView(viewId) {
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  document.getElementById(viewId).classList.add("active");
}

// Handle Excel file upload
function handleFileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const workbook = XLSX.read(e.target.result, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    entries = jsonData;
    displayEntries();
  };

  reader.readAsBinaryString(file);
}

// Save new or updated entry
function saveEntry() {
  const newEntry = {
    Exercise: document.getElementById("exercise").value,
    Year: document.getElementById("year").value,
    Group: document.getElementById("group").value,
    Received: document.getElementById("received").value,
    Submitted: document.getElementById("submitted").value,
    RefNo: document.getElementById("refNo").value,
    Type: document.getElementById("type").value,
    Keywords: document.getElementById("keywords").value,
    Question: document.getElementById("question").value,
    Answer: document.getElementById("answer").value,
  };

  if (editingIndex !== null) {
    // Update existing entry
    entries[editingIndex] = newEntry;
    editingIndex = null; // Reset editing index
  } else {
    // Add new entry
    entries.push(newEntry);
  }

  displayEntries();
  document.getElementById("entryForm").reset();
  showView("tableView");
}

// Populate form for editing
function editEntry(index) {
  const entry = entries[index];

  // Populate form fields with existing entry data
  document.getElementById("exercise").value = entry.Exercise || "";
  document.getElementById("year").value = entry.Year || "";
  document.getElementById("group").value = entry.Group || "";
  document.getElementById("received").value = entry.Received || "";
  document.getElementById("submitted").value = entry.Submitted || "";
  document.getElementById("refNo").value = entry.RefNo || "";
  document.getElementById("type").value = entry.Type || "";
  document.getElementById("keywords").value = entry.Keywords || "";
  document.getElementById("question").value = entry.Question || "";
  document.getElementById("answer").value = entry.Answer || "";

  editingIndex = index; // Set the index for updating
  showView("formView"); // Switch to form view
}

// Display entries in the table
function displayEntries() {
  const tableBody = document.getElementById("entriesTableBody");
  tableBody.innerHTML = "";

  entries.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.Exercise || ""}</td>
      <td>${entry.Year || ""}</td>
      <td>${entry.Group || ""}</td>
      <td>${entry.Received || ""}</td>
      <td>${entry.Submitted || ""}</td>
      <td>${entry.RefNo || ""}</td>
      <td>${entry.Type || ""}</td>
      <td>${entry.Keywords || ""}</td>
      <td>${entry.Question || ""}</td>
      <td>${entry.Answer || ""}</td>
      <td>
        <button onclick="editEntry(${index})" class="edit-btn">Edit</button>
        <button onclick="deleteEntry(${index})" class="delete-btn">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Delete an entry
function deleteEntry(index) {
  entries.splice(index, 1);
  displayEntries();
}

function searchEntries() {
  const searchInput = document.getElementById("searchBar").value.toLowerCase();
  const searchTerms = searchInput.split(",").map((term) => term.trim()); // Split by commas and trim whitespace

  const filteredEntries = entries.filter((entry) =>
    searchTerms.every((term) =>
      Object.values(entry).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    )
  );

  const tableBody = document.getElementById("entriesTableBody");
  tableBody.innerHTML = "";

  filteredEntries.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.Exercise || ""}</td>
      <td>${entry.Year || ""}</td>
      <td>${entry.Group || ""}</td>
      <td>${entry.Received || ""}</td>
      <td>${entry.Submitted || ""}</td>
      <td>${entry.RefNo || ""}</td>
      <td>${entry.Type || ""}</td>
      <td>${entry.Keywords || ""}</td>
      <td>${entry.Question || ""}</td>
      <td>${entry.Answer || ""}</td>
      <td>
        <button onclick="editEntry(${index})" class="edit-btn">Edit</button>
        <button onclick="deleteEntry(${index})" class="delete-btn">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Export entries to Excel
function downloadExcel() {
  const worksheet = XLSX.utils.json_to_sheet(entries);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Entries");

  XLSX.writeFile(workbook, "entries.xlsx");
}


// Table sorting
let sortDirections = {}; // Track sorting direction for each column

function sortTable(columnIndex) {
  const tableBody = document.getElementById("entriesTableBody");
  const rows = Array.from(tableBody.querySelectorAll("tr"));

  // Determine the sort direction for the column
  const isAscending = !sortDirections[columnIndex]; // Toggle direction
  sortDirections[columnIndex] = isAscending;

  // Sort rows
  rows.sort((rowA, rowB) => {
    const cellA = rowA.children[columnIndex].textContent.trim();
    const cellB = rowB.children[columnIndex].textContent.trim();

    // Handle numeric and date sorting
    if (!isNaN(cellA) && !isNaN(cellB)) {
      return isAscending ? cellA - cellB : cellB - cellA;
    }

    // Handle date sorting for "dateCol" class
    if (rowA.children[columnIndex].classList.contains("dateCol")) {
      const dateA = new Date(cellA);
      const dateB = new Date(cellB);
      return isAscending ? dateA - dateB : dateB - dateA;
    }

    // Default: String sorting
    return isAscending
      ? cellA.localeCompare(cellB)
      : cellB.localeCompare(cellA);
  });

  // Re-render sorted rows
  tableBody.innerHTML = "";
  rows.forEach((row) => tableBody.appendChild(row));
}
