const request = require('request');

$(".fa-plus").click(function(){
    $(".in-new").fadeToggle();
});

$("ul").on("click", "span.delete", function(event){
    $(this).parent().fadeOut(500,function(){
	$(this).remove();
    });
    event.stopPropagation();
});


$(".in-new").keypress(function(event){
    if(event.which === 13){
	//grabbing new todo text from input
	var inputCur = $(this).val().toLowerCase();
	addCur(inputCur);
	$(this).val("");
    }
});

function addCur(newCur){
    if (ids.includes(newCur)) {
	currAPI.forEach(function(item, index){
	    if ( item["id"] == newCur ){
		//create a new li and add to ul
		$("ul").append('<li><span class="delete"><i class="fa fa-trash"></i></span>' + item["name"] + ' - $<span class="price">' + item["price_usd"] + '</span> <input class="in-amount right" type="text" value="0" onclick="this.select()"></li>');
	    }
	});
    } else {
	alert("Enter valid a cryptocurrency ID.");
    }
    $(".in-amount").keypress(calculate);
}


function calculate(){
    sum = 0;
    $("li").each(function(index){
	var price = Number($(this).children(".price").text());
	var units = Number($(this).children("input").val());
	sum += price*units;
    });
    $("#result").text(Math.round(sum*100)/100);
}

function init(){
    addCur("bitcoin");
    addCur("litecoin");
    addCur("monero");
    calculate();
}

currAPI = [];
ids = [];

request("https://api.coinmarketcap.com/v1/ticker/",function (error, response, body){
    if (!error && response.statusCode == 200 ){
	currAPI = JSON.parse(body);
	currAPI.forEach(function(item, index){
	    ids.push(item['id']);
	});
	init();
    }
});
