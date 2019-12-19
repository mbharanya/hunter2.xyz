const chatMessages = `
<Cthon98> hey, if you type in your pw, it will show as stars
<Cthon98> ********* see!
<AzureDiamond> hunter2
<AzureDiamond> doesnt look like stars to me
<Cthon98> <AzureDiamond> *******
<Cthon98> thats what I see
<AzureDiamond> oh, really?
<Cthon98> Absolutely
<AzureDiamond> you can go hunter2 my hunter2-ing hunter2
<AzureDiamond> haha, does that look funny to you?
<Cthon98> lol, yes. See, when YOU type hunter2, it shows to us as *******
<AzureDiamond> thats neat, I didnt know IRC did that
<Cthon98> yep, no matter how many times you type hunter2, it will show to us as *******
<AzureDiamond> awesome!
<AzureDiamond> wait, how do you know my pw?
<Cthon98> er, I just copy pasted YOUR ******'s and it appears to YOU as hunter2 cause its your pw
<AzureDiamond> oh, ok.
`.split("\n")


populate().then(() => { })

async function populate() {
    for (const message of chatMessages) {
        message.split("").reduce(async (previousPromise, char) => {
            return previousPromise.then(() => {
                return getPromise(char);
              });
        }, Promise.resolve());
    }
}

function getPromise(char) {
    return new Promise((resolve, reject) =>
        window.setTimeout(() => {
            const chatElem = document.getElementById("chat")
            chatElem.innerHTML = chatElem.innerHTML + char
            resolve()
        }, Math.floor(Math.random() * 10000))
    )
}
