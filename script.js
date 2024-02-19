function getDues(department) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      fillTable(this, department);
    }
  };
  xhttp.open("GET", "companydue.xml", true);
  xhttp.send();
}

function fillTable(xml, department) {
  var i;
  var xmlDoc = xml.responseXML;
  var table =
    "<tr><th>Employee Name</th><th>Department</th>" +
    "<th>Due Date</th><th>Amount</th></tr>";
  var x = xmlDoc.getElementsByTagName("record");
  for (i = 0; i < x.length; i++) {
    var recordDepartment = x[i]
      .getElementsByTagName("department")[0]
      .childNodes[0].nodeValue.toLowerCase();
    if (
      department.toLowerCase() === "all" ||
      recordDepartment === department.toLowerCase()
    ) {
      table +=
        "<tr><td>" +
        x[i].getElementsByTagName("employeename")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("department")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("duedate")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("amount")[0].childNodes[0].nodeValue +
        "</td></tr>";
    }
  }
  document.getElementById("company").innerHTML = table;
}

document.addEventListener("DOMContentLoaded", function () {
  var departmentSelect = document.getElementById("department-selection");

  // Set default value to "all" when the page loads
  departmentSelect.value = "all";

  departmentSelect.addEventListener("change", function () {
    var selectedDepartment = departmentSelect.value;
    getDues(selectedDepartment);
  });

  // Trigger the 'change' event to load data for the default department
  var event = new Event("change");
  departmentSelect.dispatchEvent(event);
});
