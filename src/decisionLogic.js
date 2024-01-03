// src/decisionLogic.js

function analyzeScenario(values, goals, scenario) {
    // Safety checks
    if (!values || !Array.isArray(values)) {
        console.error("Values are undefined or not an array");
        return { error: "Values are undefined or not an array" };
    }
    if (!goals || !Array.isArray(goals)) {
        console.error("Goals are undefined or not an array");
        return { error: "Goals are undefined or not an array" };
    }
    if (typeof scenario !== "string") {
        console.error("Scenario is not a string");
        return { error: "Scenario is not a string" };
    }

    // Convert scenario to lowercase and split into words
    const scenarioWords = scenario.toLowerCase().split(/\s+/);

    // Convert values and goals to lowercase for comparison
    const lowerCaseValues = values.map(v => v.toLowerCase());
    const lowerCaseGoals = goals.map(g => g.toLowerCase());

    // Count matches
    let valueMatches = 0;
    let goalMatches = 0;

    scenarioWords.forEach(word => {
        if (lowerCaseValues.includes(word)) {
            valueMatches++;
        }
        if (lowerCaseGoals.includes(word)) {
            goalMatches++;
        }
    });

    // Basic analysis
    return {
        valuesMatchCount: valueMatches,
        goalsMatchCount: goalMatches,
        advice: generateAdvice(valueMatches, goalMatches)
    };
}

function generateAdvice(valueMatches, goalMatches) {
    if (valueMatches > goalMatches) {
        return "This scenario aligns more with your values than your goals.";
    } else if (goalMatches > valueMatches) {
        return "This scenario aligns more with your goals than your values.";
    } else {
        return "This scenario aligns equally with your values and goals.";
    }
}

export { analyzeScenario };
