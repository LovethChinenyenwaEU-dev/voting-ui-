"use strict";
// Track application state data variables
const votes = {
    Stephaine: 0,
    Victor: 0
};
let totalVotes = 0;
const MAX_VOTERS = 20;
// Track the names of individuals who have already cast a ballot
const votedNames = [];
// Type-safe retrieval of DOM elements using specific HTMLElement interfaces
const voteForm = document.getElementById('voteForm');
const voterNameInput = document.getElementById('voterName');
const candidateSelect = document.getElementById('candidateSelect');
const voteBtn = document.getElementById('voteBtn');
const countStephaine = document.getElementById('count-Stephaine');
const countVictor = document.getElementById('count-Victor');
const totalVotesCount = document.getElementById('totalVotesCount');
const viewWinnerBtn = document.getElementById('viewWinnerBtn');
const winnerModal = document.getElementById('winnerModal');
const winnerMessage = document.getElementById('winnerMessage');
const closeModalBtn = document.getElementById('closeModalBtn');
// Handles ballot processing events upon submission
voteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // 1. Safety structural barrier: verification check if total capacity remains open
    if (totalVotes >= MAX_VOTERS) {
        alert("Voting cap hit! No more entries allowed.");
        return;
    }
    // 2. Normalize and check voter name to prevent duplicate voting
    const rawVoterName = voterNameInput.value.trim();
    const normalizedVoterName = rawVoterName.toLowerCase();
    if (votedNames.includes(normalizedVoterName)) {
        alert(`Sorry ${rawVoterName}, you have already cast your vote! Duplicate voting is not allowed.`);
        return;
    }
    const selectedCandidate = candidateSelect.value;
    if (selectedCandidate in votes) {
        // Add current voter name to registry array
        votedNames.push(normalizedVoterName);
        // Increment records and refresh data tracking dashboard elements
        votes[selectedCandidate]++;
        totalVotes++;
        // UI rendering mutations
        countStephaine.textContent = votes['Stephaine'].toString();
        countVictor.textContent = votes['Victor'].toString();
        totalVotesCount.textContent = totalVotes.toString();
        // Clear input form fields for the next incoming participant
        voteForm.reset();
        // Lock form components if threshold parameters are reached
        if (totalVotes === MAX_VOTERS) {
            voterNameInput.disabled = true;
            candidateSelect.disabled = true;
            voteBtn.disabled = true;
            voteBtn.classList.add('opacity-50', 'cursor-not-allowed');
            alert("The maximum limit of 20 votes has been reached. The election is finalized.");
        }
    }
});
// Decides winner metrics and presents results overlay
viewWinnerBtn.addEventListener('click', () => {
    let outputText = "";
    if (votes['Stephaine'] > votes['Victor']) {
        outputText = `Stephaine wins with ${votes['Stephaine']} votes!`;
    }
    else if (votes['Victor'] > votes['Stephaine']) {
        outputText = `Victor wins with ${votes['Victor']} votes!`;
    }
    else {
        outputText = `It's a tie! Both candidates have ${votes['Stephaine']} votes.`;
    }
    // Toggle styling visibility properties on target modal elements
    winnerMessage.textContent = outputText;
    winnerModal.classList.remove('hidden');
});
// Modal close button controls
closeModalBtn.addEventListener('click', () => {
    winnerModal.classList.add('hidden');
});
//# sourceMappingURL=voting.js.map