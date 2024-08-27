document.addEventListener("DOMContentLoaded", () => {
  const rowTemplate = document.getElementById("journalRowTemplate");
  let rowToDelete = null;

  const accountNumbers = [
    { id: 1, number: "1001", name: "Cash" },
    { id: 2, number: "1002", name: "Accounts Receivable" },
    { id: 3, number: "2001", name: "Accounts Payable" },
  ];

  function populateRow(row) {
    const accountNumberDropdown = row.querySelector(".account-number-dropdown");
    const accountNameDropdown = row.querySelector(".account-name-dropdown");

    accountNumbers.forEach((account) => {
      const optionNumber = document.createElement("option");
      optionNumber.value = account.number;
      optionNumber.textContent = account.number;
      accountNumberDropdown.appendChild(optionNumber);

      const optionName = document.createElement("option");
      optionName.value = account.name;
      optionName.textContent = account.name;
      accountNameDropdown.appendChild(optionName);
    });
  }

  function addNewRow(journalTableBody) {
    const newRow = rowTemplate.content.cloneNode(true);
    populateRow(newRow);
    journalTableBody.appendChild(newRow);
  }

  const newModal = document.getElementById("newModal");
  const journalTableBody = document
    .getElementById("journalTable")
    .querySelector("tbody");
  const addRowButton = document.getElementById("addRow");

  newModal.addEventListener("show.bs.modal", () => {
    journalTableBody.innerHTML = ""; // Clear existing rows
    addNewRow(journalTableBody); // Add one empty row
  });

  addRowButton.addEventListener("click", () => {
    addNewRow(journalTableBody);
  });

  journalTableBody.addEventListener("change", (event) => {
    if (event.target.classList.contains("account-number-dropdown")) {
      const selectedNumber = event.target.value;
      const nameDropdown = event.target
        .closest("tr")
        .querySelector(".account-name-dropdown");
      nameDropdown.value = accountNumbers.find(
        (account) => account.number === selectedNumber
      ).name;
    }

    if (event.target.classList.contains("account-name-dropdown")) {
      const selectedName = event.target.value;
      const numberDropdown = event.target
        .closest("tr")
        .querySelector(".account-number-dropdown");
      numberDropdown.value = accountNumbers.find(
        (account) => account.name === selectedName
      ).number;
    }
  });

  journalTableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-row")) {
      e.preventDefault(); // Prevent default button action
      const row = e.target.closest("tr");
      const inputs = row.querySelectorAll("input, select");
      let isPopulated = false;

      inputs.forEach((input) => {
        if (input.value.trim() !== "") {
          isPopulated = true;
        }
      });

      if (isPopulated) {
        rowToDelete = row;
        const deleteConfirmationModal = new bootstrap.Modal(
          document.getElementById("deleteConfirmationModal")
        );
        deleteConfirmationModal.show();
      } else {
        row.remove();
      }
    }
  });

  document
    .getElementById("confirmDelete")
    .addEventListener("click", function () {
      if (rowToDelete) {
        rowToDelete.remove();
        rowToDelete = null;
      }
      const deleteConfirmationModal = bootstrap.Modal.getInstance(
        document.getElementById("deleteConfirmationModal")
      );
      deleteConfirmationModal.hide();
    });
});
