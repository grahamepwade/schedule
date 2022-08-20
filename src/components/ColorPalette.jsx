import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'


const ColorSwatch = ({ color, name, handleClickSwatch }) => {

    return (
        <Box 
            sx={{ 
                borderRadius: '16px',
                backgroundColor: color, 
                boxSizing: 'border-box',
                width: '4rem', 
                height: '4rem', 
                '&:hover': {
                    border: 2
                } 
            }}
            onClick={() => handleClickSwatch(name)}
        />
    )
}

export const ColorPalette = ({ isOpen, closePalette, colorObject, selectColor }) => {

    const handleClose = () => {
        closePalette()
    }

    const handleSelectColor = (selected) => {
        selectColor(selected)
    }

    return (
        <Paper>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Select Your Color: "}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        {Object.entries(colorObject).map(([index, color]) => 
                            <Grid key={index} item xs={2}>
                                <ColorSwatch color={color[400]} name={index} handleClickSwatch={handleSelectColor}/>
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}