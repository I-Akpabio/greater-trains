(function () {

var fix = (t) => {
	if(t >= 24) return "00";
	if(String(t).length < 2) {
		return "0" + t+":00";
	}else{
		return  t + ":00";
	}
};

var roundNumber = (num, scale) => {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}

var getPrice = () => {
	var p = roundNumber(Math.random()*100, 2);
	do {
		p = roundNumber(Math.random()*100, 2);

	}while(p < 30);
	return p;
};

var getTrains = (f, t, dt) => {
	var res = [];
	var time = 0;
	for(var i = 0; i < 6; i++) {
		res.push({
			date: dt.format("YYYY-MM-DD"),
			end: fix(time+2),
			from: f,
			platform: "Platform " + Math.round(Math.random()*6),
			price: getPrice(),
			start: fix(time),
			time: "2h 00m",
			to: t
		}	
		);
		if(i%3===0) {
			var p = getPrice();
			res.push({date: dt.format("YYYY-MM-DD"),end: fix(time+2),from: f,platform: "Platform " + Math.round(Math.random()*6),
				price: p,start: fix(time),time: "2h 00m",to: t});
			res.push({date: dt.format("YYYY-MM-DD"),end: fix(time+2),from: f,platform: "Platform " + Math.round(Math.random()*6),
				price: (p - 10),start: fix(time),time: "2h 00m",to: t});
		}
		time += 4;
	}

	return res;
}

var users = [];
var dt = moment().startOf('day');
for(var i = 0; i <= 3; i++) {
	users = users.concat(getTrains("Norwich", "London Victoria", dt));
	users = users.concat(getTrains("London Victoria", "Norwich", dt));
	dt = dt.add(1, "days");
}



Loc.set('trains', users);
})();

