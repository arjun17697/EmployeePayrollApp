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

        return this._startDate;
    }
    set startDate(startDate) {
        const now = new Date();
        if (startDate > now) throw "Given start date is in future";
        const diffInDay = (now - startDate) / (1000 * 60 * 60 * 24);
        if (diffInDay > 30) throw "Given start date is beyond 30days";
        this._startDate = startDate;
    }


    toString() {
        const format = { year: "numeric", month: "short", day: "numeric" };
        const date =
            this.startDate === undefined ?
            "undefined" :
            this.startDate.toLocaleDateString("en-GB", format);
        return (
            "id = " +
            this.id +
            ", name = " +
            this.name +
            ", gender = " +
            this.gender +
            ", profilePic = " +
            this.profilePic +
            ", department = " +
            this.department +
            ", salary = " +
            this.salary +
            ", startDate = " +
            date +
            ", note = " +
            this.note
        );
    }
}