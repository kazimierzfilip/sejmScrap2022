function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms));
}

async function scrap() {

    var parties = document.querySelectorAll(".kluby>tbody>tr")
    var urls = []

    for (party of parties) {
        urls.push(party.children[0].children[0].getAttribute("href"))
    }

    let s = ""
    for (var url of urls) {
        console.log(url)
        var partyVotes = window.open("https://www.sejm.gov.pl/sejm9.nsf/" + url, "votes");
        await sleep(500)

        var voteRows = partyVotes.document.querySelectorAll("table>tbody>tr")
        while (voteRows.length == 0) {
            voteRows = partyVotes.document.querySelectorAll("table>tbody>tr")
            await sleep(1000)
        }

        for (voteRow of voteRows) {
            s += voteRow.children[1].textContent + "\t" + voteRow.children[2].textContent + "\n"
            if (voteRow.children.length == 6) {
                s += voteRow.children[4].textContent + "\t" + voteRow.children[5].textContent + "\n"
            }
        }
        partyVotes.close()
        await sleep(300)
    }
    window.open('data:text/csv;charset=utf-8,' + s, 'votes');

}

scrap();
