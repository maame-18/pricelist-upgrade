
function calculateAll() {
    const rows = document.querySelectorAll("#pricing-table tbody tr");
    let grandTotal = 0;
  
    rows.forEach(row => {
      const quantityInput = row.querySelector(".quantity");
      const unitPrice = parseFloat(row.querySelector("td[data-unit-price]").dataset.unitPrice);
      const quantity = parseInt(quantityInput.value) || 0;
  
      const rowTotal = unitPrice * quantity;
      row.querySelector(".row-total").textContent = rowTotal.toFixed(2);
  
     
      grandTotal += rowTotal;
    });
  
   
    document.getElementById("grand-total").textContent = grandTotal.toFixed(2);
  }
  


function searchProduct() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase();
    const tableRows = document.querySelectorAll("#pricing-table tbody tr");
  
    tableRows.forEach(row => {
      const productName = row.cells[0].textContent.toLowerCase();
      const productSize = row.cells[1].textContent.toLowerCase();
  
      if (productName.includes(searchInput) || productSize.includes(searchInput)) {
        row.style.display = ""; // Show matching rows
      } else {
        row.style.display = "none"; // Hide non-matching rows
      }
    });
  }
  
  // Simple authentication
const validCredentials = {
    username: "admin",
    password: "password123",
  };
  
  function handleLogin(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === validCredentials.username && password === validCredentials.password) {
      alert("Login successful!");
      document.getElementById("login-container").style.display = "none";
      document.getElementById("app-container").style.display = "block";
    } else {
      alert("Invalid username or password. Please try again.");
    }
  }
  

  async function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Add a title
    doc.text("Wholesale Pricing List", 10, 10);
  
    // Extract table content
    const table = document.querySelector("#pricing-table");
    const rows = table.querySelectorAll("tr");
  
    let yPosition = 20;
  
    rows.forEach((row) => {
      const cells = row.querySelectorAll("th, td");
      let rowText = "";
  
      cells.forEach((cell) => {
        rowText += `${cell.textContent}    `;
      });
  
      doc.text(rowText, 10, yPosition);
      yPosition += 10;
    });
  
    // Save PDF
    doc.save("pricing_list.pdf");
  }
  

  function exportToExcel() {
    const table = document.querySelector("#pricing-table");
    const rows = table.querySelectorAll("tr");
    const data = [];
  
    rows.forEach((row) => {
      const cells = row.querySelectorAll("th, td");
      const rowData = Array.from(cells).map((cell) => cell.textContent.trim());
      data.push(rowData);
    });
  
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pricing List");
  
    XLSX.writeFile(workbook, "pricing_list.xlsx");
  }
  