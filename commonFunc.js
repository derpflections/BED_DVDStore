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
    }
}