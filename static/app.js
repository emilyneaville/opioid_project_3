function init(){ 

    // fetch the json data and console log it
    d3.json('http://127.0.0.1:8000/api/v1.0/unique_populations').then(function(allPops){
        
        // display available data to work with
        console.log(allPops);

        // Select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");

        // Append each unique special population to the dropdown menu
        allPops.forEach((population) => {
            dropdownMenu
                .append("option")
                .text(population)
                .property("value");
        
        // Call the buildCharts function
        scatter_chart(population);
        bar_chart(population);

        });
    });
};

// Function that updates the dashboard based on the dropdown menu selection
function optionChanged(passedvalue) {
    scatter_chart(passedvalue);
    bar_chart(passedvalue);
};

// Build the line chart function 
function scatter_chart(selectedPopulation) {

    // Fetch the json data
    d3.json('http://127.0.0.1:8000/api/v1.0/all_patient_info').then(allData=> {

        // Filter the data based on the selected population
        let filteredData = allData.filter(data => data.Spec_Pop === selectedPopulation);

        // Console log the filtered data
        console.log('filtered data', filteredData);
        
        // Create an array for the years
        let allYears = filteredData.map(data => {
            return data.Year;
        });

        // Get the unique values from the allYears array
        let uniqueYears = allYears.filter((x, i, a) => a.indexOf(x) == i);
        console.log('unique years',uniqueYears);
        
        // Updated how we create the array that holds the patient count per year/age_bracket/etc. based on the selected population

        // Create an array that sums the number of patients for each year based on the selected population
        // Empty array to hold the patient count
        let patientCount = [];
        // Loop thru each unique Year (the uniqueYears array we created)
        uniqueYears.forEach((year) => {
            // Initialize the count of patients to 0
            let count = 0;
            // Loop thru each patient in the filtered data
            filteredData.forEach((patient) => {
                // If the year[i] matches the patient[i] year, add 1 to the count
                if (patient.Year === year) {
                    count += 1;
                }
            });
            // Push the count to the patientCount array
            patientCount.push(count);
        });

        // Console log the patient count
        console.log('patient count by year', patientCount);
        
        // Create the line chart
        let trace1 = [{
            x: uniqueYears.map(id=> `Year ${id}`),
            y: patientCount,
            type: 'scatter',
            mode: 'lines+markers'
        }];

        // Define the layout for the line chart
        let layout1 = {
            title: `Number of ${selectedPopulation} Patients by Year`,
            height: 400,
            width: 800
            // See if we can get the y axis to always start at 0
        };    

        // Render the plot to the div tag with id "bar1"
        Plotly.newPlot("line", trace1, layout1);
    });
};

// Build the line chart function 
function bar_chart(selectedPopulation) {

    // Fetch the json data
    d3.json('http://127.0.0.1:8000/api/v1.0/all_patient_info').then(allData=> {

        // Filter the data based on the selected population
        let filteredData = allData.filter(data => data.Spec_Pop === selectedPopulation);

        // Console log the filtered data
        console.log('filtered data', filteredData);
        
        // Create an array for the age brackets
        let allAgeBrackets = filteredData.map(data => {
            return data.Age_Bracket;
        });

        // Get the unique values from the age brackets array
        let uniqueAgeBrackets = allAgeBrackets.filter((x, i, a) => a.indexOf(x) == i).sort();
        console.log('unique brackets', uniqueAgeBrackets);

        // Create an array that sums the number of patients for each age bracket based on the selected population
        // Same nested forEach loop as the line chart
        let patientCount = [];
        uniqueAgeBrackets.forEach((age) => {
            let count = 0;
            filteredData.forEach((patient) => {
                if (patient.Age_Bracket === age) {
                    count += 1;
                }
            });
            patientCount.push(count);
        });

        // Console log the patient count to ensure accuracy
        console.log('patient count by age', patientCount);
        
        // Create the bar chart
        let trace2 = [{
            x: uniqueAgeBrackets.map(id=> `Ages ${id}`),
            y: patientCount,
            type: 'bar',
        }];

        // Define the layout for the bar chart
        let layout2 = {
            title: `Number of ${selectedPopulation} Patients by Year`,
            height: 400,
            width: 800
            // See if we can get the y axis to only display whole numbers
        };    

        // Render the plot to the div tag with id "bar1"
        Plotly.newPlot("bar1", trace2, layout2);
    });
};

// Initalize the dashboard
init();