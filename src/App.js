import React, { useState } from 'react';
import { ThemeProvider, Container, Box, Stepper, Step, StepLabel, Button } from '@mui/material';
import axios from 'axios';
import theme from './theme';
import ValueInput from './ValueInput';
import GoalInput from './GoalInput';
import ScenarioInput from './ScenarioInput';
import ResultDisplay from './ResultDisplay';
import LandingPage from './LandingPage'; // Import the new LandingPage component

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [showLandingPage, setShowLandingPage] = useState(true); // New state for landing page display
  const [completed, setCompleted] = useState(false);
  const [values, setValues] = useState([]);
  const [goals, setGoals] = useState({ shortTermGoals: [], longTermGoals: [] });
  const [analysisResult, setAnalysisResult] = useState(null);
  const steps = ['Enter Values', 'Enter Goals', 'Describe Scenario'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleValuesSubmit = (submittedValues) => {
    setValues(submittedValues);
    handleNext();
  };

  const handleGoalsSubmit = (submittedGoals) => {
    setGoals(submittedGoals);
    handleNext();
  };

  const handleSubmitScenario = async (scenario) => {
    try {
      const response = await axios.post('http://localhost:3001/analyze-scenario', {
        scenario,
        values,
        goals: [...goals.shortTermGoals, ...goals.longTermGoals]
      });

      setAnalysisResult({ advice: response.data.advice });
      setCompleted(true);
    } catch (error) {
      console.error('Error analyzing scenario:', error);
    }
    handleNext();
  };

  const startApp = () => {
    setShowLandingPage(false); // Hide the landing page when 'Get Started' is clicked
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <ValueInput onSubmitValues={handleValuesSubmit} />;
      case 1:
        return <GoalInput onSubmitGoals={handleGoalsSubmit} />;
      case 2:
        return <ScenarioInput onSubmitScenario={handleSubmitScenario} />;
      default:
        return 'Unknown Step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        {showLandingPage ? (
          <LandingPage onStart={startApp} />
        ) : (
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
                <ResultDisplay result={analysisResult} isLoading={false} />
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
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
