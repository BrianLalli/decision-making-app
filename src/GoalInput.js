import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';

const GoalInput = ({ onSubmitGoals }) => {
    const [shortTermGoals, setShortTermGoals] = useState(["", ""]);
    const [longTermGoals, setLongTermGoals] = useState(["", ""]);
    const [isError, setIsError] = useState(false);

    const handleInputChange = (goals, setGoals, index, event) => {
        const newGoals = [...goals];
        newGoals[index] = event.target.value;
        setGoals(newGoals);
    };

    const handleSubmit = () => {
        const areAllGoalsEntered = shortTermGoals.every(goal => goal.trim() !== "") && 
                                   longTermGoals.every(goal => goal.trim() !== "");
        if (areAllGoalsEntered) {
            onSubmitGoals({ shortTermGoals, longTermGoals });
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
            <Box sx={{ width: '100%' }}>
                <h3>Short-term Goals</h3>
                {shortTermGoals.map((goal, index) => (
                    <TextField
                        key={index}
                        label={`Short-term Goal ${index + 1}`}
                        variant="outlined"
                        value={goal}
                        onChange={(e) => handleInputChange(shortTermGoals, setShortTermGoals, index, e)}
                        error={isError && goal.trim() === ""}
                        helperText={isError && goal.trim() === "" ? "This field is required" : ""}
                        fullWidth
                        margin="normal"
                    />
                ))}
            </Box>
            <Box sx={{ width: '100%' }}>
                <h3>Long-term Goals</h3>
                {longTermGoals.map((goal, index) => (
                    <TextField
                        key={index}
                        label={`Long-term Goal ${index + 1}`}
                        variant="outlined"
                        value={goal}
                        onChange={(e) => handleInputChange(longTermGoals, setLongTermGoals, index, e)}
                        error={isError && goal.trim() === ""}
                        helperText={isError && goal.trim() === "" ? "This field is required" : ""}
                        fullWidth
                        margin="normal"
                    />
                ))}
            </Box>
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
                Submit Goals
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
                    Please fill in all the goals.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default GoalInput;
