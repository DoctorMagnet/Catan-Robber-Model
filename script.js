document.getElementById('calculateButton').addEventListener('click', function () {
        const numCardsOriginal = parseInt(document.getElementById('numCardsOriginal').value) || 0;
        const rg1 = parseInt(document.getElementById('rg1').value) || 0;
        const rg2 = parseInt(document.getElementById('rg2').value) || 0;
        const rg3 = parseInt(document.getElementById('rg3').value) || 0;
        const rg4 = parseInt(document.getElementById('rg4').value) || 0;
        const rg5 = parseInt(document.getElementById('rg5').value) || 0;

        // Validate inputs
        if (numCardsOriginal < 0 || rg1 < 0 || rg2 < 0 || rg3 < 0 || rg4 < 0 || rg5 < 0) {
                alert("All input values must be non-negative.");
                return;
        }

        calculateECLR(numCardsOriginal, rg1, rg2, rg3, rg4, rg5);
});

function calculateECLR(numCardsOriginal, rg1, rg2, rg3, rg4, rg5) {
        let totalNumCardsWithRobber = 0;
        let totalNumCardsNoRobber = 0;
        const iterations = 100000; // Reduced iterations for performance

        // "With Robber" Simulation
        for (let i = 1; i <= iterations; i++) {
                let numCards = numCardsOriginal;

                // Roll 1
                let diceRoll1 = Math.floor(Math.random() * 36) + 1;

                // Robber for roll 1
                if (diceRoll1 <= 6 && numCards > 7) {
                        numCards = Math.floor((numCards / 2.0) + 0.5);
                }
                // RG for roll 1
                else if (diceRoll1 > 6 && diceRoll1 <= (6 + rg1)) {
                        numCards += 1;
                } else if (diceRoll1 > (6 + rg1) && diceRoll1 <= (6 + rg1 + rg2)) {
                        numCards += 2;
                } else if (diceRoll1 > (6 + rg1 + rg2) && diceRoll1 <= (6 + rg1 + rg2 + rg3)) {
                        numCards += 3;
                } else if (diceRoll1 > (6 + rg1 + rg2 + rg3) && diceRoll1 <= (6 + rg1 + rg2 + rg3 + rg4)) {
                        numCards += 4;
                } else if (diceRoll1 > (6 + rg1 + rg2 + rg3 + rg4) && diceRoll1 <= (6 + rg1 + rg2 + rg3 + rg4 + rg5)) {
                        numCards += 5;
                }

                // Repeat the above logic for rolls 2, 3, and 4
                // For brevity, let's create a function to handle each roll

                numCards = handleRollWithRobber(numCards, rg1, rg2, rg3, rg4, rg5);
                numCards = handleRollWithRobber(numCards, rg1, rg2, rg3, rg4, rg5);
                numCards = handleRollWithRobber(numCards, rg1, rg2, rg3, rg4, rg5);

                totalNumCardsWithRobber += numCards;
        }
        let expectedNumCardsWithRobber = totalNumCardsWithRobber / iterations;
        console.log("Expected Num Cards With Robber: " + expectedNumCardsWithRobber);

        // "Without Robber" Simulation
        for (let i = 1; i <= iterations; i++) {
                let numCards = numCardsOriginal;

                // Roll 1
                let diceRoll1 = Math.floor(Math.random() * 36) + 1;

                // RG for roll 1
                if (diceRoll1 <= rg1) {
                        numCards += 1;
                } else if (diceRoll1 > rg1 && diceRoll1 <= (rg1 + rg2)) {
                        numCards += 2;
                } else if (diceRoll1 > (rg1 + rg2) && diceRoll1 <= (rg1 + rg2 + rg3)) {
                        numCards += 3;
                } else if (diceRoll1 > (rg1 + rg2 + rg3) && diceRoll1 <= (rg1 + rg2 + rg3 + rg4)) {
                        numCards += 4;
                } else if (diceRoll1 > (rg1 + rg2 + rg3 + rg4) && diceRoll1 <= (rg1 + rg2 + rg3 + rg4 + rg5)) {
                        numCards += 5;
                }

                // Repeat the above logic for rolls 2, 3, and 4
                numCards = handleRollWithoutRobber(numCards, rg1, rg2, rg3, rg4, rg5);
                numCards = handleRollWithoutRobber(numCards, rg1, rg2, rg3, rg4, rg5);
                numCards = handleRollWithoutRobber(numCards, rg1, rg2, rg3, rg4, rg5);

                totalNumCardsNoRobber += numCards;
        }
        let expectedNumCardsNoRobber = totalNumCardsNoRobber / iterations;
        console.log("Expected Num Cards Without Robber: " + expectedNumCardsNoRobber);

        // Calculate ECLR
        let ECLR = expectedNumCardsNoRobber - expectedNumCardsWithRobber;
        ECLR = ECLR.toFixed(10);
        console.log("ECLR is: " + ECLR);

        // Display the ECLR result
        document.getElementById('elrOutput').innerText = "ECLR: " + ECLR;
}

function handleRollWithRobber(numCards, rg1, rg2, rg3, rg4, rg5) {
        let diceRoll = Math.floor(Math.random() * 36) + 1;

        if (diceRoll <= 6 && numCards > 7) {
                numCards = Math.floor((numCards / 2.0) + 0.5);
        }
        // RG logic
        else if (diceRoll > 6 && diceRoll <= (6 + rg1)) {
                numCards += 1;
        } else if (diceRoll > (6 + rg1) && diceRoll <= (6 + rg1 + rg2)) {
                numCards += 2;
        } else if (diceRoll > (6 + rg1 + rg2) && diceRoll <= (6 + rg1 + rg2 + rg3)) {
                numCards += 3;
        } else if (diceRoll > (6 + rg1 + rg2 + rg3) && diceRoll <= (6 + rg1 + rg2 + rg3 + rg4)) {
                numCards += 4;
        } else if (diceRoll > (6 + rg1 + rg2 + rg3 + rg4) && diceRoll <= (6 + rg1 + rg2 + rg3 + rg4 + rg5)) {
                numCards += 5;
        }

        return numCards;
}

function handleRollWithoutRobber(numCards, rg1, rg2, rg3, rg4, rg5) {
        let diceRoll = Math.floor(Math.random() * 36) + 1;

        if (diceRoll <= rg1) {
                numCards += 1;
        } else if (diceRoll > rg1 && diceRoll <= (rg1 + rg2)) {
                numCards += 2;
        } else if (diceRoll > (rg1 + rg2) && diceRoll <= (rg1 + rg2 + rg3)) {
                numCards += 3;
        } else if (diceRoll > (rg1 + rg2 + rg3) && diceRoll <= (rg1 + rg2 + rg3 + rg4)) {
                numCards += 4;
        } else if (diceRoll > (rg1 + rg2 + rg3 + rg4) && diceRoll <= (rg1 + rg2 + rg3 + rg4 + rg5)) {
                numCards += 5;
        }

        return numCards;
}
