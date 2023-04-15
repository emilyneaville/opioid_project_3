// URL const variables
const unique_populations = 'http://127.0.0.1:8000/api/v1.0/unique_populations';
const all_patient_info = 'http://127.0.0.1:8000/api/v1.0/all_patient_info';

function init(){ 

    // fetch the json data and console log it
    d3.json(unique_populations).then(allPops=> {

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

    });
    buildCharts();
};
// function when the subject id changes
function optionChanged(passedvalue) {

    buildCharts(passedvalue);
    mychart(passedvalue);

};

// Build the charts
function buildCharts(population) {

    // Fetch the json data
    d3.json(all_patient_info).then(allData=> {

        // Console log the data
        console.log('all data',allData);

        // Create a bar chart with the age brackets on the x-axis and the amount of patients for each
        // .map with create an array with every single "Age Bracket" value in the dataset
        let all_ages = allData.map(data=> {
            return data["Age Bracket"];
        });

        // Get the unique values from the Age Bracket
        let unique_ages = all_ages.filter((x, i, a) => a.indexOf(x) == i).sort();

        // Console log the Unique age bracket values array
        console.log('u-ages sorted', unique_ages);
        
        // student -yes count by year from 2017 to 2022
        let stu_17 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2017').length;
        let stu_18 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2018').length;
        let stu_19 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2019').length;
        let stu_20 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2020').length;
        let stu_21 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2021').length;  
        let stu_22 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2022').length;
        let stu_23 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2023').length;
        let stu_count_by_year= [stu_17, stu_18,stu_19,stu_20, stu_21,stu_22, stu_23];
        console.log('stu count',stu_count_by_year);

        let all_years = allData.map(d=> {
            return d["Year"];
        });

        // Get the unique values from the Age Bracket
        let unique_years = all_years.filter((x, i, a) => a.indexOf(x) == i);
        console.log('u-years',unique_years);

// *******************
        

        // console.log('yes',yes_students);
        let yes_veterans = allData.filter(take=>take.Veteran == 'Yes');
        let yes_homeless = allData.filter(take=>take.Homeless == 'Yes');

        let patients = allData.filter(patient => patient.Spec_Pop == population);
        console.log('population', patients);

        let x_years = allData[0].Year; // 2017
        let firstPatient = patients[0];
        console.log(firstPatient);

        // Create the bar chart
        let trace1 = [{
            x: unique_years.map(id=> `Year ${id}`),
            y: stu_count_by_year,
            orientation: 'v' //vertical
        }];

        // layout for bar chart
        let bar_layout = {
            title: 'Years vs. Yes-Student-Count',
            height: 400,
            width: 800            
        };    

        // Render the plot to the div tag with id "bar1"
        Plotly.newPlot("bar1", trace1, bar_layout);
    });
};

// Call the init function to display the data and the plots to the page
init();