import react, { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler'
import {
    ConfirmationDialog,
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui'

import { Alert } from './Alert'

import { advanceDate, printAvailability, validateDateTime } from 'functions'

export const DevExpress = () => {
    const [openAlert, setOpenAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [appointments, setAppointments] = useState([])

    const [viewDate, setViewDate] = useState(new Date())

    useEffect(() => {
        //if today is Saturday, display following week
        if (viewDate.getDay() === 6) {
            const newDate = advanceDate(viewDate)
            setViewDate(newDate)
        }
    }, [viewDate])


    const handleCloseAlert = (close) => {
        close ? setOpenAlert(false) : setOpenAlert(true)
    }


    const handleClickPrint = () => {
        printAvailability(appointments)
    }


    const ToolbarPrintButton = () => {
        return (
            <Toolbar.FlexibleSpace>
                <Button 
                    variant='outlined' 
                    style={{ width: '-webkit-max-content' }}
                    onClick={() => handleClickPrint()}
                >
                    Print Availability
                </Button>
            </Toolbar.FlexibleSpace>
        )
    }


    const handleDateTimeValidation = (date) => {
        const { newDate, displayAlert, displayMessage } = validateDateTime(date)

        setAlertMessage(displayMessage)
        setOpenAlert(displayAlert)

        return newDate
    }


    const handleCommitChanges = ({ added, changed, deleted }) => {
        let tempAppts = [...appointments]

        if (added) {
            const newID = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0
            added.notes = added.notes === undefined ? '' : added.notes

            let roundedStartDate = handleDateTimeValidation(new Date(added.startDate))
            added.startDate = roundedStartDate

            let roundedEndDate = handleDateTimeValidation(new Date(added.endDate))
            added.endDate = roundedEndDate

            tempAppts.push({id: newID, ...added})
            setAppointments(tempAppts)
        }

        if (changed) {
            let error = 0
            const changedObject = Object.values(changed)[0]
            console.log("ChangedObject", changedObject)
            if (changedObject['startDate']) {
                let roundedStartDate = handleDateTimeValidation(new Date(changedObject.startDate))
                if (isNaN(roundedStartDate.getTime())) { error = 1 }
                changedObject.startDate = roundedStartDate
            }

            if (changedObject['endDate']) {
                let roundedEndDate = handleDateTimeValidation(new Date(changedObject.endDate))
                if (isNaN(roundedEndDate.getTime())) { error = 1 }
                changedObject.endDate = roundedEndDate
            }

            if (error === 0) {
                tempAppts = tempAppts.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changedObject } : appointment
                ))
            }
            setAppointments(tempAppts)
        }

        if (deleted !== undefined) {
            tempAppts = tempAppts.filter(appointment => appointment.id !== deleted)
            setAppointments(tempAppts)
        }
    }


    return (
        <Paper>
            <Alert isOpen={openAlert} message={alertMessage} closeAlert={handleCloseAlert} />
            <Scheduler
                data={appointments}
            >
                <ViewState
                    defaultCurrentDate={viewDate}
                />
                <Toolbar
                    flexibleSpaceComponent={ToolbarPrintButton}
                />
                <DateNavigator />
                <EditingState
                    onCommitChanges={handleCommitChanges}
                />
                <IntegratedEditing />
                <WeekView 
                    startDayHour={9}
                    endDayHour={17}
                    excludedDays={[0, 6]}
                    cellDuration={60}
                />
                <ConfirmationDialog />
                <Appointments data={appointments}/>
                <AppointmentTooltip 
                    showOpenButton
                    showDeleteButton
                />
                <AppointmentForm 
                />
            </Scheduler>
        </Paper>
    )
}