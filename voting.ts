interface VoteTracker {
    [candidateName: string]: number;
}

const votes: VoteTracker = {
    Stephaine: 0,
    Victor: 0
};
let totalVotes: number = 0;
const MAX_VOTERS: number = 20;

const votedNames: string[] = [];

const voteForm = document.getElementById('voteForm') as HTMLFormElement;
const voterNameInput = document.getElementById('voterName') as HTMLInputElement;
const candidateSelect = document.getElementById('candidateSelect') as HTMLSelectElement;
const voteBtn = document.getElementById('voteBtn') as HTMLButtonElement;

const countStephaine = document.getElementById('count-Stephaine') as HTMLSpanElement;
const countVictor = document.getElementById('count-Victor') as HTMLSpanElement;
const totalVotesCount = document.getElementById('totalVotesCount') as HTMLSpanElement;

const viewWinnerBtn = document.getElementById('viewWinnerBtn') as HTMLButtonElement;
const winnerModal = document.getElementById('winnerModal') as HTMLDivElement;
const winnerMessage = document.getElementById('winnerMessage') as HTMLParagraphElement;
const closeModalBtn = document.getElementById('closeModalBtn') as HTMLButtonElement;

voteForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();


    if (totalVotes >= MAX_VOTERS) {
        alert("Voting cap hit! No more entries allowed.");
        return;
    }


    const rawVoterName = voterNameInput.value.trim();
    const normalizedVoterName = rawVoterName.toLowerCase();

    if (votedNames.includes(normalizedVoterName)) {
        alert(`Sorry ${rawVoterName}, you have already cast your vote! Duplicate voting is not allowed.`);
        return;
    }

    const selectedCandidate = candidateSelect.value;

    if (selectedCandidate in votes) {
        
        votedNames.push(normalizedVoterName);

        
        votes[selectedCandidate]++;
        totalVotes++;

        
        countStephaine.textContent = votes['Stephaine'].toString();
        countVictor.textContent = votes['Victor'].toString();
        totalVotesCount.textContent = totalVotes.toString();

        
        voteForm.reset();

        
        if (totalVotes === MAX_VOTERS) {
            voterNameInput.disabled = true;
            candidateSelect.disabled = true;
            voteBtn.disabled = true;
            voteBtn.classList.add('opacity-50', 'cursor-not-allowed');
            alert("The maximum limit of 20 votes has been reached. The election is finalized.");
        }
    }
});


viewWinnerBtn.addEventListener('click', () => {
    let outputText = "";

    if (votes['Stephaine'] > votes['Victor']) {
        outputText = `Stephaine wins with ${votes['Stephaine']} votes!`;
    } else if (votes['Victor'] > votes['Stephaine']) {
        outputText = `Victor wins with ${votes['Victor']} votes!`;
    } else {
        outputText = `It's a tie! Both candidates have ${votes['Stephaine']} votes.`;
    }

    
    winnerMessage.textContent = outputText;
    winnerModal.classList.remove('hidden');
});


closeModalBtn.addEventListener('click', () => {
    winnerModal.classList.add('hidden');
});
