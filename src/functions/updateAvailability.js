export function updateAvailability(appointments, added, changed, deleted) {
    let tempAppts = [...appointments]

    if (added) {
        const newID = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0
        added.notes = added.notes === undefined ? '' : added.notes

        tempAppts.push({id: newID, ...added})
    }

    if (changed) {
        const changedObject = Object.values(changed)[0]

        tempAppts = tempAppts.map(appointment => (
            changed[appointment.id] ? { ...appointment, ...changedObject } : appointment
        ))
    }

    if (deleted !== undefined) {
        tempAppts = tempAppts.filter(appointment => appointment.id !== deleted)
    }

    return tempAppts
}