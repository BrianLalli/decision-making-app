import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';

const ResultDisplay = ({ result }) => {
    const { valuesMatchCount, goalsMatchCount, advice } = result || {};

    // Calculate percentages
    const totalScore = valuesMatchCount + goalsMatchCount;
    const valuePercentage = totalScore ? (valuesMatchCount / totalScore) * 100 : 0;
    const goalPercentage = totalScore ? (goalsMatchCount / totalScore) * 100 : 0;

    // Custom style for the LinearProgress bars
    const progressBarStyle = {
        height: '10px', // Increase the height for a bolder look
        borderRadius: '5px', // Rounded corners
        backgroundColor: 'lightgrey', // Background color of the bar
        marginTop: '8px', // Margin top for spacing
    };

    return (
        <Card sx={{ minWidth: 275, mt: 2 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Decision Result
                </Typography>
                <Typography variant="h5" component="div">
                    {advice || "No result available yet."}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">Values Alignment: {valuePercentage.toFixed(2)}%</Typography>
                    <LinearProgress 
                        variant="determinate" 
                        value={valuePercentage} 
                        sx={{...progressBarStyle, '& .MuiLinearProgress-bar': { backgroundColor: '#1a90ff' }}} // Custom primary color
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">Goals Alignment: {goalPercentage.toFixed(2)}%</Typography>
                    <LinearProgress 
                        variant="determinate" 
                        value={goalPercentage} 
                        sx={{...progressBarStyle, '& .MuiLinearProgress-bar': { backgroundColor: '#ff6c5c' }}} // Custom secondary color
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default ResultDisplay;
