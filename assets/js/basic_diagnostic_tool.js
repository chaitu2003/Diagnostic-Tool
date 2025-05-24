function cal(event) {
    event.preventDefault();

    const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptom"]:checked'))
        .map(checkbox => checkbox.value.toLowerCase());

    const results = document.getElementById('result');
    results.innerHTML = ""; 

    const conditions = [
        {
            name: "Common Cold",
            symptoms: ["fever", "cough", "sore throat"],
            confidenceWeight: 1,
            description: "A mild viral infection of the upper respiratory tract."
        },
        {
            name: "COVID-19",
            symptoms: ["fever", "cough", "fatigue", "shortness of breath"],
            confidenceWeight: 1.2,
            description: "A viral respiratory illness caused by SARS-CoV-2."
        },
        {
            name: "Migraine",
            symptoms: ["headache", "nausea"],
            confidenceWeight: 0.9,
            description: "A neurological condition causing intense headaches and nausea."
        },
        {
            name: "Influenza",
            symptoms: ["fever", "cough", "fatigue", "headache"],
            confidenceWeight: 1.1,
            description: "A contagious respiratory illness caused by influenza viruses."
        }
    ];

    const matchedConditions = [];

    conditions.forEach(condition => {
        const totalSymptoms = condition.symptoms.length;
        const matchedSymptoms = selectedSymptoms.filter(symptom => condition.symptoms.includes(symptom));
        const matchCount = matchedSymptoms.length;

        if (matchCount > 0) {
            const confidence = Math.round((matchCount / totalSymptoms) * 100 * condition.confidenceWeight);
            matchedConditions.push({
                name: condition.name,
                description: condition.description,
                confidence: confidence
            });
        }
    });

    if (matchedConditions.length > 0) {
        
        matchedConditions.forEach(cond => {
            results.innerHTML += `
                <div class="card mt-2 p-3 shadow-sm">
                    <h5>${cond.name}</h5>
                    <p><strong>Confidence Score:</strong> ${cond.confidence}%</p>
                    <p><strong>Description:</strong> ${cond.description}</p>
                </div>
            `;
        });
    } else {
        results.innerHTML = `<div class="alert alert-warning mt-3">No matching conditions found based on selected symptoms.</div>`;
    }
}