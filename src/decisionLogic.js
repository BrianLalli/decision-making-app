function analyzeScenario(values, goals, scenario) {
    console.log("Analyzing Scenario:", scenario);
    console.log("Values:", values);
    console.log("Goals:", goals);

    // Safety checks
    if (!values || !Array.isArray(values) || values.some(value => typeof value !== 'string')) {
        console.error("Values are undefined, not an array, or not all strings");
        return { error: "Values are invalid" };
    }
    if (!goals || !Array.isArray(goals) || goals.some(goal => typeof goal !== 'string')) {
        console.error("Goals are undefined, not an array, or not all strings");
        return { error: "Goals are invalid" };
    }
    if (typeof scenario !== "string") {
        console.error("Scenario is not a string");
        return { error: "Scenario is not a string" };
    }

    const scenarioWords = scenario.toLowerCase().split(/\s+/);
    console.log("Scenario Words:", scenarioWords);

    let valueScore = 0;
    let goalScore = 0;
    const valueWeight = 1.5;
    const goalWeight = 1.0;

    scenarioWords.forEach(word => {
        values.forEach((value, index) => {
            if (word === value.toLowerCase()) {
                valueScore += valueWeight / (index + 1);
            }
        });
        goals.forEach((goal, index) => {
            if (word === goal.toLowerCase()) {
                goalScore += goalWeight / (index + 1);
            }
        });
    });

    console.log("Value Score:", valueScore);
    console.log("Goal Score:", goalScore);

    const advice = generateAdvice(valueScore, goalScore);
    console.log("Generated Advice:", advice);
    return {
        valuesMatchCount: valueScore,
        goalsMatchCount: goalScore,
        advice: advice
    };
}

function generateAdvice(valueScore, goalScore) {
    const totalScore = valueScore + goalScore;

    if (totalScore === 0) {
        return "This scenario doesn't align with your values or goals.";
    }

    const valuePercentage = ((valueScore / totalScore) * 100).toFixed(2);
    const goalPercentage = ((goalScore / totalScore) * 100).toFixed(2);

    const alignmentThreshold = 70;
    if (valuePercentage >= alignmentThreshold) {
        return `Definitely consider this, as it strongly aligns with your values (${valuePercentage}%).`;
    } else if (goalPercentage >= alignmentThreshold) {
        return `This aligns well with your goals (${goalPercentage}%), so it might be worth considering.`;
    } else if (valueScore > goalScore) {
        return `This aligns more with your values (${valuePercentage}%) than goals. You might want to consider it.`;
    } else if (goalScore > valueScore) {
        return `This aligns more with your goals (${goalPercentage}%) than values. It's up to you to decide its importance.`;
    } else {
        return "This scenario has a balanced alignment with both your values and goals. Weigh your options carefully.";
    }
}

export { analyzeScenario };
