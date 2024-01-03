import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';

const ValueInput = ({ onSubmitValues }) => {
    const [values, setValues] = useState(["", "", ""]);
    const [isError, setIsError] = useState(false);

    const handleInputChange = (index, event) => {
        const newValues = [...values];
        newValues[index] = event.target.value;
        setValues(newValues);
    };

    const handleSubmit = () => {
        const areAllValuesEntered = values.every(value => value.trim() !== "");
        if (areAllValuesEntered) {
            onSubmitValues(values);
        } else {
            setIsError(true);
        }
    };

    const handleCloseSnackbar = () => {
        setIsError(false);
    };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%', 
                maxWidth: 400, 
                mx: 'auto', 
                p: 2 
            }}
        >
            {values.map((value, index) => (
                <TextField
                    key={index}
                    label={`Value ${index + 1}`}
                    variant="outlined"
                    value={value}
                    onChange={(e) => handleInputChange(index, e)}
                    error={isError && value.trim() === ""}
                    helperText={isError && value.trim() === "" ? "This field is required" : ""}
                    fullWidth
                    margin="normal"
                />
            ))}
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
                Submit Values
            </Button>
            <Snackbar 
                open={isError} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    width: '100%',
                    maxWidth: '450px',
                    mx: 'auto',
                    '& .MuiPaper-root': {
                        width: '100%',
                        maxWidth: '450px',
                    }
                }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Please fill in all the values.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ValueInput;
