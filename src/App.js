import React, { useState } from 'react';
import { ThemeProvider, Container } from '@mui/material';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import theme from './theme';
import ValueInput from './ValueInput';
import GoalInput from './GoalInput';
import ScenarioInput from './ScenarioInput';
import ResultDisplay from './ResultDisplay';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [values, setValues] = useState([]);
  const [goals, setGoals] = useState({ shortTermGoals: [], longTermGoals: [] });
  const [analysisResult, setAnalysisResult] = useState(null);  // State to store the analysis result
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

  const handleSubmitScenario = (scenario) => {
    // Example: Dummy result from analyzeScenario
    const dummyResult = {
      valuesMatchCount: 1, 
      goalsMatchCount: 0, 
      advice: 'This scenario aligns more with your values than your goals.'
    };
    setAnalysisResult(dummyResult);
    setCompleted(true);
    handleNext();
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <ValueInput onSubmitValues={handleValuesSubmit} />;
      case 1:
        return <GoalInput onSubmitGoals={handleGoalsSubmit} />;
      case 2:
        const combinedGoals = [...goals.shortTermGoals, ...goals.longTermGoals];
        return <ScenarioInput userValues={values} userGoals={combinedGoals} onSubmitScenario={handleSubmitScenario} />;
      default:
        return 'Unknown Step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
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
      </Container>
    </ThemeProvider>
  );
}

export default App;
