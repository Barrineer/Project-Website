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
    var deck;


    //IMPORTANT: May have to change how this function pulls values from an array in the future. If I want to create an actual game where cards are removed from the deck, will need
    // to make a copy of the inital array and remove cards as they are drawn.
    /**
     * Draws a random card using the Math.random function using an x and y value in an array matrix.
     * @returns A card value in ascii decimal
     */
    function draw_random(){
        var x = Math.floor(Math.random() * 13); //We're using 0 indexing arrays so this is perfect at 13 (noninclusive)
        var y = Math.floor(Math.random() * 4);

        var classes = "card";

        var card_data = {
            card: suits[y][x],
            classes: (y == 1 || y == 2) ? classes += " card-red": classes="card",
        }

        return card_data;
    }

    /**
     * Randomizes the order of 52 cards per deck and jokers (if defined)
     * @param {number} [num_deck=1] define how many decks will be used (default 1)
     * @param {number} [is_joker=0] define how many jokers should be in the deck (default 0)
     * @returns An array of 52 cards
     */
    function createDeck(num_deck=1,is_joker=0){
        var deck = [];

        for(var i = 0; i < num_deck;i++){
            deck = deck.concat(spades,hearts,diamonds,clubs);
        }

        for(var i = 0; i < is_joker;i++){
            deck.push(joker);
        }

        for(var i = deck.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i+1));
            var temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
        console.log(deck)
        return deck;
    }

    /**
     * Draws a random card from the deck. Card drawn is removed from the deck.
     * @param {Array} deck An array of cards created using the createDeck() function
     * @param {number} [number=1] The number of cards to be drawn from the deck. 
     * @returns A single card, an array of cards if number > 1, -1 if no cards can be drawn.
     */
    function draw(deck,number=1){
        var cards = [];
        if(deck.length > 0){
            var classes = "card";
            number = (deck.length < number) ? deck.length:number;

            for(var i = 0;i < number;i++){
                var size = deck.length;
                var rand_index = Math.floor(Math.random() * size);
                var card_data = {
                    card: deck[rand_index],
                    classes: ((parseInt(deck[rand_index]) > 127153 && parseInt(deck[rand_index]) < 127166)
                    ||(parseInt(deck[rand_index]) > 127169 && parseInt(deck[rand_index]) < 127182)) ? classes += " card-red": classes="card",
                };
                cards.push(card_data);

                deck.splice(rand_index,1);
            }
        } else {
            cards = -1;
        }
        return cards;
    }

    /* HTML Linking */

    var deck = createDeck();
    var hand = document.getElementById("hand");
    var draw_multiple = document.getElementById("draw-multiple");
    var draw_singular = document.getElementById("draw-singular");
    var deck_new = document.getElementById("deck-new");

    draw_multiple.onclick = () =>{
        var card_data_array = draw(deck,7);
        if(card_data_array != -1){
            console.log("Multiple cards drawn from the deck!");
            for(var i = 0; i < card_data_array.length;i++){
                console.log(card_data_array[i]);
                hand.innerHTML += (i == card_data_array.length-1) ? `<p class="${card_data_array[i].classes}">&#${card_data_array[i].card}</p>`:`<p class="${card_data_array[i].classes}">&#${card_data_array[i].card}</p>\n`;
            }
        }
        else{
            console.log("No more cards in the deck!");
        }
    }

    draw_singular.onclick = () =>{
        var card_data_array = draw(deck);
        if(card_data_array != -1){
            console.log("One card has been drawn from the deck!");
            console.log(card_data_array[0]);
            hand.innerHTML += `<p class="${card_data_array[0].classes}">&#${card_data_array[0].card}</p>`;
        }
        else{
            console.log("No more cards in the deck!");
        }
    }

    deck_new.onclick = () =>{
        deck = createDeck();
        hand.innerHTML = "";
        console.log("New deck created!");
    }

}