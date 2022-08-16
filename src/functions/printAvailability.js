export function printAvailability(availability) {
    // console.log("Availability JSON", typeof availability)

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let printArray = []

    for (let appt in availability) {
        let item = availability[appt]
        console.log("ITEM", item)
        let printObject = {day: days[item.startDate.getDay()], start: item.startDate.getHours(), end: item.endDate.getHours()}
        printArray.push(printObject)
    }

    console.log(JSON.stringify(printArray))
}