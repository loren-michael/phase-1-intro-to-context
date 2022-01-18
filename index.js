
function createEmployeeRecord (empArray) {
    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [], 
        timeOutEvents: []
    }
}

function createEmployeeRecords (nestedArr) {
    return nestedArr.map(emp => createEmployeeRecord(emp))
}

function createTimeInEvent (empObj, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date
    }
    empObj.timeInEvents.push(timeInEvent);
    return empObj
}

function createTimeOutEvent (empObj, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    }
    empObj.timeOutEvents.push(timeOutEvent);
    return empObj
}

function hoursWorkedOnDate(empRec, targetDate) {
    const timeInMatch = empRec.timeInEvents.find(inEvents => inEvents.date === targetDate);
    const timeOutMatch = empRec.timeOutEvents.find(outEvents => outEvents.date === targetDate);
    return ((timeOutMatch.hour - timeInMatch.hour) / 100)
}

function wagesEarnedOnDate(empRec, targetDate) {
    return ((hoursWorkedOnDate(empRec, targetDate)) * empRec.payPerHour)
}

function allWagesFor(empRec) {
    let totalWages = [];
    const allDates = empRec.timeInEvents.map(element => (element = element.date));
    for (let element of allDates) {
        totalWages.push(wagesEarnedOnDate(empRec, element))
    } return totalWages.reduce((a,b) => a+b, 0)
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.map(empRec => allWagesFor(empRec)).reduce((a,b) => (a = a+b), 0)
}
