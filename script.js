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

        var myurl = "http://setgetgo.com/randomword/get.php?len=" + $("#wordLen").val();
        $.ajax({
            type: "GET",
            url : myurl,
            dataType : "jsonp",
            success : function(parsed_json) {
                secretWord = parsed_json.Word.toLowerCase();
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