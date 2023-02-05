//Name: Lee Hong Yi
//Admin Number: 2223010
//Class: DAAA/FT/1B/05

var commonFunction = {
    multiStringCapitalize: (inputMultiString) => {
        function stringCapitalize(inputString){
            var lowerString = inputString.toLowerCase().slice(1)
            var firstLetter = inputString.charAt(0)
            var upperString = firstLetter.toUpperCase()
            return upperString + lowerString
        }
        
    var splitString = inputMultiString.split(" ")
    var properStringArr = new Array 
    var properString = ""
    for (i = 0 ; i < splitString.length ; i++){
        properStringArr[i] = stringCapitalize(splitString[i])
        properString += properStringArr[i] + " "
    }
    properString = properString.slice(0, properString.length - 1)
    return properString
    },

    hourCalculator: (minString) => {
        noHours = Math.floor(minString / 60)
        noMinutes = (minString - (noHours * 60))
        output = ''
        if (minString < 60) {
            output = `${noMinutes} minutes`
        } else if (noHours > 0 && noHours < 2){
            output = `${noHours} hour, ${noMinutes} minutes`
        } else {
            output = `${noHours} hours, ${noMinutes} minutes`
        }
        return output
    }
}



