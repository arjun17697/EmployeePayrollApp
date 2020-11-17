let empPayrollList = [];
window.addEventListener("DOMContentLoaded", (event) => {
    empPayrollList = getEmpDetailsFromLocalStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem("editEmp");
});

const getEmpDetailsFromLocalStorage = () => {
    return localStorage.getItem("EmployeePayrollList") ?
        JSON.parse(localStorage.getItem("EmployeePayrollList")) :
        [];
};

const createInnerHtml = () => {
    const headerHtml =
        "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Day</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;

    for (let emp of empPayrollList) {
        innerHtml = `${innerHtml}  
            <tr>
            <td>
              <img src="${emp._profilePic}" alt="P" class="profile">
            </td>
            <td>${emp._name}</td>
            <td>${emp._gender}</td>
            <td>${getDeptHtml(emp._department)}</td>
            <td>${emp._salary}</td>
            <td>${emp._startDate}</td>
            <td>
            <img id="1" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="Delete">
            <img id="1" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="Edit">
            </td>
            </tr>
            `;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
};

const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [{
            _name: "Arjun Gupta",
            _profilePic: "../assets/profile-images/Ellipse -8.png",
            _gender: "Male",
            _department: ["Others"],
            _salary: "40000",
            _note: "",
            _startDate: "16 Sep 2020",
        },
        {
            _name: "Random 2",
            _profilePic: "../assets/profile-images/Ellipse -2.png",
            _gender: "Male",
            _department: ["HR", "Others"],
            _salary: "100000",
            _note: "I'm groot.",
            _startDate: "01 Jan 2018",
        },
        {
            _name: "Random 3",
            _profilePic: "../assets/profile-images/Ellipse -3.png",
            _gender: "Male",
            _department: ["Others"],
            _salary: "40000",
            _note: "",
            _startDate: "02 Aug 2019",
        },
    ];
    return employeePayrollListLocal;
};

const getDeptHtml = (deptList) => {
    let deptHtml = "";
    for (const dept of deptList)
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
    return deptHtml;
};