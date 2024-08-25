const connectWallet = async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            document.getElementById('wallet-info').innerText = `Connected: ${accounts[0]}`;
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        console.log("MetaMask not detected");
    }
};

const flipCoin = () => Math.random() < 0.5 ? 'heads' : 'tails';

document.getElementById('connect-wallet').addEventListener('click', connectWallet);

document.getElementById('heads').addEventListener('click', () => {
    const result = flipCoin();
    document.getElementById('result').innerText = result === 'heads' ? 'You won!' : 'You lost!';
});

document.getElementById('tails').addEventListener('click', () => {
    const result = flipCoin();
    document.getElementById('result').innerText = result === 'tails' ? 'You won!' : 'You lost!';
});
