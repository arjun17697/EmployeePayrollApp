class EmployeePayroll {
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        const nameRegex = RegExp(
            "^[A-Z]{1}[a-zA-Z\\s]{2,}$"
        );
        if (nameRegex.test(name)) this._name = name;
        else throw "Given name is in wrong format";
    }

    get profilePic() {
        return this._profilePic;
    }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }
    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }
    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }
    get note() {
        return this._note;
    }
    set note(note) {
        this._note = note;
    }
    get startDate() {
        const format = { year: "numeric", month: "long", day: "numeric" };
        this._startDate =
            this._startDate === undefined ?
            "undefined" :
            this._startDate.toLocaleDateString("en-US", format);
        return this._startDate;
    }
    set startDate(startDate) {
        if (startDate > new Date()) throw "Given start date is in future";
        else if (startDate < new Date(Date.UTC(1970, 1, 1)))
            throw "Given start date is before Jan, 1970";
        else {
            const format = { year: "numeric", month: "long", day: "numeric" };
            startDate =
                startDate === undefined ?
                "undefined" :
                startDate.toLocaleDateString("en-US", format);
        }
        this._startDate = startDate;
    }
}