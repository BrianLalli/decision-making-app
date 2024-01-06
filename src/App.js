// import React, { useState } from 'react';
// import { ThemeProvider, Container } from '@mui/material';
// import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
// import theme from './theme';
// import ValueInput from './ValueInput';
// import GoalInput from './GoalInput';
// import ScenarioInput from './ScenarioInput';
// import ResultDisplay from './ResultDisplay';
// import { analyzeScenario } from './decisionLogic'; // Ensure this path is correct

// function App() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [completed, setCompleted] = useState(false);
//   const [values, setValues] = useState([]);
//   const [goals, setGoals] = useState({ shortTermGoals: [], longTermGoals: [] });
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const steps = ['Enter Values', 'Enter Goals', 'Describe Scenario'];

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleValuesSubmit = (submittedValues) => {
//     setValues(submittedValues);
//     handleNext();
//   };

//   const handleGoalsSubmit = (submittedGoals) => {
//     setGoals(submittedGoals);
//     handleNext();
//   };

//   const handleSubmitScenario = (scenario) => {
//     const result = analyzeScenario(values, [...goals.shortTermGoals, ...goals.longTermGoals], scenario);
//     setAnalysisResult(result);
//     setCompleted(true);
//     handleNext();
//   };

//   const getStepContent = (stepIndex) => {
//     switch (stepIndex) {
//       case 0:
//         return <ValueInput onSubmitValues={handleValuesSubmit} />;
//       case 1:
//         return <GoalInput onSubmitGoals={handleGoalsSubmit} />;
//       case 2:
//         return <ScenarioInput onSubmitScenario={handleSubmitScenario} />;
//       default:
//         return 'Unknown Step';
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="md">
//         <Box sx={{ width: '100%', mt: 4 }}>
//           <Stepper activeStep={activeStep}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//           <div>
//             {completed ? (
//               <ResultDisplay result={analysisResult} isLoading={false} />
//             ) : (
//               <div>
//                 {getStepContent(activeStep)}
//                 <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                   <Button
//                     color="inherit"
//                     disabled={activeStep === 0}
//                     onClick={handleBack}
//                     sx={{ mr: 1 }}
//                   >
//                     Back
//                   </Button>
//                   <Box sx={{ flex: '1 1 auto' }} />
//                   <Button onClick={handleNext}>
//                     {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                   </Button>
//                 </Box>
//               </div>
//             )}
//           </div>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { ThemeProvider, Container } from '@mui/material';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import axios from 'axios';
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
  const [analysisResult, setAnalysisResult] = useState(null);
  const steps = ['Enter Values', 'Enter Goals', 'Describe Scenario'];

  const handleNext = () => {
    console.log('handleNext called, Active Step:', activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    console.log('handleBack called, Active Step:', activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleValuesSubmit = (submittedValues) => {
    console.log('Values submitted:', submittedValues);
    setValues(submittedValues);
    handleNext();
  };

  const handleGoalsSubmit = (submittedGoals) => {
    console.log('Goals submitted:', submittedGoals);
    setGoals(submittedGoals);
    handleNext();
  };

  const handleSubmitScenario = async (scenario) => {
    console.log('handleSubmitScenario called with:', scenario);
    console.log('Current Values:', values);
    console.log('Current Goals:', goals);

    try {
      const response = await axios.post('http://localhost:3001/analyze-scenario', {
        scenario,
        values,
        goals: [...goals.shortTermGoals, ...goals.longTermGoals]
      });

      console.log('Response from server:', response.data);
      setAnalysisResult({ advice: response.data.advice });
      setCompleted(true);
    } catch (error) {
      console.error('Error analyzing scenario:', error);
      if (error.response) {
        console.error('Error response from server:', error.response);
      }
    }
    handleNext();
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
        console.error('Unknown Step:', stepIndex);
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
