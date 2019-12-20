const chatLines = `
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
`.trim().split("\n")

const chatElem = document.getElementById("chat")
const replyDelayMultiplier = 75
const typingDelay = 220
const ourUserName = "<AzureDiamond> "
populate().then(() => { })

async function populate(){
    for (const chatLine of chatLines) {
        const matches = chatLine.match(/(<[a-zA-Z0-9]+>\s)(.*)/)
        const username = matches[1]
        const message = matches[2]
        await delay(replyDelayMultiplier * 10)
        writeToChat(username)
        if (username == ourUserName){
            for (const char of message.split("")){
                await delay(Math.floor(Math.random() * typingDelay))
                writeToChat(char)
            }
        }else{
            await delay(message.length * replyDelayMultiplier)
            writeToChat(message)
        }
        writeToChat("\n")
    }
}

function writeToChat(text){
    chatElem.innerHTML = chatElem.innerHTML + text.replace("<", "&lt;").replace(">", "&gt;")
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
