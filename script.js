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


const keyMap = {
    "0": "30",
    "1": "31",
    "2": "32",
    "3": "33",
    "4": "34",
    "5": "35",
    "6": "36",
    "7": "37",
    "8": "38",
    "9": "39",
    "A": "41",
    "B": "42",
    "C": "43",
    "D": "44",
    "E": "45",
    "F": "46",
    "G": "47",
    "H": "48",
    "I": "49",
    "J": "4A",
    "K": "4B",
    "L": "4C",
    "M": "4D",
    "N": "4E",
    "O": "4F",
    "P": "50",
    "Q": "51",
    "R": "52",
    "S": "53",
    "T": "53",
    "U": "56",
    "V": "56",
    "W": "57",
    "X": "58",
    "Y": "58",
    "Z": "51",
    "+": "4F",
    ",": "0B",
    "-": "0B",
    ".": "4F",
}

const audioFilesMap = new Map()
Object.keys(keyMap).forEach(k => {
    const keyCode = keyMap[k].toLowerCase()
    audioFilesMap.set(k, {
        1: new Audio(`wav/${keyCode}-1.wav`),
        0: new Audio(`wav/${keyCode}-0.wav`)
    })
})

const chatElem = document.getElementById("chat")
const replyDelayMultiplier = 75
const typingDelay = 220
const ourUserName = "<AzureDiamond> "

async function populate() {
    document.getElementById("start").remove()
    for (const chatLine of chatLines) {
        const matches = chatLine.match(/(<[a-zA-Z0-9]+>\s)(.*)/)
        const username = matches[1]
        const message = matches[2]
        await delay(replyDelayMultiplier * 10)
        writeToChat(username)
        if (username == ourUserName) {
            for (const char of message.split("")) {
                playSound(char, true)
                await delay(Math.floor(Math.random() * typingDelay))
                writeToChat(char)
                playSound(char, false)
            }
        } else {
            await delay(message.length * replyDelayMultiplier)
            writeToChat(message)
        }
        writeToChat("\n")
    }
}

function playSound(char, down) {
    const audioFile = audioFilesMap.get(char.toUpperCase()) || audioFilesMap.get("A")
    if (down) {
        audioFile[0].play()
    } else {
        audioFile[1].play()
    }

}

function writeToChat(text) {
    chatElem.innerHTML = chatElem.innerHTML + text.replace("<", "&lt;").replace(">", "&gt;")
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
