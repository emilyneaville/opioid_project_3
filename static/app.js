function init(){ 

    // fetch the json data and console log it
    d3.json('http://127.0.0.1:8000/api/v1.0/unique_populations').then(function(allPops){
        
        // display available data to work with
        console.log(allPops);

        // Select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        
        // Console log which dataset is selected
        let dataset = dropdownMenu.property("value");
        console.log(dataset)

        // Append each unique special population to the dropdown menu
        allPops.forEach((population) => {
            dropdownMenu
                .append("option")
                .text(population)
                .property("value");

        });
    });
};

// Build the charts
function buildCharts(population) {

    // Fetch the json data
    d3.json('http://127.0.0.1:8000/api/v1.0/all_patient_info').then(function(allData) {

        // Filter the data for the selected special population
        let patients = allData.filter(patient => patient.Spec_Pop == population);

        // Create a variable that holds the first patient in the array
        let firstPatient = patients[0];

        // HOW TO MAKE X AND Y VALUES FOR THE BAR CHART???????

        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar1", trace1, barLayout);
    });
};

// Call the init function to display the data and the plots to the page
init();
