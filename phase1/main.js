const axios = require('axios')

const CANDIDATE_ID = "9efc731d-6444-4db2-933d-1db6c47067fe"

const POLYANETS_URL = "https://challenge.crossmint.io/api/polyanets"

class Polyanet {
    constructor(url, candidateId) {
        this.url = url
        this.candidateId = candidateId
    }

    async post(row, column) {
        try {
            await axios.post(
                this.url, 
                JSON.stringify({
                    "candidateId": this.candidateId,
                    "row": row,
                    "column": column
                }), 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        } catch (err) {
            console.log("ERROR: ", err)
        }
    }
}

const main = async () => {
    const N = 11; // Matrix size

    const polyanet = new Polyanet(POLYANETS_URL, CANDIDATE_ID)
    
    for (let i = 2; i < N-2; i++) {
        await polyanet.post(i, i)
        await polyanet.post(i, N - 1 - i)
    }
}

main()