var canvas = $("#gameCanvas").get(0);
var ctx = canvas.getContext("2d");

var secretWord = "";
var guessWord = "";

var remainingGuesses = 0;


function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(remainingGuesses === 5){
        ctx.beginPath();
        ctx.arc(100,75,50,0,2*Math.PI);
        ctx.stroke();
    }
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}


function makeGuess(letter) {

    if(secretWord.indexOf(letter) === -1){
        remainingGuesses--;
    } else{
        for(var i = 0; i < secretWord.length; i++){
            if(secretWord.charAt(i) == letter){
                guessWord = setCharAt(guessWord,i,secretWord.charAt(i));
            }
            $("#scoreBoard").html(guessWord);
        }

        if(guessWord === secretWord){
            $("#scoreBoard").html("You Win!!!");
        }
    }

    drawBoard();
    $("#remainingGuesses").html("Remaining Guesses: " + remainingGuesses);

}

$(document).ready(function () {

    $("#guessButton").click(function (e) {
        e.preventDefault();

        makeGuess($("#guessWord").val());

    });

    $("#submitButton").click(function (e) {
        e.preventDefault();

        remainingGuesses = 6;

        var wordLength = $("#wordLen").val();

        //var myurl = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&excludePartOfSpeech=family-name&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=" + wordLength + "&maxLength="+ wordLength + "&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
        var myurl = "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=family-name,abbreviation,given-name,suffix,idiom&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength="+ wordLength + "&maxLength=" + wordLength + "&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

        $.ajax({
            type: "GET",
            url : myurl,
            dataType : "json",
            success : function(parsed_json) {
                secretWord = parsed_json[0].word.toLowerCase();
                console.log(secretWord);

                guessWord = "";

                for(var i = 0; i < parseInt($("#wordLen").val()); i++){
                    guessWord = guessWord.concat('-');
                }
                $("#scoreBoard").html(guessWord);
            }
        });
        $("#remainingGuesses").html("Remaining Guesses: " + remainingGuesses);
        //var randWord = data.Word;
    });
});