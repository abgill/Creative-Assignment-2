
var secretWord = "";
var guessWord = "";

var remainingGuesses = 0;


function drawBoard() {

    if(remainingGuesses === 7){
        $("#hangmanPic").attr("src","Hangman_8.jpg");
    }
    else if(remainingGuesses === 6){
        $("#hangmanPic").attr("src","Hangman_7.jpg");
    }
    else if(remainingGuesses === 5){
        $("#hangmanPic").attr("src","Hangman_6.jpg");
    }else if(remainingGuesses === 4){
        $("#hangmanPic").attr("src","Hangman_5.jpg");
    }else if(remainingGuesses === 3){
        $("#hangmanPic").attr("src","Hangman_4.jpg");
    }else if(remainingGuesses === 2){
        $("#hangmanPic").attr("src","Hangman_3.jpg");
    }else if(remainingGuesses === 1){
        $("#hangmanPic").attr("src","Hangman_2.jpg");
    }else if(remainingGuesses === 0){
        $("#hangmanPic").attr("src","Hangman_1.jpg");
    }
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}


function makeGuess(letter) {

    if(secretWord.indexOf(letter) === -1 && remainingGuesses >0){
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
        } else if(remainingGuesses <= 0){
            $("#scoreBoard").html("You Lose!!!");
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

        remainingGuesses = 7;

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
        drawBoard();
        //var randWord = data.Word;
    });
});