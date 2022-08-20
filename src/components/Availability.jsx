import React, { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { 
    amber as muiAmber, 
    blue as muiBlue, 
    blueGrey as muiBlueGrey, 
    cyan as muiCyan, 
    deepOrange as muiDeepOrange,
    deepPurple as muiDeepPurple,
    green as muiGreen,
    grey as muiGrey,
    indigo as muiIndigo,
    lightBlue as muiLightBlue,
    lightGreen as muiLightGreen,
    lime as muiLime,
    orange as muiOrange,
    pink as muiPink,
    purple as muiPurple,
    red as muiRed,
    teal as muiTeal,
    yellow as muiYellow
} from '@mui/material/colors'

import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler'
import {
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
    ConfirmationDialog,
    DateNavigator,
    DragDropProvider,
    Scheduler,
    Toolbar,
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui'

import { advanceDate, validateDateTime, updateAvailability } from 'functions'
import { Alert, ColorPalette, ToolbarPrintButton } from 'components'


export const Availability = () => {
    const [openAlert, setOpenAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [appointments, setAppointments] = useState([])
    const [viewDate, setViewDate] = useState(new Date())
    const [openColorPalette, setOpenColorPalette] = useState(false)
    const [selectedColor, setSelectedColor] = useState(muiBlue)

    const theme = createTheme({
        palette: {
          primary: selectedColor
        }
    })

    let muiColors = {
        red : muiRed,
        deepOrange : muiDeepOrange,
        orange : muiOrange,
        amber : muiAmber,
        yellow : muiYellow,
        lime : muiLime,
        lightGreen : muiLightGreen,
        green : muiGreen,
        teal : muiTeal,
        cyan : muiCyan,
        lightBlue : muiLightBlue,
        blue : muiBlue,
        indigo : muiIndigo,
        deepPurple : muiDeepPurple,
        purple : muiPurple,
        pink : muiPink,
        blueGrey : muiBlueGrey,
        grey : muiGrey
    }

    useEffect(() => {
        //if today is Saturday, display following week
        if (viewDate.getDay() === 6) {
            const newDate = advanceDate(viewDate)
            setViewDate(newDate)
        }
    }, [viewDate])


    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const handleSelectColor = (color) => {
        setSelectedColor(muiColors[color])
    }

    const handleOpenColorPalette = () => {
        setOpenColorPalette(true)
    }

    const handleClosePalette = () => {
        setOpenColorPalette(false)
    }


    const handleDateTimeValidation = (date) => {
        const { newDate, displayAlert, displayMessage } = validateDateTime(date)

        setAlertMessage(displayMessage)
        setOpenAlert(displayAlert)

        return newDate
    }


    const handleCommitChanges = ({ added, changed, deleted }) => {
        let error = 0
        let tempAppts = []

        if (added) {
            let roundedStartDate = handleDateTimeValidation(new Date(added.startDate))
            added.startDate = roundedStartDate

            let roundedEndDate = handleDateTimeValidation(new Date(added.endDate))
            added.endDate = roundedEndDate
        }

        if (changed) {
            const changedObject = Object.values(changed)[0]
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
            changed[0] = changedObject
        }
        
        if (error === 0) {
            tempAppts = updateAvailability(appointments, added, changed, deleted)
            setAppointments(tempAppts)
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <Paper>
                <Alert isOpen={openAlert} message={alertMessage} closeAlert={handleCloseAlert} />
                <ColorPalette isOpen={openColorPalette} closePalette={handleClosePalette} colorObject={muiColors} selectColor={handleSelectColor}/>
                <Scheduler
                    data={appointments}
                >
                    <ViewState
                        defaultCurrentDate={viewDate}
                    />
                    <Toolbar
                        flexibleSpaceComponent={() => <ToolbarPrintButton appts={appointments} openColorPalette={handleOpenColorPalette}/>}
                    />
                    <DateNavigator />
                    <EditingState
                        onCommitChanges={handleCommitChanges}
                    />
                    <IntegratedEditing />
                    <WeekView 
                        startDayHour={8}
                        endDayHour={18}
                        excludedDays={[0, 6]}
                        cellDuration={60}
                        
                    />
                    <ConfirmationDialog />
                    <Appointments data={appointments}/>
                    <AppointmentTooltip 
                        showOpenButton
                        showDeleteButton
                    />
                    <AppointmentForm />
                    <DragDropProvider />
                </Scheduler>
            </Paper>
        </ThemeProvider>
    )
}