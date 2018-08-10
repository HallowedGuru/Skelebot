const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);

var fs = require("fs");

client.on('message', message => {
	if (message.content.startsWith("!skel ")) {
		var command = message.content.substring(6).trim();
		if (command === "help") {
			var help_data = fs.readFileSync("help.txt").toString();
			message.channel.send(help_data);
		}
		else if (command === "units") {
			var units_data = fs.readFileSync("units.txt").toString();
			message.channel.send(units_data);
		}
		else if (command === "spook") {
			message.channel.send("https://www.youtube.com/watch?v=XTgFtxHhCQ0");
		}
		else if (command === "what's good?") {
			message.channel.send("https://www.youtube.com/watch?v=hod0WtYE4SA");
		}
		else if (command === "freak") {
			message.channel.send("https://www.youtube.com/watch?v=pdQiSGb4Luw");
		}
		else if (command.startsWith("random ")) {
			var values = command.substring(7).split(", ");
			message.channel.send("Generating a random number between " + values[0] + " and " + values[1] + "...");
			var randomResult = randomNumber(parseInt(values[0]), parseInt(values[1]));
			message.channel.send("Your random number is " + randomResult);
		}
		else if (command === "coinflip") {
			message.channel.send("Flipping a coin...");
			var coinResult = Math.round((Math.random()));
			if (coinResult == 0) {
				message.channel.send("Heads");
			}
			else {
				message.channel.send("Tails");
			}
		}
		else if (command.startsWith("pick ")) {
			var items = command.substring(5).split(", ");
			message.channel.send("Picking a random item from your list...");
			var itemIndex = Math.floor(Math.random() * items.length);
			var pickResult = items[itemIndex];
			message.channel.send("I pick " + pickResult);
		}
		else if (command.startsWith("convert ")) {
			var values = command.substring(8).split(" to ");
			var checked = checkConversionInput(values);
			message.channel.send("Converting " +  checked[0] + " " + checked[1].toLowerCase() + " to " + checked[2].toLowerCase() + "...");
			var converted = convert(checked[0], checked[1], checked[2]);
			message.channel.send(checked[0] + " " + checked[1].toLowerCase() + " is " + converted + " " + checked[2].toLowerCase());
		}
		else {
			message.channel.send("Sorry, I don't recognize that command");
		}
	}
});

function randomNumber(min, max) {
	var diff = max - min;
	var result = Math.floor((Math.random() * diff) + 1) + min;
	return result.toString();
}

function checkConversionInput(valuesToCheck) {
	if (valuesToCheck.length == 2) {
		if ((valuesToCheck[0].match(/^\d/) && valuesToCheck[0].charAt(valuesToCheck[0].length-1).match(/\w/)) && 
			(valuesToCheck[1].charAt(valuesToCheck[1].length-1).match(/\w/))) {
			var fromUnit = checkUnit(valuesToCheck[0].replace(/\d+/g, '').replace(/\s+/g, '').toUpperCase());
			var toUnit = checkUnit(valuesToCheck[1].toUpperCase());
			var value  = valuesToCheck[0].replace(/\D+/g, '').replace(/\s+/g, '');
			var set = [value, fromUnit, toUnit];
			return set;
		}
		else {
			return "F";
		}
	}
	else {
		return "V";
	}
}

function checkUnit(unitToCheck) {
	var validUnitTypes = new Map();
	validUnitTypes.set("METERS", ["M", "METER", "METERS"]);
	validUnitTypes.set("MILLIMETERS", ["MM", "MILLIMETER", "MILLIMETERS"]);
	validUnitTypes.set("CENTIMETERS", ["CM", "CENTIMETER", "CENTIMETERS"]);
	validUnitTypes.set("KILOMETERS", ["KM", "KILOMETER", "KILOMETERS"]);
	validUnitTypes.set("LITERS", ["L", "LITER", "LITERS"]);
	validUnitTypes.set("MILLILITERS", ["ML", "MILLILITER", "MILLILITERS"]);
	validUnitTypes.set("INCHES", ["IN", "INCH", "INCHES"]);
	validUnitTypes.set("FEET", ["FT", "FOOT", "FEET"]);
	validUnitTypes.set("MILES", ["MI", "MILE", "MILES"]);
	validUnitTypes.set("GALLONS", ["G", "GALLON", "GALLONS"]);
	validUnitTypes.set("FAHRENHEIT", ["F", "FAHRENHEIT"]);
	validUnitTypes.set("CELCIUS", ["C", "CELCIUS", "CENTIGRADE"]);
	validUnitTypes.set("KELVIN", ["K", "KELVIN"]);
	validUnitTypes.set("KILOGRAMS", ["KG", "KILOGRAM", "KILOGRAMS"]);
	validUnitTypes.set("POUNDS", ["LB", "LBS", "POUND", "POUNDS"]);
	validUnitTypes.set("KILOMETERS PER HOUR", ["KM/H", "KMPH", "KILOMETER PER HOUR", "KILOMETERS PER HOUR"]);
	validUnitTypes.set("MILES PER HOUR", ["MI/H", "MPH", "MIPH", "MILE PER HOUR", "MILES PER HOUR"]);
	validUnitTypes.set("KNOTS", ["KN", "KNOT", "KNOTS"]);
	
	var valid = false;
	for (var unitType of validUnitTypes.values()) {
		console.log(unitType);
		for (const unit of unitType) {
			console.log("Unit given: " + unitToCheck + ", Unit type checked: "  + unit);
			if (unitToCheck === unit) {
				valid = true;
				console.log("Unit type: " + getKeyByValue(validUnitTypes, unitType));
				return getKeyByValue(validUnitTypes, unitType);
			}
		}
		console.log("----------------------------");
	}
	if (valid = false) {
		return "Unit not recognized";
	}
}

function convert(value, fromUnit, toUnit) {
	var valid = true;
	var converted = value;
	switch(fromUnit) {
		case "METERS":
			switch (toUnit) {
				case "MILLIMETERS":
					converted *= 1000;
					break;
				case "CENTIMETERS":
					converted *= 100;
					break;
				case "KILOMETERS":
					converted *= .001;
					break;
				case "INCHES":
					converted *= 39.37007874;
					break;
				case "FEET":
					converted *= 3.2808;
					break;
				case "MILES":
					converted *= 0.000621371;
					break;
				default:
					valid = false;

			}
			break;
		case "MILLIMETERS":
			switch (toUnit) {
				case "METERS":
					converted *= 0.001;
					break;
				case "CENTIMETERS":
					converted *= 0.01;
					break;
				case "KILOMETERS":
					converted *= 0.000001;
					break;
				case "INCHES":
					converted *= 0.03937007874;
					break;
				case "FEET":
					converted *= 0.0032808;
					break;
				case "MILES":
					converted *= 0.0000000621371;
					break;
			}
			break;
		case "CENTIMETERS":
			switch (toUnit) {
				case "METERS":
					converted *= 0.01;
					break;
				case "MILLIMETERS":
					converted *= 10;
					break;
				case "KILOMETERS":
					converted *= 0.00001;
					break;
				case "INCHES":
					converted *= 0.393701;
					break;
				case "FEET":
					converted *= 0.032808;
					break;
				case "MILES":
					converted *= 0.000000621371;
					break;
			}
			break;
		case "KILOMETERS":
			switch(toUnit) {
				case "METERS":
					converted *= 1000;
					break;
				case "MILLIMETERS":
					converted *= 1000000;
					break;
				case "INCHES":
					converted *= 37370.1;
					break;
				case "FEET":
					converted *= 3280.84;
					break;
				case "MILES":
					converted *= 0.621371;
					break;
			}
			break;
		case "INCHES":
			switch(toUnit) {
				case "METERS":
					converted *= 0.0254;
					break;
				case "MILLIMETERS":
					converted *= 25.4;
					break;
				case "CENTIMETERS":
					converted *= 2.54;
					break;
				case "KILOMETERS":
					converted *= 0.0000254;
					break;
				case "FEET":
					converted *= 0.0833333;
					break;
				case "MILES":
					converted *= 0.0000157828;
					break;
			}
			break;
		case "FEET":
			switch(toUnit) {
				case "METERS":
					converted *= 0.3048;
					break;
				case "MILLIMETERS":
					converted *= 304.8;
					break;
				case "CENTIMETERS":
					converted *= 30.48;
					break;
				case "KILOMETERS":
					converted *= 0.0003048;
					break;
				case "INCHES":
					converted *= 12;
					break;
				case "MILES":
					converted *= 0.000189394;
					break;
			}
			break;
		case "MILES":
			switch(toUnit) {
				case "METERS":
					converted *= 1609.34;
					break;
				case "MILLIMETERS":
					converted *= 1609340;
					break;
				case "CENTIMETERS":
					converted *= 160934
					break;
				case "KILOMETERS":
					converted *= 1.60934;
					break;
				case "INCHES":
					converted *= 63360;
					break;
				case "FEET":
					converted *= 5280;
					break;
			}
			break;
		case "FAHRENHEIT":
			switch(toUnit) {
				case "CELCIUS":
					converted = (converted - 32)/1.8;
					break;
				case "KELVIN":
					converted = (converted + 459.67)*(5/9);
					break;
			}
			break;
		case "CELCIUS":
			switch(toUnit) {
				case "FAHRENHEIT":
					converted = (converted * 1.8) + 32;
					break;
				case "KELVIN":
					converted += 273.15;
					break;
			}
			break;
		case "KELVIN":
			switch(toUnit) {
				case "FAHRENHEIT":
					converted = (converted * 5/9) - 459.67;
					break;
				case "CELCIUS":
					converted -= 273.15;
					break;
			}
			break;
		case "KILOGRAMS":
			switch(toUnit) {
				case "POUNDS":
					converted *= 2.20462;
					break;
			}
			break;
		case "POUNDS":
			switch(toUnit) {
				case "KILOGRAMS":
					converted *= 0.453592;
					break;
			}
			break;
		case "KILOMETES PER HOUR":
			switch(toUnit) {
				case "MILES PER HOUR":
					converted *= 0.621371;
					break;
				case "KNOTS":
					converted *= 0.539957;
					break;
			}
			break;
		case "MILES PER HOUR":
			switch(toUnit) {
				case "KILOMETERS PER HOUR":
					converted *= 1.60934;
					break;
				case "KNOTS":
					converted *= 0.868976;
					break;
			}
			break;
		case "KNOTS":
			switch(toUnit) {
				case "KILOMETERS PER HOUR":
					converted *= 1.852;
					break;
				case "MILES PER HOUR":
					converted *= 1.15078;
					break;
			}
			break;
	}
	return converted;
}

function getKeyByValue(object, value) {
	for (var key of object.keys()) {
		if (object.get(key) === value) {
			return key;
		}
	}
}