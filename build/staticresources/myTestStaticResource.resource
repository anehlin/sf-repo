var add = function(a,b) {
	return a+b;
};

var stooge = {
	"firstname" : "Nisse",
	"lastname" : "Nilsson"
};

stooge.nickname = "asa-nisse";
var x = stooge;
x.nickname = 'Baloo';
document.writeln('x.nickname : ' + x.nickname);

document.writeln('stooge["firstname"] : ' + stooge["firstname"]);

var flight = {
	airline: "Iceland",
	number: 888,
	departure: {
		IATA: "SYD",
		time: "2014-09-09 03:03",
		city: "Sydney"
	}, 
	arrival: {
		IATA: "LAX",
		time: "2014-09-19 03:03",
		city: "Oslo"
	}
};

document.writeln('flight.departure.IATA : ' + flight.departure.IATA);
document.writeln('flight.number : ' + flight.number);