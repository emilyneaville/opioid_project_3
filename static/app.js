// URL const variables
const unique_populations = 'http://127.0.0.1:8000/api/v1.0/unique_populations';
const all_patient_info = 'http://127.0.0.1:8000/api/v1.0/all_patient_info';

function init(){ 

    // fetch the json data and console log it
    d3.json(unique_populations).then(allPops => {
        
        // sort dropdown menue options
        let pops_sorted = allPops.sort();

        // display available data to work with
        console.log('Drowpdown selections', pops_sorted);

        // Select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");

        // Append each unique special population to the dropdown menu
        allPops.forEach(population => {
            dropdownMenu
                .append("option")
                .text(population)
                .property("value");
        
        // Call the buildCharts function
        scatter_chart(population);
        bar_chart(population);
        bar_chart2(population);
        });
    });
};

// Function that updates the dashboard based on the dropdown menu selection
function optionChanged(passedvalue) {
    scatter_chart(passedvalue);
    bar_chart(passedvalue);
    bar_chart2(passedvalue);
};

// Build the line chart function 
function scatter_chart(selectedPopulation) {

    // Fetch the json data
    d3.json(all_patient_info).then(allData=> {

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
        console.log('unique years', uniqueYears);
        
        // Updated how we create the array that holds the patient count per year/age_bracket/etc. based on the selected population

        // Create an array that sums the number of patients for each year based on the selected population
        // Empty array to hold the patient count
        let patientCount = [];

        // Loop thru each unique Year (the uniqueYears array we created)
        uniqueYears.forEach(year => {

            // Initialize the count of patients to 0
            let count = 0;

            // Loop thru each patient in the filtered data
            filteredData.forEach(patient => {

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
            x: uniqueYears.map(id=> `${id}`),
            y: patientCount,
            type: 'scatter'
        }];

        // Define the layout for the line chart
        let layout1 = {
            title: `Number of ${selectedPopulation} Patients by Year`,
            height: 400,
            width: 800,
            xaxis:{
                title: 'Years'
            },
            yaxis: {
                title: `${selectedPopulation}`,
                rangemode: 'tozero'
            },
            colorway: [
                '#D3B2C4'
            ]
        };    
        
        // display scatter chart
        Plotly.newPlot("line", trace1, layout1);
    });
};

// Build the bar chart function 
function bar_chart(selectedPopulation) {
    // Fetch the json data
    d3.json(all_patient_info).then(allData=> {

        // Filter the data based on the selected population
        let filteredData = allData.filter(data => data.Spec_Pop === selectedPopulation);
        
        // Create an array for the age brackets
        let allAgeBrackets = filteredData.map(data => {
            return data.Age_Bracket;
        });

        // Get the unique values from the age brackets array
        let uniqueAgeBrackets = allAgeBrackets.filter((x, i, a) => a.indexOf(x) == i).sort();
        console.log('u-age brackets', uniqueAgeBrackets);

        // Create an array that sums the number of patients for each age bracket based on the selected population
        // Same nested forEach loop as the line chart
        let patientCount = [];
        uniqueAgeBrackets.forEach(age => {

            // variable to hold counting
            let count = 0;
            filteredData.forEach(patient => {
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
            x: uniqueAgeBrackets.map(id=> `${id}`),
            y: patientCount,
            type: 'bar',
            marker: {
                color: 'rgb(180, 211, 178)',
                line: {
                  color: 'rgb(0,128,0)',
                  width: 1
                }
            }
        }];
        

        // Define the layout for the bar chart
        let layout2 = {
            title: `Number of ${selectedPopulation} Patients by Age`,
            height: 400,
            width: 600,
            xaxis:{
                title: 'Age Bracket'
            },
            yaxis: {
                title: `${selectedPopulation}`,
                rangemode: 'tozero'
            }
        };    

        // display bar chart
        Plotly.newPlot('bar1', trace2, layout2);
    });
};

// Build the bubble chart function 
function bar_chart2(selectedPopulation) {

    // Fetch the json data
    d3.json(all_patient_info).then(allData=> {

        // Filter the data based on the selected population
        let filteredData = allData.filter(data => data.Spec_Pop === selectedPopulation);
        
        // get all days weekdays
        let all_weekdays = filteredData.map(data => {
            return data.Weekday;
        });

        // Get unique weekdays values
        let weekdays = all_weekdays.filter((x, i, a) => a.indexOf(x) == i);
        
        // example of sorted array to compare to weekdays already retrieved
        let sorted = {
            'Monday':1, 'Tuesday':2, 'Wednesday':3, 'Thursday': 4, 'Friday': 5, 'Saturday':6, 'Sunday':7
        };

        // order unique weekdays from Monday
        weekdays.sort((a, b) => {
            return [sorted[a] - sorted[b]];
        });
        // display weekdays sorted
        console.log(weekdays);
        
        // list to hold count
        let weekday_count = [];

        // weekday count
        weekdays.forEach(day => {

            // variable to hold counting
            let count = 0;

            filteredData.forEach(id => {
                if (id.Weekday === day) {
                    count += 1;
                }
            });
            weekday_count.push(count);

            // ***************
            // PENDING AVERAGE
            // ***************
        });
        // Creat the bar chart
        let trace3 = [{
            x: weekdays.map(id=> `${id}`),
            y: weekday_count,
            type: 'bar',
            marker: {
                color: 'rgb(192, 178, 211)',
                line: {
                    color: 'rgb(128,0,128)',
                    width: 1
                }
            }
        }];

    // Define the layout for the bar chart
    let layout3 = {
        title: `Number of ${selectedPopulation} Patients by Weekday`,
        height: 400,
        width: 600,
        xaxis:{
            title: 'Weekday'
        },
        yaxis: {
            title: `${selectedPopulation}`,
            rangemode: 'tozero'
        }
    };    

    // display bar chart
    Plotly.newPlot("bar2", trace3, layout3);
    });
};

// Initalize the dashboard
init();