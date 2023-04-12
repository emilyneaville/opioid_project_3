 url = 'http://127.0.0.1:8000/api/v1.0/all_patient_info';

function init(){ 

    // fetch the json data and console log it
    d3.json(url).then(function(alldata){
        
        // display available data to work with
        console.log(alldata);

        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");

        // getting all names from json
        let spec_pop = alldata[0].Spec_Pop;

        console.log(spec_pop);
        console.log(alldata[0]);

        // getting dropdown 
        alldata.forEach(function(id){
            dropdownMenu.append("option").text(id).property("value");
        });
       
        // pass first subject and call the functions
        chartvalues(spec_pop);
        metadata(spec_pop);
    });
};

// function when the subject id changes
function optionChanged(passedvalue) {

    chartvalues(passedvalue);
    metadata(passedvalue);
};
// function to 
function chartvalues(passedvalue){

    // json data
    d3.json(url).then(function(alldata){

        // retrieve all samples data
        let samples = alldata.samples;

        // filter for each option/subject selected
        let id = samples.filter(take=>take.id == passedvalue);

        // get data for all charts
        let sample_values = id[0].sample_values; 
        let otu_ids = id[0].otu_ids; 
        let otu_labels = id[0].otu_labels; 

        // call function
        charts(sample_values, otu_ids, otu_labels);

    });
};
// function that displays the bar and bubble charts
function charts(sample_values, otu_ids, otu_labels){

    // json data
    d3.json(url).then(function(alldata){
                
        // data for bar chart
        let bar_data = [{
            type: 'bar',
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
            text: otu_labels,
            orientation: 'h'
        }];

        // data for bubble chart
        let bubble_data = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker:{
                color: otu_ids,
                colorscale: 'Earth',
                size: sample_values
            }
        }];
    
        // layout for bar chart
        let bar_layout = {
            title: 'Bar Chart',
            height: 500,
            width: 400            
        };    

        // layout for bubble chart
        let bubble_layout = {
            title: 'Bubble Chart',
            height: 550,
            width: 1000 
        };

        // display bar chart
        Plotly.newPlot('bar', bar_data, bar_layout);

        // display bubble chart
        Plotly.newPlot('bubble', bubble_data, bubble_layout);

    });
};
function metadata(passedvalue){

    // json data
    d3.json(url).then(function(alldata){

        // retrieve all samples data
        let samples = alldata.metadata;

        // filter data from metadata
        let id = samples.filter(take=>take.id == passedvalue);

        let sample_metadata = d3.select('#sample-metadata').html('');

        // using array method to iterate through the values
        Object.entries(id[0]).forEach(([key, value]) => {
            
            // display information in demographic info chart/table
            sample_metadata.append("h5").text(`${key}: ${value}`);
        });
    });
};
init();

// // API call
// d3.json('http://127.0.0.1:8000').then(function(data){
//     console.log(data);
// })
