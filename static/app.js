// URL const variables
const unique_populations = 'http://127.0.0.1:8000/api/v1.0/unique_populations';
const all_patient_info = 'http://127.0.0.1:8000/api/v1.0/all_patient_info';

function init(){ 

    // fetch the json data and console log it
    d3.json(unique_populations).then(allPops=> {

        // Select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        let choice= dropdownMenu.property('value');

        // Append each unique special population to the dropdown menu
        allPops.forEach((population) => {
            dropdownMenu
                .append("option")
                .text(population)
                .choice;
        });

        if(choice === 'All'){
            bar_chart(allPops[0]);
        }
        if(choice === 'ASU Student'){
            scatter_chart(allPops[4]);
        }
        


    }); 
};
// function when the subject id changes
function optionChanged(passedvalue) {

    scatter_chart(passedvalue);
    bar_chart(passedvalue);

};

// build scatter chart
function scatter_chart() {

    // Fetch the json data
    d3.json(all_patient_info).then(allData=> {

        // Console log the data
        console.log('all data', allData);
        
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

        // Create the bar chart
        let trace1 = [{
            x: unique_years.map(id=> `Year ${id}`),
            y: stu_count_by_year,
            orientation: 'v'
        }];

        // layout for bar chart
        let layout1 = {
            title: 'Years vs. Yes-Student-Count',
            height: 400,
            width: 800            
        };    

        // Render the plot to the div tag with id "bar1"
        Plotly.newPlot("bar1", trace1, layout1);
    });
};

function bar_chart() {
    // Fetch the json data
    d3.json(all_patient_info).then(allData=> {
        // Console log the data
        console.log(allData);
        // Create a bar chart with the age brackets on the x-axis and the amount of patients for each
        // .map with create an array with every single "Age Bracket" value in the dataset
        let ageBrackets = allData.map(function(data) {
            return data["Age Bracket"]
        });
        // Get the unique values from the Age Bracket
        let uniqueAges = ageBrackets.filter((x, i, a) => a.indexOf(x) == i).sort();
        // Console log the Unique age bracket values array
        console.log(uniqueAges);
        
        // Create an array with the number of patients for each age bracket
        let age0to4 = allData.filter(take=>take["Age Bracket"] === "0 to 4").length;
        let age5to9 = allData.filter(take=>take["Age Bracket"] === "5 to 9").length;
        let age10to14 = allData.filter(take=>take["Age Bracket"] === "10 to 14").length;
        let age15to19 = allData.filter(take=>take["Age Bracket"] === "15 to 19").length;
        let age20to24 = allData.filter(take=>take["Age Bracket"] === "20 to 24").length;
        let age25to29 = allData.filter(take=>take["Age Bracket"] === "25 to 29").length;
        let age30to34 = allData.filter(take=>take["Age Bracket"] === "30 to 34").length;
        let age35to39 = allData.filter(take=>take["Age Bracket"] === "35 to 39").length;
        let age40to44 = allData.filter(take=>take["Age Bracket"] === "40 to 44").length;
        let age45to49 = allData.filter(take=>take["Age Bracket"] === "45 to 49").length;
        let age50to54 = allData.filter(take=>take["Age Bracket"] === "50 to 54").length;
        let age55to59 = allData.filter(take=>take["Age Bracket"] === "55 to 59").length;
        let age60to64 = allData.filter(take=>take["Age Bracket"] === "60 to 64").length;
        let age65to69 = allData.filter(take=>take["Age Bracket"] === "65 to 69").length;
        let age70to74 = allData.filter(take=>take["Age Bracket"] === "70 to 74").length;
        let age75to79 = allData.filter(take=>take["Age Bracket"] === "75 to 79").length;
        let age80to84 = allData.filter(take=>take["Age Bracket"] === "80 to 84").length;
        let age85to89 = allData.filter(take=>take["Age Bracket"] === "85 to 89").length;
        let age90to94 = allData.filter(take=>take["Age Bracket"] === "90 to 94").length;
        let age95to99 = allData.filter(take=>take["Age Bracket"] === "95 to 99").length;
        let ageUnknown = allData.filter(take=>take["Age Bracket"] === "Unknown").length;
        let countByAge = [age0to4, age5to9, age10to14, age15to19, age20to24, age25to29, age30to34, age35to39, age40to44, age45to49, age50to54, age55to59, age60to64, age65to69, age70to74, age75to79, age80to84, age85to89, age90to94, age95to99, ageUnknown];
        console.log(countByAge);
        // Create the bar chart
        let trace2 = [{
            x: uniqueAges,
            y: countByAge,
            type: "bar"
        }];
        // Define the plot layout
        let layout2 = {
            title: "Number of Patients by Age Bracket",
            height: 400,
            width: 800
        };
        // Render the plot to the div tag with id "bar1"
        Plotly.newPlot("bar2", trace2, layout2);
        
    });
};




// function scatter_chart(students) {

//     // Fetch the json data
//     d3.json(all_patient_info).then(allData=> {

//         // Console log the data
//         console.log('all data', allData);

//         // Create a bar chart with the age brackets on the x-axis and the amount of patients for each
//         // .map with create an array with every single "Age Bracket" value in the dataset
//         let all_ages = allData.map(data=> {
//             return data["Age Bracket"];
//         });

//         // Get the unique values from the Age Bracket
//         let unique_ages = all_ages.filter((x, i, a) => a.indexOf(x) == i).sort();

//         // Console log the Unique age bracket values array
//         console.log('u-ages sorted', unique_ages);
        
//         // student -yes count by year from 2017 to 2022
//         let stu_17 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2017').length;
//         let stu_18 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2018').length;
//         let stu_19 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2019').length;
//         let stu_20 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2020').length;
//         let stu_21 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2021').length;  
//         let stu_22 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2022').length;
//         let stu_23 = allData.filter(take=>take.Student == 'Yes' && take.Year == '2023').length;
//         let stu_count_by_year= [stu_17, stu_18,stu_19,stu_20, stu_21,stu_22, stu_23];
//         console.log('stu count',stu_count_by_year);

//         let all_years = allData.map(d=> {
//             return d["Year"];
//         });

//         // Get the unique values from the Age Bracket
//         let unique_years = all_years.filter((x, i, a) => a.indexOf(x) == i);
//         console.log('u-years',unique_years);

// // *******************
        

//         // console.log('yes',yes_students);
//         let yes_veterans = allData.filter(take=>take.Veteran == 'Yes');
//         let yes_homeless = allData.filter(take=>take.Homeless == 'Yes');

//         let patients = allData.filter(patient => patient.Spec_Pop == population);
//         console.log('population', patients);

//         let x_years = allData[0].Year; // 2017
//         let firstPatient = patients[0];
//         console.log(firstPatient);

//         // Create the bar chart
//         let trace1 = [{
//             x: unique_years.map(id=> `Year ${id}`),
//             y: stu_count_by_year,
//             orientation: 'v' //vertical
//         }];

//         // layout for bar chart
//         let bar_layout = {
//             title: 'Years vs. Yes-Student-Count',
//             height: 400,
//             width: 800            
//         };    

//         // Render the plot to the div tag with id "bar1"
//         Plotly.newPlot("bar1", trace1, bar_layout);
//     });
// };


// Call the init function to display the data and the plots to the page
init();