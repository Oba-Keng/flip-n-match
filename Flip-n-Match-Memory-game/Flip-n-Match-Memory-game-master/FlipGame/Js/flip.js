class mixOrMatch
{

    /**
     * this contructor initialises variables and the variables are called by functions below
     */
    constructor(totalTime, cards)
    {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('timeRemaining');
        this.ticker = document.getElementById('flips');
    }

    /**
     * start game function resets flips and timer and is called everytime the page is refreshed
     */
    startGame()
    {
        this.cardToCheck = null;
        this.totalClicks = 0;
        // this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        this.shuffleCards();

        setTimeout(() => 
        {
            this.shuffleCards();
            // this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    /**
     * hideCards hides the front of the cards and shows the back of the cards by toggling the visible and matched classes off
     */
    hideCards()
    {
        this.cardsArray.forEach(card => 
        {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    /**
     * flipCard flips the card and toggles the visible class on
     */
    flipCard(card)
    {
        if(this.canFlipCard(card))
        {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck)
            {
                this.checkForCardMatch(card);
            }else
            {
                this.cardToCheck = card;
            }
        }
    }

    /**
     * checkForCardMatch takes in a card and checks if a card mathes one card then returns the card to cardMatch function
     */
    checkForCardMatch(card)
    {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
        {
            this.cardMatch(card, this.cardToCheck);
        }else
        {
            this.cardMisMatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;
    }

    /**
     * this function takes the two matched cards and pushes them into an array
     */
    cardMatch(card1, card2)
    {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length)
        {
            this.victory();
        }
    }

    /**
     * cardMisMatch takes the two cards that are not a match and toggles their visible class off
     */
    cardMisMatch(card1, card2)
    {
        this.busy = true;
        setTimeout(() => 
        {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        },1000);
    }

    /**
     * getCardType gets the card type of each card by image source referrence
     */
    getCardType(card)
    {
        return card.getElementsByClassName('cardValue')[0].src;
    }

    /**
     * starts the countdown timer and calls the game over function
     */
    startCountDown()
    {
        return setInterval(() => 
        {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
            {
                this.gameOver();
            }
        }, 1000);
    }

    /**
     * gameOver clears the timer and disbles clicking on cards until page refresh
     */
    gameOver()
    {
        clearInterval(this.countDown);
        this.busy = true;
    }

    /**
     * for future use, will stop the timer when you have matched every card
     */
    victory() 
    {
        
    }

    /**
     * shuffles the cards using the Fisher Yates shuffle function
     */
    shuffleCards()
    {
        for(let i = this.cardsArray.length - 1; i > 0; i--)
        {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order =randIndex;
        }
    }

    /**
     * enables you to flip the cards
     */
    canFlipCard(card)
    {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

/**
 * when document is ready the starts the game
 */
function ready()
{
    let cards = Array.from(document.getElementsByClassName('card'));
    let container = document.getElementsByClassName("gameContainer");
    container[0].style.display = "none";
    let cardsDisplayed = prompt("Please enter an even number between 4 and 12.");
    if(cardsDisplayed % 2 == 0)
    {
        if(cardsDisplayed >= 4 && cardsDisplayed <= 12)
        {
            for (let i = 0; i < cards.length - cardsDisplayed; i++)
            {
                cards[i].style.display = "none";
                container[0].style.display != "inline-grid";
            } 
        }else
        {
            alert("Please enter an even number between 4 and 12.");
        } 
    }
    else
    {
        alert("Please enter an even number.");
    } 
    let game = new mixOrMatch(100,cards);
    game.startGame();
    cards.forEach(card => 
    {
        card.addEventListener('click', () => 
        {
            game.flipCard(card);
        });
    });
}

if(document.readyState === "loading")
{
    document.addEventListener('DOMcontentLoaded', ready());
}else
{
    ready();
}
