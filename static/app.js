// URL const variables
const unique_populations = 'http://127.0.0.1:8000/api/v1.0/unique_populations';
const all_patient_info = 'http://127.0.0.1:8000/api/v1.0/all_patient_info';

function init(){ 

    // fetch the json data and console log it
    d3.json(unique_populations).then(allPops=> {
        
        // display available data to work with
        console.log(allPops);

        // Select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        
        // Console log which dataset is selected
        // let dataset = dropdownMenu.property("value");
        // console.log(dataset)

        // Append each unique special population to the dropdown menu
        allPops.forEach((population) => {
            dropdownMenu
                .append("option")
                .text(population)
                .property("value");
        });

        // Call the buildCharts function
        buildCharts(allPops[0]);
    });
};
// function when the subject id changes
function optionChanged(passedvalue) {

    buildCharts(passedvalue);

};

// Build the charts
function buildCharts(population) {

    // Fetch the json data
    d3.json(all_patient_info).then(allData => {

        // Console log the data
        console.log(allData);

        // Create a bar chart with the age brackets on the x-axis and the amount of patients for each
        // .map with create an array with every single "Age Bracket" value in the dataset
        let xValues = allData.map(function(data) {
            return data["Age Bracket"]
        });

        // Get the unique values from the Age Bracket
        let uniqueXValues = xValues.filter((x, i, a) => a.indexOf(x) == i);

        // Console log the Unique age bracket values array
        console.log(uniqueXValues);

        let patients = allData.filter(patient => patient.SpecPop == population);
        console.log('population',population);

        let x_years = allData[0].Year; // 2017
        let firstPatient = patients[0];
        console.log(firstPatient);



        
        // Create the bar chart
        let trace1 = [{
            x: uniqueXValues,
            y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
            type: "bar"
        }];

        // layout for bar chart
        let bar_layout = {
            title: 'Age vs No. of Events',
            height: 400,
            width: 600            
        };    

        // Render the plot to the div tag with id "bar1"
        Plotly.newPlot("bar1", trace1, bar_layout);
    });
};

// Call the init function to display the data and the plots to the page
init();
