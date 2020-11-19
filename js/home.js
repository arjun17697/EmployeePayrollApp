let empPayrollList = [];
window.addEventListener("DOMContentLoaded", (event) => {
    empPayrollList = getEmpDetailsFromLocalStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem("editEmp");
});

const getEmpDetailsFromLocalStorage = () => {
    return localStorage.getItem("EmployeePayrollList") ?
        JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
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
            <td>${stringify(emp._startDate)}</td>
            <td>
            <img id="${
                emp._id
              }" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="Delete">
              <img id="${
                emp._id
              }" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="Edit">
            </td>
            </tr>
            `;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
};


const getDeptHtml = (deptList) => {
    let deptHtml = "";
    for (const dept of deptList)
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
    return deptHtml;
};

const remove = (node) => {
    console.log(node.id);
    let empData = empPayrollList.find((emp) => emp._id == node.id);
    if (!empData) return;
    const index = empPayrollList
        .map((emp) => emp._id)
        .indexOf(empData._id);
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();

}

const update = (node) => {
    let empData = empPayrollList.find((emp) => emp._id == node.id);
    if (!empData) return;
    // const index = empPayrollList.map((emp) => emp._id).indexOf(empData._id);
    // empPayrollList.splice(index, 1);
    localStorage.setItem("editEmp", JSON.stringify(empData));
    window.location.href = site_properties.add_employee_page;
    isUpdating = true;
    currentNode = node;
};