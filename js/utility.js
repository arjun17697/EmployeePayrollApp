const stringify = (date) => {
    const format = { day: "numeric", month: "short", year: "numeric" };
    return date === undefined ?
        "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);

}