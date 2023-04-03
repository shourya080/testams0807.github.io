// Function to verify NFT in user's wallet
function verifyNFT(nftId) {
  // Use web3 to connect to the user's wallet
  const web3 = new Web3(window.ethereum);
  
  // Get the user's account
  web3.eth.getAccounts().then(accounts => {
    const userAccount = accounts[0];
    
    // Load the NFT contract
    const contractAddress = '0x123456789abcdefg'; // Replace with actual contract address
    const contractAbi = [{...}]; // Replace with actual contract ABI
    const nftContract = new web3.eth.Contract(contractAbi, contractAddress);
    
    // Check if the user has the NFT with the given ID
    nftContract.methods.ownerOf(nftId).call({ from: userAccount })
      .then(owner => {
        if (owner.toLowerCase() === userAccount.toLowerCase()) {
          // NFT ownership is verified, log in the user
          loginUser();
        } else {
          // User does not own the NFT, display error message
          const errorMessage = document.getElementById('error-message');
          errorMessage.innerText = 'Error: NFT ownership verification failed.';
        }
      })
      .catch(error => {
        // An error occurred while verifying NFT ownership, display error message
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = 'Error: ' + error.message;
      });
  });
}

// Function to log in the user
function loginUser() {
  // Add code to log in the user here
  // For example, redirect the user to the dashboard page
  window.location.href = 'dashboard.html';
}

// Add event listener to the login button
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', () => {
  // Get the NFT ID from the input field
  const nftId = document.getElementById('nft-id').value;
  
  // Verify NFT ownership
  verifyNFT(nftId);
});
