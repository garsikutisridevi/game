let web3;
let accounts;
let headsCount = 0;
let tailsCount = 0;


function triggerConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    
    // Number of confetti pieces
    const confettiCount = 100;
    const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#FF33F6', '#33FF57', '#3357FF'];

    for (let i = 0; i < confettiCount; i++) {
        const confettiElement = document.createElement('div');
        confettiElement.className = 'confetti';

        // Randomize the size, position, color, and animation duration
        confettiElement.style.left = `${Math.random() * 100}vw`;
        confettiElement.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiElement.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confettiElement.style.transform = `rotate(${Math.random() * 360}deg)`;

        confettiContainer.appendChild(confettiElement);

        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.removeChild(confettiElement);
        }, 5000); // Adjust timing as needed
    }

    console.log('Confetti triggered');
}
// Connect to MetaMask wallet
const connectWallet = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            accounts = await web3.eth.getAccounts();
            document.getElementById('wallet-info').innerText = `Connected: ${accounts[0]}`;
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        alert("Please install MetaMask!");
    }
};

// Flip a coin (heads or tails)
const flipCoin = () => {
    const resultElement = document.getElementById("result");
    const headsCountElement = document.getElementById("headsCount");
    const tailsCountElement = document.getElementById("tailsCount");
    const betAmount = document.getElementById('bet-amount').value;
    const selectedSide = document.getElementById("selectedSide").value.toUpperCase();

    if (!betAmount || !accounts) {
        alert("Please connect your wallet and enter a valid amount to bet.");
        return;
    }

    resultElement.style.transform = "rotateY(360deg)"; // Add rotation animation
    setTimeout(() => {
        const outcome = Math.random() < 0.5 ? "HEADS" : "TAILS";
        resultElement.innerText = outcome;
        resultElement.style.transform = "rotateY(0deg)";

        // Update the counters
        if (outcome === "HEADS") {
            headsCount++;
            headsCountElement.innerText = headsCount;
        } else {
            tailsCount++;
            tailsCountElement.innerText = tailsCount;
        }

        // Check if user won or lost
        if (selectedSide === outcome) {
            handleWin(betAmount);
        } else {
            handleLoss(betAmount);
        }
    }, 500); // Adjust the timing to match the CSS animation
};

// Handle win - simulate payout
const handleWin = (betAmount) => {
    outcomeMessage.textContent = "You won!";
            triggerConfetti(); // Trigger confetti on win
            // Handle win - double the bet amount and interact with blockchain
            //await executeFlip(betAmount * 2, selectedToken, true);

    // Double the bet amount (in a real scenario, you would interact with a smart contract to handle the transaction)
    const doubledAmount = web3.utils.toWei((betAmount * 2).toString(), 'ether');

    // In a real game, this will involve interaction with a smart contract
    web3.eth.sendTransaction({
        from: accounts[0],
        to: accounts[0], // This should be the winner's address in a real game
        value: doubledAmount
    }).then(() => {
        console.log('Transaction successful');
    }).catch(error => {
        console.error('Transaction error:', error);
    });
};

// Handle loss - simulate loss
const handleLoss = (betAmount) => {
    outcomeMessage.textContent = "You lost!";
};

// Event listeners for buttons
document.getElementById('connect-wallet').addEventListener('click', connectWallet);
