export function validateDateTime(date) {
    let newDateObject = {newDate: date, displayAlert: false, displayMessage: ''}

    let minDateTime = new Date(date)
    minDateTime.setHours(9, 0, 0, 0)

    let maxDateTime = new Date(date)
    maxDateTime.setHours(17, 0, 0, 0)

    //MAKE SURE SELECTED DATE IS WITHIN 9-5
    if (newDateObject.newDate < minDateTime) {
        newDateObject.newDate = minDateTime
        newDateObject.displayAlert = true
        newDateObject.displayMessage = 'You selected a time outside standard work hours so we corrected that for you! Please limit your selection between 9a and 5p.'
    }
    else if (newDateObject.newDate > maxDateTime) {
        newDateObject.newDate = maxDateTime
        newDateObject.displayAlert = true
        newDateObject.displayMessage = 'You selected a time outside standard work hours so we corrected that for you! Please limit your selection between 9a and 5p.'
    }

    //IF INVALID TIME
    if (isNaN(date.getTime())) {
        newDateObject.displayAlert = true
        newDateObject.displayMessage = 'One or more of your dates were invalid! Please be careful!'
    }

    return newDateObject
}