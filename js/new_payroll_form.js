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
    startdate.addEventListener("input", function() {
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
        isSaving = true;
        if (isUpdating) removeWithId(currentNode.id);
        window.location.href = site_properties.home_page;
    } catch (e) {
        return;
    }
};
const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '1');
    setTextValue(".salary-output", "50000");
    setValue('#month', 'Jan');
    setValue('#year', '2020');
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}
const setSelectedValues = (propertyValue, value) => {
    document.querySelectorAll(propertyValue).forEach((item) => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value === value) item.checked = true;
    });
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

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
const createEmployeePayroll = () => {
    let employeePayroll = new EmployeePayroll();
    employeePayroll.id = new Date().getTime();
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
    alert(employeePayroll);
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

function createAndUpdateStorage(employeePayroll) {
    const setEmployeePayrollObject = () => {
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
                (employee) => employee._id == employeePayrollObj._id
            );
            if (!empPayrollData) employeePayrollList.push(createEmployeePayrollData());
            else {
                const index = employeePayrollList
                    .map((emp) => emp._id)
                    .indexOf(empPayrollData._id);
                employeePayrollList.splice(
                    index,
                    1,
                    createEmployeePayrollData(empPayrollData._id)
                );
            }
        } else {
            employeePayrollList = [createEmployeePayrollData()];
        }
        localStorage.setItem(
            "EmployeePayrollList",
            JSON.stringify(employeePayrollList)
        );
    };

    const createEmployeePayrollData = () => {
        let employeePayrollData = new EmployeePayroll();
        employeePayrollData.id = new Date().getTime();
        setEmployeePayrollData(employeePayrollData);
        return employeePayrollData;
    };

    const setEmployeePayrollData = (employeePayrollData) => {
        try {
            employeePayrollData.name = employeePayrollObj._name;
        } catch (e) {
            setTextValue(".text-error", e);
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
        }
        alert(employeePayrollData.toString());
    };
}