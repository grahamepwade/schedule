export function advanceDate(date) {
    let tempStart = new Date(date)
    tempStart.setDate(tempStart.getDate() + 1)

    return tempStart
}