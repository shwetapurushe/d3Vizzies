/**
 * Created by Shweta on 8/26/2015.
 */

if(!this.d3_Vizzies){
    this.d3_Vizzies = {};
}
var tt;
/**this function initializes the d3 visualizations*/
(function(){

    var hmCon = document.getElementById("hMContainer");

    //This process will vary for different data formats
    //For example here i am processing it for a correlation matrix
    //process is according to your data to get two objects (1) the data (2) the column Names
    d3.csv("lib/matrix.csv", function(results){
        console.log("results", results);
        tt = results;
    });
    var heatMapConfig = {
        container : hmCon
    };

    var hMap = new window.d3_Vizzies.heatMap();


})();