#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAX_BETS 5
#define NUMBERS_COUNT 37 // 0 to 36

// Roulette wheel numbers
int rouletteWheel[NUMBERS_COUNT] = {
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 
    30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 
    29, 7, 28, 12, 35, 3, 26
};

// Function to spin the wheel and return the winning number
int spinWheel() {
    int randomIndex = rand() % NUMBERS_COUNT;
    return rouletteWheel[randomIndex];
}

// Function to simulate placing a bet
void placeBet(int *betAmount, int *betNumber) {
    printf("Enter bet amount: ");
    scanf("%d", betAmount);
    
    printf("Enter bet number (0 to 36): ");
    scanf("%d", betNumber);

    // Check if the bet number is valid
    if (*betNumber < 0 || *betNumber >= NUMBERS_COUNT) {
        printf("Invalid bet number. Please choose a number between 0 and 36.\n");
        return;
    }

    if (*betAmount <= 0) {
        printf("Invalid bet amount. Bet must be greater than zero.\n");
        return;
    }

    printf("Bet placed: $%d on number %d\n", *betAmount, *betNumber);
}

// Function to check if the player won
void checkWin(int betNumber, int winningNumber, int betAmount) {
    if (betNumber == winningNumber) {
        printf("Congratulations! You won $%d!\n", betAmount * 35); // Assuming 35x multiplier for exact match
    } else {
        printf("You lost. The winning number was %d.\n", winningNumber);
    }
}

// Function to clear the bet
void clearBet(int *betAmount, int *betNumber) {
    *betAmount = 0;
    *betNumber = -1;
    printf("Your bet has been cleared.\n");
}

int main() {
    srand(time(0)); // Seed for random number generation

    int betAmount = 0;
    int betNumber = -1;

    while (1) {
        printf("Welcome to the Roulette Game!\n");

        // Ask if player wants to place a bet, clear bet, or quit
        printf("Options:\n");
        printf("1. Place Bet\n");
        printf("2. Clear Bet\n");
        printf("3. Quit\n");
        int choice;
        printf("Enter your choice: ");
        scanf("%d", &choice);

        if (choice == 1) {
            // Place bet
            placeBet(&betAmount, &betNumber);

            // Spin the wheel
            int winningNumber = spinWheel();
            printf("The wheel spun and the winning number is: %d\n", winningNumber);

            // Check if the player won
            checkWin(betNumber, winningNumber, betAmount);
        } 
        else if (choice == 2) {
            // Clear bet
            clearBet(&betAmount, &betNumber);
        } 
        else if (choice == 3) {
            // Quit the game
            printf("Thanks for playing! Goodbye!\n");
            break;
        } 
        else {
            printf("Invalid option, please try again.\n");
        }

        // Ask if player wants to play again
        char playAgain;
        printf("Do you want to play again? (y/n): ");
        scanf(" %c", &playAgain);
        if (playAgain != 'y' && playAgain != 'Y') {
            break;
        }
    }

    return 0;
}
