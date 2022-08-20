import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui'

import { printAvailability } from 'functions'

export const ToolbarPrintButton = ({ appts, openColorPalette }) => {
    
    const handleOpenTheme = () => {
        openColorPalette()
    }

    const handleClickPrint = () => {
        printAvailability(appts)
    }
    

    return (
        <Toolbar.FlexibleSpace>
            <Grid 
                container 
                direction='row' 
                spacing={1} 
                style={{width: '-webkit-max-content'}}
            >
                <Grid item>
                    <Button 
                        variant='outlined' 
                        style={{ width: '-webkit-max-content' }}
                        onClick={() => handleOpenTheme()}
                    >
                        Theme
                    </Button>
                </Grid>

                <Grid item>
                    <Button 
                        variant='outlined' 
                        style={{ width: '-webkit-max-content' }}
                        onClick={() => handleClickPrint()}
                    >
                        Print Availability
                    </Button>
                </Grid>
            </Grid>
        </Toolbar.FlexibleSpace>
    )
}