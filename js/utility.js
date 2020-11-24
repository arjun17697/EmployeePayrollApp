const stringify = (date) => {
    const format = { day: "numeric", month: "short", year: "numeric" };
    return date === undefined ?
        "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
};


const checkName = (name) => {
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}\\s?([A-Z]{1}[a-z]{1,}\\s?){0,2}$");
    if (!nameRegex.test(name)) throw "Given name is in wrong format";
};

const checkStartDate = (startDate) => {
    let now = new Date();
    if (startDate <= now) {
        let diff = Math.abs(now.getTime() - startDate.getTime());
        if (diff / (1000 * 60 * 60 * 24) > 30) throw "Start Date is beyond 30 Days";
    } else throw "Strat Date is a future Date";
};