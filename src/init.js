/**
 * Created by Shweta on 8/26/2015.
 */

if(!this.d3_Vizzies){
    this.d3_Vizzies = {};
}
/**this function initializes the d3 visualizations*/
(function(){

    var hmCon = document.getElementById("heatMap");
    var colNames =[];
    var myData = [];

    //This process will vary for different data formats
    //For example here i am processing it for a correlation matrix
    //process is according to your data
    //GOAL : to get two objects (1) the data  (2) the column Names
    d3.csv("lib/matrix.csv", function(results){
        myData = results;
        colNames = Object.keys(results[0]);//retrieving this once

        var heatMapConfig = {
            container : hmCon,
            matrix_data : myData,
            labels : colNames
        };
        create_heatMap(heatMapConfig);
    });


    function create_heatMap(config){

        var hMap = new window.d3_Vizzies.heatMap();//call constructor
        hMap.initialize_heatMap(config);//initialize it

    }



})();