let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener("input", function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            checkName(name.value);
            setTextValue(".text-error", "");
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
    const startdate = document.querySelector("#startDate");
    const day = document.querySelector("#day");
    const month = document.querySelector("#month");
    const year = document.querySelector("#year");
    startdate.addEventListener("input", function() {
        try {
            checkStartDate(new Date(year, month, day));
            new EmployeePayroll().startDate = new Date(
                Date.UTC(year.value, month.value - 1, day.value)
            );
            setTextValue(".date-error", "");
        } catch (e) {
            setTextValue(".date-error", e);
        }
    });

    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    salary.addEventListener("input", function() {
        output.textContent = salary.value;
    });
    checkForUpdate();
});

// Methods to save on submit and reset
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.href = site_properties.home_page;
    } catch (e) {
        return;
    }
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

const setEmployeePayrollObject = () => {
    if (!isUpdate && site_properties.use_local_storage.match("true")) {
        employeePayrollObj.id = new Date().getTime();
    }
    employeePayrollObj._name = getInputValueById("#name");
    employeePayrollObj._profilePic = getSelectedValues("[name=profile]").pop();
    employeePayrollObj._gender = getSelectedValues("[name=gender]").pop();
    employeePayrollObj._department = getSelectedValues("[name=department]");
    employeePayrollObj._salary = getInputValueById("#salary");
    employeePayrollObj._note = getInputValueById("#notes");
    let year = getInputValueById("#year");
    let month = getInputValueById("#month") - 1;
    let day = getInputValueById("#day");
    employeePayrollObj._startDate = new Date(year, month, day);
};

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(
        localStorage.getItem("EmployeePayrollList")
    );
    if (employeePayrollList) {
        let empPayrollData = employeePayrollList.find(
            (employee) => employee.id == employeePayrollObj.id
        );
        if (!empPayrollData) employeePayrollList.push(createEmployeePayrollData());
        else {
            const index = employeePayrollList
                .map((emp) => emp.id)
                .indexOf(empPayrollData.id);
            employeePayrollList.splice(index, 1, employeePayrollObj);
        }
    } else {
        employeePayrollList = [employeePayrollObj];
    }
    localStorage.setItem(
        "EmployeePayrollList",
        JSON.stringify(employeePayrollList)
    );
};
/*
const createEmployeePayrollData = () => {
    let employeePayroll = new EmployeePayroll();
    employeePayroll.id = new Date().getTime();
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
};

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch (e) {
        setTextValue(".text-error", e);
        throw e
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try {
        employeePayrollData.startDate = employeePayrollObj._startDate;
    } catch (e) {
        setTextValue(".date-error", e);
        throw e;
    }
    alert(employeePayrollData.toString());
};*/

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '1');
    setTextValue(".salary-output", "50000");
    setValue('#month', '1');
    setValue('#year', '2020');
};

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
};

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
};

const setSelectedValues = (propertyValue, value) => {
    document.querySelectorAll(propertyValue).forEach((item) => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value === value) item.checked = true;
    });
};
const setTextValue = (id, value) => {
    document.querySelector(id).textContent = value;
};

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem("editEmp");
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
};

const setForm = () => {
    setValue("#name", employeePayrollObj._name);
    setSelectedValues("[name=profile]", employeePayrollObj._profilePic);
    setSelectedValues("[name=gender]", employeePayrollObj._gender);
    setSelectedValues("[name=department]", employeePayrollObj._department);
    setValue("#salary", employeePayrollObj._salary);
    setTextValue(".salary-output", employeePayrollObj._salary);
    setValue("#notes", employeePayrollObj._note);
    let date = employeePayrollObj._startDate.split("-");
    setValue("#day", parseInt(date[2].substring(0, 2)));
    setValue("#month", date[1]);
    setValue("#year", date[0]);
};