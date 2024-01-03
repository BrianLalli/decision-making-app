import React, { useState } from 'react';
import { ThemeProvider, Container } from '@mui/material'; // Corrected import statement
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import theme from './theme'; // Import your custom theme
import ValueInput from './ValueInput';
import GoalInput from './GoalInput';
import ScenarioInput from './ScenarioInput';
import ResultDisplay from './ResultDisplay';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const steps = ['Enter Values', 'Enter Goals', 'Describe Scenario'];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setCompleted(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <ValueInput onSubmitValues={() => handleNext()} />;
      case 1:
        return <GoalInput onSubmitGoals={() => handleNext()} />;
      case 2:
        return <ScenarioInput onSubmitScenario={() => handleNext()} />;
      default:
        return 'Unknown Step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md"> {/* Use Container for a responsive maxWidth */}
        <Box sx={{ width: '100%', mt: 4 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {completed ? (
              <ResultDisplay />
            ) : (
              <div>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </div>
            )}
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
