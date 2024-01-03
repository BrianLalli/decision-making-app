import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';

const ResultDisplay = ({ result, isLoading }) => {
    return (
        <Card sx={{ minWidth: 275, mt: 2 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Decision Result
                </Typography>
                {isLoading ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : result ? (
                    <Typography variant="h5" component="div">
                        {result.advice}
                    </Typography>
                ) : (
                    <Typography variant="h5" component="div">
                        No result available yet.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default ResultDisplay;
