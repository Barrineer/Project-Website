//Chess pieces are indicated with ascii 9812 - 9823
//Card suites are indicated with ascii 9824 - 9831
//Straight up PLAYING CARDS ascii 127136 - 127221
window.onload = () => {
    var joker = "127167";
    var back = "127136";
    var spades = ["127137","127138","127139","127140","127141","127142","127143","127144","127145","127146","127147","127149","127150",];
    var hearts = ["127153","127154","127155","127156","127157","127158","127159","127160","127161","127162","127163","127165","127166",];
    var diamonds = ["127169","127170","127171","127172","127173","127174","127175","127176","127177","127178","127179","127181","127182",];
    var clubs = ["127185","127186","127187","127188","127189","127190","127191","127192","127193","127194","127195","127197","127198",];
    var suits = [spades,hearts,diamonds,clubs];


    //IMPORTANT: May have to change how this function pulls values from an array in the future. If I want to create an actual game where cards are removed from the deck, will need
    // to make a copy of the inital array and remove cards as they are drawn.
    /**
     * Draws a random card using the Math.random function using an x and y value in an array matrix.
     * @returns A card value in ascii decimal
     */
    function draw(){
        var x = Math.floor(Math.random() * 13); //We're using 0 indexing arrays so this is perfect at 13 (noninclusive)
        var y = Math.floor(Math.random() * 4);

        var classes = "card";

        var card_data = {
            card: suits[y][x],
            classes: (y == 1 || y == 2) ? classes += " card-red": classes="card",
        }

        return card_data;
    }

    /* HTML Linking */

    var draw_button = document.getElementById("draw-card");
    var rand_card = document.getElementById("random-card");

    draw_button.onclick = () =>{
        var card_data = draw();
        console.log(`You drew a card`);
        rand_card.innerHTML = `&#${card_data.card}`;
        rand_card.className = card_data.classes;
    }

}