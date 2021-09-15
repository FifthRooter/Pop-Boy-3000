export default function convertUnit(text) {
    text = text.trim()
    if (text[text.length-1] !== /^[a-zA-Z]+$/) {
        return false
    }
    for (let i=0; i<text.length; i++) {
        
    }
}

// 1) check if last element of the string is a non-number (can be a letter or a "." or a "°"): if it is, continue with following steps, otherwise don't return false
// 2) iterate through the string element by element using regex to check if it's a number
// 3) once regex detects a non-number, slice from 0 to the index before the first non-number, make it into var
// 4) use regex to detect if each element is a non-number, otherwise return false

// Alternative and more simplistic approach is to follow steps 1-3, then slice the rest of the string, lowercase it, remove degree symbol or period, and run it through the switch cases