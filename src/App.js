import React, { useState } from 'react';
import { ThemeProvider, Container } from '@mui/material';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import theme from './theme';
import ValueInput from './ValueInput';
import GoalInput from './GoalInput';
import ScenarioInput from './ScenarioInput';
import ResultDisplay from './ResultDisplay';
import { analyzeScenario } from './decisionLogic'; // Ensure this path is correct

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [values, setValues] = useState([]);
  const [goals, setGoals] = useState({ shortTermGoals: [], longTermGoals: [] });
  const [analysisResult, setAnalysisResult] = useState(null); // State to store the analysis result
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
    // Split each value and goal into individual words
    const splitValues = values.flatMap(value => value.split(/\s+/).map(word => word.trim()));
    const splitGoals = [...goals.shortTermGoals, ...goals.longTermGoals]
                        .flatMap(goal => goal.split(/\s+/).map(word => word.trim()));

    const result = analyzeScenario(splitValues, splitGoals, scenario);
    setAnalysisResult(result);
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
        return <ScenarioInput userValues={values} userGoals={[...goals.shortTermGoals, ...goals.longTermGoals]} onSubmitScenario={handleSubmitScenario} />;
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
