import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';

const ScenarioInput = ({ onSubmitScenario }) => {
    const [scenario, setScenario] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = () => {
        if (scenario.trim() !== "") {
            onSubmitScenario(scenario);
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
            <TextField
                label="Scenario"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                error={isError && scenario.trim() === ""}
                helperText={isError && scenario.trim() === "" ? "This field is required" : ""}
                margin="normal"
            />
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
                Submit Scenario
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
                    Please enter a scenario.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ScenarioInput;