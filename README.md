# Data Entry Application

This is a simple, web-based data entry application designed for managing and editing structured entries. The app supports uploading and downloading data in Excel format and includes features like adding, editing, deleting, and searching entries.

---

## Features

### Core Features
1. **Add New Entries**: Fill out the form to create new entries.
2. **Edit Existing Entries**: Update previously created entries by clicking the "Edit" button in the table.
3. **Delete Entries**: Remove unwanted entries with a single click.
4. **Search Functionality**: Instantly filter table entries by entering a search term.
5. **Excel Integration**:
   - **Upload**: Load entries from an Excel file (.xlsx or .xls).
   - **Export**: Save current entries to an Excel file.

---

## How to Run

### Prerequisites
- **Node.js**: Download and install [Node.js](https://nodejs.org/).
- **Firebase CLI**: Install Firebase CLI globally:
  ```bash
  npm install -g firebase-tools

Setup Steps

    Clone the Repository

git clone https://github.com/your-repo-name/data-entry-app.git
cd data-entry-app

Initialize Firebase Hosting

firebase init hosting

    Choose an existing Firebase project or create a new one.
    Set the public directory as public.
    Do not configure as a single-page app for now.

Add Files to the public Directory Ensure the following files are in the public directory:

    index.html
    styles.css
    app.js

Start Local Development Use Firebase's emulator to serve the app locally:

firebase emulators:start

Open http://localhost:5000 in your browser to test the app.

Deploy to Firebase Hosting Once ready, deploy the app:

    firebase deploy

    Firebase will provide a live URL for your application.


### How to Use

    Add Entries
        Go to "Add / Edit Entry" view.
        Fill out the form and click "Save Entry".

    Edit Entries
        Go to the "View Entries" view.
        Find the entry in the table and click "Edit".
        Update the form fields as needed and click "Save Entry".

    Delete Entries
        Go to the "View Entries" view.
        Find the entry in the table and click "Delete".

    Search
        Use the search bar to filter entries based on any field.

    Excel Upload
        Click the "Choose File" button in the "Add / Edit Entry" view.
        Select an Excel file (.xlsx or .xls) to load data.

    Excel Export
        Click "Export Data" to save current entries as an Excel file.

### Technologies Used

    HTML: Structure and layout.
    CSS: Styling with a clean, modern design.
    JavaScript: Core app functionality.
    Firebase Hosting: Hosting and serving the app.
    SheetJS (XLSX): Excel file upload and export.

### Contributing

Contributions are welcome! Please create an issue or submit a pull request for improvements.
License

This project is licensed under the MIT License.


---
