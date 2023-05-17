window.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', calculateSubsidy);

    function calculateSubsidy() {
        const householdSize = parseInt(document.getElementById('household-size').value);
        const incomeType = document.querySelector('input[name="income-type"]:checked').value;
        const income = parseFloat(document.getElementById('income').value);

        let eligibilityMsg;
        let annualIncome;

        if (incomeType === 'annual') {
            annualIncome = income;
            eligibilityMsg = checkEligibility(householdSize, annualIncome);
        } else {
            annualIncome = income * 2080;
            eligibilityMsg = checkEligibility(householdSize, annualIncome);
        }

        showResult(eligibilityMsg, annualIncome);
    }

    function checkEligibility(householdSize, income) {
        const data = {
            1: { minIncome: 13590.00, maxIncome: 20385.00 },
            2: { minIncome: 18310.00, maxIncome: 27465.00 },
            3: { minIncome: 23030.00, maxIncome: 34545.00 },
            4: { minIncome: 27750.00, maxIncome: 41625.00 },
            5: { minIncome: 32470.00, maxIncome: 48705.00 },
            6: { minIncome: 37190.00, maxIncome: 55785.00 }
        };

        if (income >= data[householdSize].minIncome && income <= data[householdSize].maxIncome) {
            return 'You are eligible for zero dollar health insurance';
        } else if (income > data[householdSize].maxIncome) {
            return 'You are eligible for low cost health insurance. Call our office for more details at (972)219-6004';
        } else {
            return 'You are not eligible for a plan at this time';
        }
    }

    function showResult(eligibilityMsg, annualIncome) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p>${eligibilityMsg}</p>
            <p>Annual Income: $${annualIncome.toFixed(2)}</p>
        `;
    }
});
