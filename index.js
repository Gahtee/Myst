const { create, Client } = require('@open-wa/wa-automate')
const { color, options } = require('./tools')
const { pt } = require('./message/lang/')
const { loader } = require('./function')
const { version } = require('./package.json')
const msgHandler = require('./message/index.js')
const figlet = require('figlet')
const fs = require('fs-extra')
const canvas = require('discord-canvas')
const delay = require('delay')

const start = (myst = new Client()) => {
    console.log(color(figlet.textSync('Myst', 'Larry 3D'), 'cyan'))
    console.log(color('=> Bot Carregado! Database:', 'yellow'), color(loader.getAllDirFiles('./database').length), color('Library:', 'yellow'), color(loader.getAllDirFiles('./lib').length), color('Funções:', 'yellow'), color(loader.getAllDirFiles('./function').length))
    console.log(color('=> Versção do código:', 'yellow'), color(version))
    console.log(color('[Myst]'), color('Myst está online!', 'yellow'))
    console.log(color('[Myst]', 'cyan'), color('Bem vindo de volta, Gahtee.', 'magenta'))
	myst.cutMsgCache()
	console.log(color('[Myst]'), color('Cache apagado!', 'yellow'))

    myst.onStateChanged((state) => {
        console.log(color('[Myst]'), state) 
        if (state === 'Despareado' || state === 'Conflito' || state === 'Não iniciado') myst.forceRefocus()
    })

    myst.onAddedToGroup(async (chat) => {
        console.log(color('[Myst]'), 'Adicionado em um grupo! Name:', color(chat.contact.name, 'yellow'), 'Membros totais:', color(chat.groupMetadata.participants.length, 'yellow'))
            await myst.sendText(chat.id, `você não tem autorização para isso. compre o premium para adicionar: wa.me/558387599908`)
			await delay(1500)
            await myst.leaveGroup(chat.id)
        })

    myst.onMessage((message) => {
        msgHandler(myst, message)
    })

    myst.onIncomingCall(async (callData) => {
        await myst.contactBlock(callData.peerJid)
        console.log(color('[BLOCK]', 'red'), color(`${callData.peerJid} foi bloqueado por ligar.`, 'yellow'))
    })

    myst.onGlobalParticipantsChanged(async (event) => {
        const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
        const isWelcome = _welcome.includes(event.chat)
        const gcChat = await myst.getChatById(event.chat)
        const pcChat = await myst.getContact(event.who)
        let { pushname, verifiedName, formattedName } = pcChat
        pushname = pushname || verifiedName || formattedName
        const { name, groupMetadata } = gcChat
        const botNumbers = await myst.getHostNumber() + '@c.us'
        try {
            if (event.action === 'add' && event.who !== botNumbers && isWelcome) {
                const pic = await myst.getProfilePicFromServer(event.who)
                if (pic === undefined) {
                    var picx = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                } else {
                    picx = pic
                }
                const welcomer = await new canvas.Welcome()
                    .setUsername(pushname)
                    .setDiscriminator(event.who.substring(6, 10))
                    .setMemberCount(groupMetadata.participants.length)
                    .setGuildName(name)
                    .setAvatar(picx)
                    .setColor('border', '#00100C')
                    .setColor('username-box', '#00100C')
                    .setColor('discriminator-box', '#00100C')
                    .setColor('message-box', '#00100C')
                    .setColor('title', '#00FFFF')
                    .setBackground('https://www.photohdx.com/images/2016/05/red-blurry-background.jpg')
                    .toAttachment()
                const base64 = `data:image/png;base64,${welcomer.toBuffer().toString('base64')}`
                await myst.sendFile(event.chat, base64, 'welcome.png', `Welcome ${pushname}!`)
            } else if (event.action === 'remove' && event.who !== botNumbers && isWelcome) {
                const pic = await myst.getProfilePicFromServer(event.who)
                if (pic === undefined) {
                    var picxs = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                } else {
                    picxs = pic
                }
                const bye = await new canvas.Goodbye()
                    .setUsername(pushname)
                    .setDiscriminator(event.who.substring(6, 10))
                    .setMemberCount(groupMetadata.participants.length)
                    .setGuildName(name)
                    .setAvatar(picxs)
                    .setColor('border', '#00100C')
                    .setColor('username-box', '#00100C')
                    .setColor('discriminator-box', '#00100C')
                    .setColor('message-box', '#00100C')
                    .setColor('title', '#00FFFF')
                    .setBackground('https://www.photohdx.com/images/2016/05/red-blurry-background.jpg')
                    .toAttachment()
                const base64 = `data:image/png;base64,${bye.toBuffer().toString('base64')}`
                await myst.sendFile(event.chat, base64, 'welcome.png', `Bye ${pushname}, we will miss you~`)
            }
        } catch (err) {
            console.error(err)
        }
    })
}

create(options(start))
    .then((myst) => start(myst))
    .catch((err) => console.error(err))
