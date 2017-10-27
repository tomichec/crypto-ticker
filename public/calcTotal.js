function calc(){

var Ncur = document.getElementById("N");
var N = Number(Ncur.textContent);

var sum = 0;
for (var i=0; i< N; i++){
    var price = document.getElementById("price-" + i);
    var units = document.getElementById("in-" + i);
    var perunit = Number(price.textContent);
    var numunits = Number(units.value);
    sum += perunit*numunits;
}

var total = document.getElementById("total");
total.textContent = "" + sum;

console.log("The total sum of the assets is: $" + sum);
}

calc()
