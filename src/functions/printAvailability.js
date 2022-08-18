export function printAvailability(availability) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let printArray = []

    for (let appt in availability) {
        let item = availability[appt]
        let printObject = {day: days[item.startDate.getDay()], start: item.startDate.getHours(), end: item.endDate.getHours()}
        printArray.push(printObject)
    }

    console.log(JSON.stringify(printArray))
}