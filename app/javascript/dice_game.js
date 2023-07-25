// app/assets/javascripts/dice_game.js

document.addEventListener('DOMContentLoaded', function() {
    const placeBetButton = document.getElementById('place-bet');
    const dice1Element = document.getElementById('dice-1');
    const dice2Element = document.getElementById('dice-2');
    const resultElement = document.getElementById('game-result');
    const betOptions = document.querySelectorAll('input[name="bet"]');
    const betAmountInput = document.getElementById('bets');
    const totalBetsOddElement = document.getElementById('total-bets-odd');
    const totalBetsEvenElement = document.getElementById('total-bets-even');
    const playerTokensElement = document.getElementById('player-tokens');
    let totalBetsOdd = 0;
    let totalBetsEven = 0;
    let playerTokens = 100; // Initial tokens count

    // Function to update the displayed token count
    function updatePlayerTokens() {
        playerTokensElement.textContent = `Tokens: ${playerTokens}`;
    }

    // Function to update the displayed total bets on odd and even
    function updateTotalBetsDisplay() {
        totalBetsOddElement.textContent = totalBetsOdd;
        totalBetsEvenElement.textContent = totalBetsEven;
    }

    // Initialize the displayed token count and total bets
    updatePlayerTokens();
    updateTotalBetsDisplay();

    placeBetButton.addEventListener('click', function() {
        const betAmount = parseInt(betAmountInput.value, 10);
        if (betAmount <= 0 || isNaN(betAmount)) {
            alert('Please enter a valid bet amount greater than zero.');
            return;
        }

        // Reset total bets to 0 before placing the bet
        totalBetsOdd = 0;
        totalBetsEven = 0;
        updateTotalBetsDisplay(); // Update the displayed total bets
        placeBet(betAmount); // Call the new function 'placeBet'
    });

    betOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateTotalBets(); // Update the total bets when the user changes the bet option
        });
    });

    betAmountInput.addEventListener('input', function() {
        updateTotalBets(); // Update the total bets when the user changes the bet amount
    });

    function placeBet(betAmount) {
        // Generate random numbers between 1 and 6 for the dice roll
        const dice1 = getRandomNumber();
        const dice2 = getRandomNumber();

        // Update the dice icons with the corresponding Unicode dice faces
        dice1Element.innerHTML = getDiceIcon(dice1);
        dice2Element.innerHTML = getDiceIcon(dice2);

        // Determine if the sum of the dice is odd or even
        const sum = dice1 + dice2;
        const isEven = sum % 2 === 0;

        // Update the game result
        resultElement.textContent = `You rolled: ${dice1} and ${dice2}. Total: ${sum}.`;

        // Check if the user's bet matches the outcome
        const userBet = getUserBet();
        if (userBet) {
            if ((userBet === 'even' && isEven) || (userBet === 'odd' && !isEven)) {
                resultElement.textContent += ` Congratulations, you won ${betAmount} tokens!`;
                if (userBet === 'even') {
                    totalBetsEven += betAmount;
                } else {
                    totalBetsOdd += betAmount;
                }
                playerTokens += betAmount;
            } else {
                resultElement.textContent += ` Sorry, you lost ${betAmount} tokens!`;
                playerTokens -= betAmount;
            }

            // Update the displayed token count and total bets
            updatePlayerTokens();
            updateTotalBetsDisplay();
        }

        // Reset the bet options
        betOptions.forEach(option => (option.checked = false));
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function getDiceIcon(diceNumber) {
        const diceFaces = ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;'];
        return diceFaces[diceNumber - 1];
    }

    function getUserBet() {
        for (const option of betOptions) {
            if (option.checked) {
                return option.value;
            }
        }
        return null;
    }

    function updateTotalBets() {
        const userBet = getUserBet();
        const betAmount = parseInt(betAmountInput.value, 10);
        if (!isNaN(betAmount) && betAmount > 0) {
            if (userBet === 'even') {
                // Move the bet from odd to even
                totalBetsEven += betAmount;
                totalBetsOdd -= betAmount; // Subtract the betAmount from totalBetsOdd
                totalBetsOdd = Math.max(0, totalBetsOdd); // Ensure totalBetsOdd is not negative
            } else if (userBet === 'odd') {
                // Move the bet from even to odd
                totalBetsOdd += betAmount;
                totalBetsEven -= betAmount; // Subtract the betAmount from totalBetsEven
                totalBetsEven = Math.max(0, totalBetsEven); // Ensure totalBetsEven is not negative
            }
        }

        updateTotalBetsDisplay(); // Update the displayed total bets
    }
});
