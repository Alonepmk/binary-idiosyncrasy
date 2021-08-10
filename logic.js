//import data from './words_dictionary.json';

let alphabets = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26
};


function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

console.log('what the fuck is wrong')

loadJSON('words_dictionary.json', (data) => {
    let tempJson = {};
    let tempStr = "{ \n";
    let json = data[0];
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            //console.log(key + " " + json[key])
            if (key.length == 26) {
                tempStr = tempStr + '"' + key + '":' + json[key] + ",\n";
            }
        }
        //console.log(tempStr);
    }

    // tempStr = tempStr.substring(0, tempStr.length - 2) + "\n }";
    // tempJson = JSON.parse(tempStr);

    // console.log(tempJson);
    // saveTextAsFile(tempStr);
}, (xhr) => { console.error(xhr); });

let convertText = (inputVal) => {
    if (inputVal != "") {
        axios.get('http://localhost:3000/api/lineBreak').then(function (response) {
            //console.log(response);
        }).catch(function (error) {
            // console.log(error);
        }).then(function () {
            // always executed
        });
    }

    let str = (inputVal.toLowerCase()).trim();
    let strArr = [...str];
    let resultArr = [];
    strArr.forEach(c => {
        if ((c == "a") || (c == "c") || (c == "e") || (c == "g") || (c == "i") || (c == "k") || (c == "m") || (c == "n") ||
            (c == "p") || (c == "r") || (c == "t") || (c == "v") || (c == "x") || (c == "z")) resultArr.push(1);
        else if ((c == "b") || (c == "d") || (c == "f") || (c == "h") || (c == "j") || (c == "l") || (c == "o") || (c == "q") ||
            (c == "s") || (c == "u") || (c == "w") || (c == "y")) resultArr.push(0);
        else if (c == " ") resultArr.push(" ");
        else resultArr.push("*");
    });
    document.getElementById("outputTextArea").value = resultArr.join("");

};

let guessTheWord = (inputVal) => {
    var div = document.getElementById("poss-combi");
    div.innerHTML = " ";
    let str = (inputVal.toLowerCase()).trim();
    let count = str.length;
    console.log(str);
    console.log(str.length);
    loadJSON('./json/' + count + '.json', (data) => {
        let json = data[0];
        let tempMatch = [];
        let tempStrGuess = "";
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                let valueArr = [...key];
                valueArr.forEach(c => {
                    if ((c == "a") || (c == "c") || (c == "e") || (c == "g") || (c == "i") || (c == "k") || (c == "m") || (c == "n") || (c == "p") || (c == "r") || (c == "t") || (c == "v") || (c == "x") || (c == "z")) { tempStrGuess = tempStrGuess + "1"; }
                    if ((c == "b") || (c == "d") || (c == "f") || (c == "h") || (c == "j") || (c == "l") || (c == "o") || (c == "q") || (c == "s") || (c == "u") || (c == "w") || (c == "y")) { tempStrGuess = tempStrGuess + "0"; }

                });
            }
            //console.log("temp guess : " + tempStrGuess);
            //console.log("The str " + str);
            if (str == tempStrGuess) tempMatch.push(key);
            tempStrGuess = "";
            //console.log(tempStr);
        }
        console.log(tempMatch);
        generate_table(tempMatch);
        // let count = 0;
        // tempMatch.forEach(val => {
        //     console.log(val);
        //     if (count == 11) {
        //         div.innerHTML += "<br /><br/>";
        //         count = 0;
        //     }
        //     div.innerHTML += val + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        //     count++;
        // });

    }, (xhr) => { console.error(xhr); });
}
function saveTextAsFile(data) {
    var textToWrite = data;
    var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    var fileNameToSaveAs = "26.txt";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function generate_table(data) {
    // get the reference for the body
    var body = document.getElementById("poss-combi");

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var loopLength;
    var count = 0;

    if (data.length / 10 == 0) loopLength = data.length;
    else loopLength = Math.floor(data.length / 10) + 1;

    // creating all cells
    for (var i = 0; i < loopLength; i++) {
        // creates a table row
        var row = document.createElement("tr");


        for (var j = 0; j < 10; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            var cellText = document.createTextNode(data[count]);
            cell.appendChild(cellText);
            row.appendChild(cell);
            if (count < data.length - 1) count++;
            else break;
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    //tbl.setAttribute("border", "2");
}


const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(textarea);
};

const clearText = () => document.getElementById('inputTextArea').value = '';