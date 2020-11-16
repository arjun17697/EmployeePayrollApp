window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener("input", function () {
      if (name.value.length == 0) {
        textError.textContent = "";
        return;
      }
      try {
        new EmployeePayroll().name = name.value;
        textError.textContent = "";
      } catch (e) {
        textError.textContent = e;
      }
    });
    const startdate = document.querySelector("#startDate");
    const day = document.querySelector("#day");
    const month = document.querySelector("#month");
    const year = document.querySelector("#year");
    const dateError = document.querySelector(".date-error");
    startdate.addEventListener("input", function () {
      try {
        new EmployeePayroll().startDate = new Date(
          Date.UTC(year.value, month.value - 1, day.value)
        );
        dateError.textContent = "";
      } catch (e) {
        dateError.textContent = e;
      }
    });
  
    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    salary.addEventListener("input", function () {
      output.textContent = salary.value;
    });
  });
   
  // Methods to save on submit and reset
const save = () => {
    try {
      let employeePayroll = createEmployeePayroll();
    } catch (e) {
      return;
    }
  };
  
  const createEmployeePayroll = () => {
    let employeePayroll = new EmployeePayroll();
    try {
      employeePayroll.name = getInputValueById("#name");
    } catch (e) {
      setTextValue(".text-error", e);
      throw e;
    }
    employeePayroll.profilePic = getSelectedValues("[name=profile]").pop();
    employeePayroll.gender = getSelectedValues("[name=gender]").pop();
    employeePayroll.department = getSelectedValues("[name=department]");
    employeePayroll.salary = getInputValueById("#salary");
    employeePayroll.note = getInputValueById("#notes");
    employeePayroll.startDate = new Date(
      Date.UTC(
        getInputValueById("#year"),
        getInputValueById("#month") - 1,
        getInputValueById("#day")
      )
    );
    alert(employeePayroll.toString());
    return employeePayroll;
  };
  const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach((item) => {
      if (item.checked) selectedItems.push(item.value);
    });
    return selectedItems;
  };
  const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
  };
  const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
  };