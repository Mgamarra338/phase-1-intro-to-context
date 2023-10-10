// Your code here
function createEmployeeRecord(employeeData) {
    const [firstName, familyName, title, payRate] = employeeData;
  
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payRate,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }

  function createEmployeeRecords(arr) {
    return arr.map(employeeData => createEmployeeRecord(employeeData));
  }

  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
    });
  
    return employeeRecord;
  }

  function createTimeOutEvent(employeeRecord,dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    });

    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const hoursWorked = timeOutEvent.hour - timeInEvent.hour;
  
    return hoursWorked/ 100;
  }

  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
  
    const wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }

  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  
    const totalWages = datesWorked.reduce((acc, date) => {
      return acc + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  
    return totalWages;
  }

  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((acc, employeeRecord) => {
      return acc + allWagesFor(employeeRecord);
    }, 0);
  
    return totalPayroll;
  }