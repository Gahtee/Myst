
/********** MODULES **********/
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const os = require('os')
const Nekos = require('nekos.life')
const neko = new Nekos()
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const api = new API()
const NanaAPI = require('nana-api')
const nana = new NanaAPI()
const fetch = require('node-fetch')
const isPorn = require('is-porn')
const exec = require('await-exec')
const config = require('../config.json')
const axios = require('axios')
const tts = require('node-gtts')
const ffmpeg = require('fluent-ffmpeg')
const bent = require('bent')
const path = require('path')
const ms = require('parse-ms')
const toMs = require('ms')
const canvacord = require('canvacord')
const mathjs = require('mathjs')
const emojiUnicode = require('emoji-unicode')
const moment = require('moment-timezone')
const request = require('request');
const ocrtess = require('node-tesseract-ocr')
const translate = require('@vitalets/google-translate-api')
const { spawn, execFile } = require('child_process')
moment.tz.setDefault('America/Sao_Paulo').locale('id')
const google = require('google-it')
const cron = require('node-cron')
const delay = require('delay');
const { Aki } = require('aki-api')
const puppeteer = require('puppeteer')
const { createCanvas, loadImage } = require('canvas')
const pornhub = require('@justalk/pornhub-api')
/********** END OF MODULES **********/
/********** UTILS **********/
const { msgFilter, color, processTime, isUrl, createSerial } = require('../tools')
const { nsfw, weeaboo, downloader, misc } = require('../lib')
const { uploadImages } = require('../tools/fetcher')
const { pt } = require('./lang')
const destrava = require('./lang')
const { tempjogo, level, register, afk, reminder, premium, messages } = require('../function')
const cd = 4.32e+7
const cdj = 6e+5
const errorImg = 'https://i.ibb.co/jRCpLfn/user.png'
const dateNow = moment.tz('America/Sao_Paulo').format('DD-MM-YYYY')
const region = 'pt'
const aki = new Aki(region)
var jogadas = 0
const ocrconf = {
    lang: 'eng',
    oem: '1',
    psm: '3'
}
/********** END OF UTILS **********/
/********** DATABASES **********/
const _nsfw = JSON.parse(fs.readFileSync('./database/group/nsfw.json'))
const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _antinsfw = JSON.parse(fs.readFileSync('./database/group/antinsfw.json'))
const _trava = JSON.parse(fs.readFileSync('./database/group/antitrava.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const _autosticker = JSON.parse(fs.readFileSync('./database/group/autosticker.json'))
const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
const _mute = JSON.parse(fs.readFileSync('./database/bot/mute.json'))
const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const _reminder = JSON.parse(fs.readFileSync('./database/user/reminder.json'))
const _itvl = JSON.parse(fs.readFileSync('./database/user/tempjogo.json'))
const _stick = JSON.parse(fs.readFileSync('./database/bot/sticker.json'))
const _setting = JSON.parse(fs.readFileSync('./database/bot/setting.json'))
let { memberLimit, groupLimit } = _setting
/********** END OF DATABASES **********/
/********** MESSAGE HANDLER **********/
// eslint-disable-next-line no-undef
module.exports = msgHandler = async (myst = new Client(), message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName
        const botNumber = await myst.getHostNumber() + '@c.us'
        const blockNumber = await myst.getBlockedIds()
        const ownerNumber = config.ownerBot
        const authorWm = config.authorStick
        const packWm = config.packStick
		const user = sender.id
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
		const groupMembers = isGroupMsg ? await myst.getGroupMembers(groupId) : false
        const groupAdmins = isGroupMsg ? await myst.getGroupAdmins(groupId) : ''
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')
        const cmd = caption || body || ''
        const command = cmd.toLowerCase().split(' ')[0] || ''
        const prefix = config.prefix
        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const args = body.trim().split(/ +/).slice(1)
		const argk = body.trim().substring(body.indexOf(' ') + 1)
        const uaOverride = config.uaOverride
        const q = args.join(' ')
        const ar = args.map((v) => v.toLowerCase())
        const url = args.length !== 0 ? args[0] : ''
		const lvpc = Math.floor(Math.random() * 100) + 1
        const idgp = groupId

		/********** VALIDATOR **********/
        const isCmd = body.startsWith(prefix)
        const isBlocked = blockNumber.includes(sender.id)
        const isOwner = sender.id === ownerNumber
        const isBanned = _ban.includes(sender.id)
        const isPremium = premium.checkPremiumUser(sender.id, _premium)
        const isRegistered = register.checkRegisteredUser(sender.id, _registered)
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber) : false
        const isNsfw = isGroupMsg ? _nsfw.includes(groupId) : false
        const isWelcomeOn = isGroupMsg ? _welcome.includes(groupId) : false
        const isDetectorOn = isGroupMsg ? _antilink.includes(groupId) : false
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
        const isAutoStickerOn = isGroupMsg ? _autosticker.includes(groupId) : false
        const isAfkOn = isGroupMsg ? afk.checkAfkUser(sender.id, _afk) : false
        const isAntiTravasOn = isGroupMsg ? _trava.includes(groupId) : false
        const isAntiNsfw = isGroupMsg ? _antinsfw.includes(groupId) : false
        const isMute = isGroupMsg ? _mute.includes(chat.id) : false
        const isMensagem = args.length > 0
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isQuotedAudio = quotedMsg && quotedMsg.type === 'audio'
        const isQuotedVoice = quotedMsg && quotedMsg.type === 'ptt'
        const isImage = type === 'image'
        const isVideo = type === 'video'
        const isAudio = type === 'audio'
        const isVoice = type === 'ptt'
        const isGif = mimetype === 'image/gif'
        const isTrava = type === 'oversized' || args.length >= 1000
        /********** END OF VALIDATOR **********/
        // ROLE (Change to what you want, or add) and you can change the role sort based on XP.
        const levelRole = level.getLevelingLevel(sender.id, _level)
        var role = 'Cobre'
        if (levelRole <= 4) { role = 'Bronze I' } else if (levelRole <= 10) { role = 'Bronze II' } else if (levelRole <= 15) { role = 'Bronze III' } else if (levelRole <= 20) { role = 'Bronze IV' } else if (levelRole <= 25) { role = 'Bronze V' } else if (levelRole <= 30) { role = 'Prata I' } else if (levelRole <= 35) { role = 'Prata II' } else if (levelRole <= 40) { role = 'Prata III' } else if (levelRole <= 45) { role = 'Prata IV' } else if (levelRole <= 50) { role = 'Prata V' } else if (levelRole <= 55) { role = 'Ouro I' } else if (levelRole <= 60) { role = 'Ouro II' } else if (levelRole <= 65) { role = 'Ouro III' } else if (levelRole <= 70) { role = 'Ouro IV' } else if (levelRole <= 75) { role = 'Ouro V' } else if (levelRole <= 80) { role = 'Diamante I' } else if (levelRole <= 85) { role = 'Diamante II' } else if (levelRole <= 90) { role = 'Diamante III' } else if (levelRole <= 95) { role = 'Diamante IV' } else if (levelRole <= 100) { role = 'Diamante V' } else if (levelRole <= 200) { role = 'Diamante Mestre' } else if (levelRole <= 300) { role = 'Elite' } else if (levelRole <= 400) { role = 'Global' } else if (levelRole <= 500) { role = 'Herói' } else if (levelRole <= 600) { role = 'Lendário' } else if (levelRole <= 700) { role = 'Semi-Deus' } else if (levelRole <= 800) { role = 'Arcanjo' } else if (levelRole <= 900) { role = 'Demoníaco' } else if (levelRole <= 1000 || levelRole >= 1000) { role = 'Divindade' }
        // Leveling [BETA] by Slavyan
        if (isGroupMsg && isRegistered && !level.isGained(sender.id) && !isBanned && isLevelingOn) {
            try {
                level.addCooldown(sender.id)
                const currentLevel = level.getLevelingLevel(sender.id, _level)
                const amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 15)
                const requiredXp = 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100
                level.addLevelingXp(sender.id, amountXp, _level)
                if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
                    level.addLevelingLevel(sender.id, 1, _level)
                    const userLevel = level.getLevelingLevel(sender.id, _level)
                    const fetchXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                }
            } catch (err) {
                console.error(err)
            }
        }
        //Anti-trava por KillovSky (grupo)
        if (isGroupMsg && isAntiTravasOn && isTrava && !isGroupAdmins && isBotGroupAdmins && !isOwner) {
            try {
                await myst.setGroupToAdminsOnly(groupId, true)
                console.log(color('[TRAVA]', 'red'), color(`Possivel trava recebida pelo → ${pushname} - [${user.replace('@c.us', '')}] em ${name}...`, 'yellow'))
                let wakeAdm = 'ACORDA ADM\n\n'
                var MystAT = ''
                for (let i = 0; i < 5; i++) await myst.sendText(from, `❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n❧═━ ♡♡♡♡ ━═☙\n█▀▄▀█ █   █ █▀▀▀█ ▀▀█▀▀\n█ █ █ █▄▄▄█ ▀▀▀▄▄   █\n█   █   █   █▄▄▄█   █\n\n─▄█▀█▄──▄███▄─\n▐█░██████████▌\n─██▒█████████─\n──▀████████▀──\n─────▀██▀─────\n\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n`, id)
                for (let adminls of groupAdmins) { wakeAdm += `➸ @${adminls.replace(/@c.us/g, '')}\n` }
                await myst.sendTextWithMentions(from, wakeAdm).then(async () => { await myst.removeParticipant(groupId, user) }) // Fecha só para admins e bane o cara que travou
                await myst.sendText(ownerNumber, pt.recTrava(user)).then(async () => { await myst.contactBlock(user) }) // Avisa o dono do bot e bloqueia o cara
                await myst.sendTextWithMentions(from, pt.baninj(user) + 'Travas.').then(async () => { await myst.sendText(from, pt.nopanic(), id) }) // Manda o motivo do ban e explica para os membros
                await delay(10000)
                return await myst.setGroupToAdminsOnly(groupId, false) // Reabre o grupo
            } catch (error) { return }
        }
        //Anti travas privado
        if (!isGroupMsg && isTrava && !isOwner) {
            try{
                await myst.contactBlock(user) // bloqueia o cara
                console.log(color('[TRAVA]', 'red'), color(`Possivel trava recebida pelo → ${pushname} - [${user.replace('@c.us', '')}] em ${name}...`, 'yellow'))
                for (let i = 0; i < 10; i++) await myst.sendText(from, pt.destrava())
                await myst.sendText(ownerNumber, pt.recTrava(user)) // Avisa o dono do bot

            } catch (error) { return }
        }
        // Anti group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner && isMensagem) {
            if (chats.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                const valid = await myst.inviteInfo(chats)
                if (valid) {
                    console.log(color('[KICK]', 'red'), color('Received a group link and it is a valid link!', 'yellow'))
                    await myst.reply(from, pt.linkDetected(), id)
                    await myst.removeParticipant(groupId, sender.id)
                } else {
                    console.log(color('[WARN]', 'yellow'), color('Received a group link but it is not a valid link!', 'yellow'))
                }
            }
        }

        if (!isCmd && !isGroupMsg && !isOwner && !isTrava) { myst.reply(from, pt.apenasBot(), id) }
		//Contador de mensagens
		if (!isCmd && isGroupMsg && !isTrava ) { 
            if (!fs.existsSync(`./database/groupsMsgs/${idgp}.json`)) {
            fs.writeFileSync(`./database/groupsMsgs/${idgp}.json`, JSON.stringify([])) 
            } 
            const msgcount = JSON.parse(fs.readFileSync(`./database/groupsMsgs/${idgp}.json`))
            messages.getMsg(user, msgcount, groupId); messages.addMsg(user, 1, msgcount, groupId) 
        }
        // Mensagens no PV
        if (!isCmd && !isGroupMsg) { console.log('[MSG]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'DE', color(`"${pushname} - [${user.replace('@c.us', '')}]"`)) }
		// Mensagem em Grupo
        if (!isCmd && isGroupMsg) { console.log('[MSG]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'DE', color(`"${pushname} - [${user.replace('@c.us', '')}]"`), 'EM', color(`"${name || formattedTitle}"`)) }
        // Sticker keywords by: @hardianto02_
        if (isGroupMsg && isRegistered) {
            if (_stick.includes(chats)) {
                await myst.sendImageAsSticker(from, `./temp/sticker/${chats}.webp`, { author: authorWm, pack: packWm })
            }
        }
        // Anti fake group link detector by: Baguettou
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner && isMensagem) {
            if (chats.match(new RegExp(/(https:\/\/chat.(?!whatsapp.com))/gi))) {
                console.log(color('[BAN]', 'red'), color('Recebeu um link de grupo falso!', 'yellow'))
                await myst.reply(from, 'Link falso de grupo detectado!', id)
                await myst.removeParticipant(groupId, sender.id)
            }
        }
        // Anti NSFW link  
        if (isGroupMsg && isBotGroupAdmins && isAntiNsfw && !isOwner  && !isGroupAdmins && isMensagem ) {
            if (isUrl(chats)) {
                const classify = new URL(isUrl(chats))
                console.log(color('[FILTRO]', 'yellow'), 'Checando link:', classify.hostname)
                isPorn(classify.hostname, async (err, status) => {
                    if (err) return console.error(err)
                    if (status) {
                        console.log(color('[NSFW]', 'red'), color('Esse link foi considerado NSFW!', 'yellow'))
                        await myst.reply(from, pt.linkNsfw(), id)
                        await myst.removeParticipant(groupId, sender.id)
                    } else {
                        console.log(('[NEUTRO]'), color('Link não NSFW!'))
                    }
                })
            }
        }
        // Auto sticker
        if (isGroupMsg && isAutoStickerOn && isMedia && isImage && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await myst.sendImageAsSticker(from, imageBase64, { author: authorWm, pack: packWm })
            console.log(`Sticker processado em ${processTime(t, moment())} segundos`)
        }
        // Auto sticker video
        if (isGroupMsg && isAutoStickerOn && isMedia && isVideo && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await myst.sendMp4AsSticker(from, videoBase64, { stickerMetadata: true, pack: packWm, author: authorWm, fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', crop: false, loop: 0 })
            console.log(`Sticker processado em ${processTime(t, moment())} segundos`)
        }
        // AFK by Slavyan
        if (isGroupMsg) {
            for (let ment of mentionedJidList) {
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    await myst.reply(from, pt.afkMentioned(getReason, getTime), id)
                }
            }
            if (afk.checkAfkUser(sender.id, _afk) && !isCmd) {
                _afk.splice(afk.getAfkPosition(sender.id, _afk), 1)
                fs.writeFileSync('./database/user/afk.json', JSON.stringify(_afk))
                await myst.sendText(from, pt.afkDone(pushname))
            }
        }
        // Mute
        if (isCmd && isMute && !isGroupAdmins && !isOwner && !isPremium) return
        // Ignore banned and blocked users
        if (isCmd && (isBanned || isBlocked) && !isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'DE', color(pushname))
        if (isCmd && (isBanned || isBlocked) && isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'DE', color(pushname), 'EM', color(name || formattedTitle))
        // Anti spam
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'DE', color(pushname))
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'DE', color(pushname), 'EM', color(name || formattedTitle))
        // Log
        if (isCmd && !isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} ${q}`), 'DE', color(pushname))
            await myst.sendSeen(from)
        }
        if (isCmd && isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} ${q}`), 'DE', color(pushname), 'EM', color(name || formattedTitle))
            await myst.sendSeen(from)
        }
        // Anti spam
        if (isCmd && !isPremium && !isOwner) msgFilter.addFilter(from)
        switch (command) {
            // Register by Slavyan
            case prefix+'register':
                if (isRegistered) return await myst.reply(from, pt.registeredAlready(), id)
                if (isGroupMsg) return await myst.reply(from, pt.pcOnly(), id)
                if (!q.includes('|')) return await myst.reply(from, pt.wrongFormat(), id)
                const namaUser = q.substring(0, q.indexOf('|') - 1)
                const umurUser = q.substring(q.lastIndexOf('|') + 2)
                const serialUser = createSerial(20)
                if (Number(umurUser) >= 99) return await myst.reply(from, pt.ageOld(), id)
                register.addRegisteredUser(sender.id, namaUser, umurUser, time, serialUser, _registered)
                await myst.reply(from, pt.registered(namaUser, umurUser, sender.id, time, serialUser), id)
                console.log(color('[REGISTRO]'), color(time, 'yellow'), 'Nome:', color(namaUser, 'cyan'), 'Idade:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
            break
            // Level [BETA] by Slavyan
            case prefix+'level':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isLevelingOn) return await myst.reply(from, pt.levelingNotOn(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                const userLevel = level.getLevelingLevel(sender.id, _level)
                const userXp = level.getLevelingXp(sender.id, _level)
				const userRank = level.getUserRank(sender.id, _level)
                const ppLink = await myst.getProfilePicFromServer(sender.id)
                if (ppLink === undefined) {
                    var pepe = errorImg
                } else {
                    pepe = ppLink
                }
                const requiredXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                const rank = new canvacord.Rank()
                    .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setLevelColor('#ffa200', '#ffa200')
                    .setCurrentXP(userXp)
                    .setOverlay('#000000', 100, false)
					.setRank(Number(userRank))
                    .setRequiredXP(requiredXp)
                    .setProgressBar('#ffa200', 'COLOR')
                    .setBackground('COLOR', '#000000')
                    .setUsername(pushname)
                    .setDiscriminator(sender.id.substring(6, 10))
                rank.build()
                    .then(async (buffer) => {
                        const imageBase64 = `data:image/png;base64,${buffer.toString('base64')}`
                        await myst.sendImage(from, imageBase64, 'rank.png', '', id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'nivel':
			case prefix+'nível':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isLevelingOn) return await myst.reply(from, pt.levelingNotOn(), id)
                    var _msgcount = JSON.parse(fs.readFileSync(`./database/groupsMsgs/${idgp}.json`))
					const userLevel1 = level.getLevelingLevel(sender.id, _level)
					const userXp1 = level.getLevelingXp(sender.id, _level)
					const userRank1 = level.getUserRank(sender.id, _level)
					const mensagens1 = messages.getMsg(user, _msgcount)
					const requiredXp1 = 5 * Math.pow(userLevel1, 2) + 50 * userLevel1 + 100
					await myst.reply(from, `*「 Nivel 」*\n\n➸ *Nome*: ${pushname}\n➸ *XP*: ${userXp1} / ${requiredXp1}\n➸ *Level*: ${userLevel1}\n➸ *Elo*: *${role}*\n➸ *Ranking*: *${userRank1}*\n➸ *Mensagens*: ${mensagens1}`, id)
			break
            case prefix+'ranking':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isLevelingOn) return await myst.reply(from, pt.levelingNotOn(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '*── 「 MELHORES 」 ──*\n\n'
                try {
                    for (let i = 0; i < 10; i++) {
						const resp = level.getLevelingLevel(_level[i].id, _level)
                        var roles = 'Cobre'
                        if (resp <= 4) { roles = 'Bronze I' } else if (resp <= 10) { roles = 'Bronze II' } else if (resp <= 15) { roles = 'Bronze III' } else if (resp <= 20) { roles = 'Bronze IV' } else if (resp <= 25) { roles = 'Bronze V' } else if (resp <= 30) { roles = 'Prata I' } else if (resp <= 35) { roles = 'Prata II' } else if (resp <= 40) { roles = 'Prata III' } else if (resp <= 45) { roles = 'Prata IV' } else if (resp <= 50) { roles = 'Prata V' } else if (resp <= 55) { roles = 'Ouro I' } else if (resp <= 60) { roles = 'Ouro II' } else if (resp <= 65) { roles = 'Ouro III' } else if (resp <= 70) { roles = 'Ouro IV' } else if (resp <= 75) { roles = 'Ouro V' } else if (resp <= 80) { roles = 'Diamante I' } else if (resp <= 85) { roles = 'Diamante II' } else if (resp <= 90) { roles = 'Diamante III' } else if (resp <= 95) { roles = 'Diamante IV' } else if (resp <= 100) { roles = 'Diamante V' } else if (resp <= 200) { roles = 'Diamante Mestre' } else if (resp <= 300) { roles = 'Elite' } else if (resp <= 400) { roles = 'Global' } else if (resp <= 500) { roles = 'Herói' } else if (resp <= 600) { roles = 'Lendário' } else if (resp <= 700) { roles = 'Semi-Deus' } else if (resp <= 800) { roles = 'Arcanjo' } else if (resp <= 900) { roles = 'Demoníaco' } else if (resp <= 1000 || resp >= 1000) { roles = 'Divindade' }
						var aRandNe = await myst.getContact(_level[i].id)
						var getTheName = aRandNe.pushname
						if (getTheName == null) getTheName = 'wa.me/' + _level[i].id.replace('@c.us', '')
                        leaderboard += `${i + 1}. *${getTheName}*\n➸ *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n➸ *Role*: ${roles}\n\n`
                    }
                    await myst.reply(from, leaderboard, id)
                } catch (err) {
                    console.error(err)
                    await myst.reply(from, pt.minimalDb(), id)
                }
            break
			case prefix+'ativos':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(pushname), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
            var _msgcount = JSON.parse(fs.readFileSync(`./database/groupsMsgs/${idgp}.json`))
			_msgcount.sort((a, b) => (a.msg < b.msg) ? 1 : -1)
            let active = '──── 「 *Ativos*  」 ────\n\n'
            try {
                for (let i = 0; i < 10; i++) {
					var aRandVar = await myst.getContact(_msgcount[i].id)
					if (aRandVar == null) aRandVar = 'wa.me/' + _msgcount[i].id.replace('@c.us', '')
					var getPushname = aRandVar.pushname
					if (getPushname == null) getPushname = 'wa.me/' + _msgcount[i].id.replace('@c.us', '')
					active += `${i + 1} → *${getPushname}*\n➸ *Mensagens*: ${_msgcount[i].msg}\n\n`
				}
                await myst.sendText(from, active)
            } catch (error) { 
				await myst.reply(from, pt.minimalDb(), id)
				console.log(error)
				console.log(color('[ATIVOS]', 'crimson'), color(`→ Obtive erros no comando ${command} → ${error.message} - Você pode ignorar.`, 'gold'))
			}
            break
			case prefix+'geral':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(pushname), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
            var _msgcount = JSON.parse(fs.readFileSync(`./database/groupsMsgs/${idgp}.json`))
            let active1 = '──── 「 *Geral*  」 ────\n\n'
            try {
                for (let i = 0; i < groupMembers.length; i++) {
                    const bRandV = await myst.getContact(groupMembers[i].id)
                    const msgCount = await messages.getMsg(groupMembers[i].id, _msgcount)
					var getPushname1 = bRandV.pushname
					if (getPushname1 == null) getPushname1 = 'wa.me/' + groupMembers[i].id.replace('@c.us', '')
					active1 += `→ *${getPushname1}*\n➸ *Mensagens*: ${msgCount}\n\n`
				}
                await myst.sendText(from, active1)
            } catch (error) { 
				await myst.reply(from, pt.minimalDb(), id)
				console.log(error)
				console.log(color('[ATIVOS]', 'crimson'), color(`→ Obtive erros no comando ${prefix}${command} → ${error.message} - Você pode ignorar.`, 'gold'))
			}
            break
			case prefix+'rolette':
			case prefix+'roleta':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(pushname), id)
			const checkxpr = level.getLevelingXp(sender.id, _level)
			if (args.length !== 1 || checkxpr <= 1000 || isNaN(args[0]) || Number(args[0]) >= checkxpr || Number(args[0]) >= '501') return myst.reply(from, pt.gaming(checkxpr), id)
			var nrolxp = Math.floor(Math.random() * -(Number(args[0]))) - Number(args[0]);
			var prolxp = Math.floor(Math.random() * Number(args[0])) + Number(args[0]);
			const limitrl = tempjogo.getLimit(sender.id, _itvl)
			if (limitrl !== undefined && cdj - (Date.now() - limitrl) > 0) {
                await myst.reply(from, pt.limitgame(), id)
			} else {
				if (Math.floor(Math.random() * 2) + 1 == 1) {
					await myst.sendGiphyAsSticker(from, 'https://media.giphy.com/media/e5VagnBefZRy3YDhwc/source.gif')
					await myst.reply(from, pt.loseshot(nrolxp), id)
					 level.addLevelingXp(sender.id, nrolxp, _level)
				} else if (Math.floor(Math.random() * 2) + 1 == 2) {
					await myst.sendGiphyAsSticker(from, 'https://media.giphy.com/media/PY5IQbGg5daJvivOH3/source.gif')
					await myst.reply(from, pt.winshot(prolxp), id)
					level.addLevelingXp(sender.id, prolxp, _level)
				}
				tempjogo.addLimit(sender.id, _itvl)
			}
			break
            // Downloader
            case prefix+'igdl': // by: VideFrelan
            case prefix+'instadl':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isUrl(url) && !url.includes('instagram.com')) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                downloader.insta(url)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.post.length; i++) {
                            if (result.post[i].type === 'image') {
                                await myst.sendFileFromUrl(from, result.post[i].urlDownload, 'igpostdl.jpg', `*...:* *Instagram Downloader* *:...*\n\nUsuario: ${result.owner_username}\nLegends: ${result.caption}`, id)
                            } else if (result.post[i].type === 'video') {
                                await myst.sendFileFromUrl(from, result.post[i].urlDownload, 'igpostdl.mp4', `*...:* *Instagram Downoader* *:...*\n\nUsuário: ${result.owner_username}\nLegenda: ${result.caption}`, id)
                            }
                        }
                        console.log('Instagram media foi mando com sucesso!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break 
            case prefix+'facebook':
            case prefix+'fb':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(pushname), id)
                if (!isUrl(url) && !url.includes('facebook.com')) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                downloader.fb(url)
                    .then(async ({ result }) => {
                            await myst.sendFileFromUrl(from, result.VideoUrl, 'videofb.mp4', '', id)
                            console.log(from, 'Facebook video foi mando com sucesso!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'tiktokpic':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                try {
                    console.log(`Pegando a foto de perfil do ${q}`)
                    const tkt = await axios.get(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${q}`)
                    if (tkt.data.error) return myst.reply(from, tkt.data.error, id)
                    await myst.sendFileFromUrl(from, tkt.data.result, 'tiktokpic.jpg', 'Pronto! :D', id)
                    console.log('TikTok Pfp foi mando com sucesso!')
                } catch (err) {
                    console.error(err)
                    await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                }
            break
            case prefix+'tiktoknowm': // by: VideFrelan
            case prefix+'tktnowm':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isUrl(url) && !url.includes('tiktok.com')) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                downloader.tikNoWm(url)
                    .then(async ({ result }) => {
                        await myst.sendFileFromUrl(from, result.thumb, 'TiktokNoWM.jpg', `➸ *Usuário*: ${result.username}\n➸ *Legenda*: ${result.caption}\n➸ *Data de envio*: ${result.uploaded_on}`, id)
                        const responses = await fetch(result.link)
                        const buffer = await responses.buffer()
                        fs.writeFileSync(`./temp/${sender.id}_TikTokNoWm.mp4`, buffer)
                        await myst.sendFile(from, `./temp/${sender.id}_TikTokNoWm.mp4`, `${sender.id}_TikTokNoWm.mp4`, '', id)
                        console.log('TikTok video sem wm foi mando com sucesso!')
                        fs.unlinkSync(`./temp/${sender.id}_TikTokNoWm.mp4`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'tiktok':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isUrl(url) && !url.includes('tiktok.com')) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                downloader.tik(url)
                    .then(async ({ result })=> {
                        await myst.sendFileFromUrl(from, result.video, 'TikTok.mp4', '', id)
                        console.log('TikTok video foi mando com sucesso!')
                    })
                    .catch(async (err) => {
                        console.log(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'twitter':
            case prefix+'twt':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isUrl(url) && !url.includes('twitter.com')) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                downloader.tweet(url)
                    .then(async (data) => {
                        if (data.type === 'video') {
                            const content = data.variants.filter((x) => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                            const result = await misc.shortener(content[0].url)
                            console.log('Shortlink:', result)
                            await myst.sendFileFromUrl(from, content[0].url, 'video.mp4', `Link HD: ${result}`, id)
                                .then(() => console.log('Twitter media foi mando com sucesso!'))
                                .catch(async (err) => {
                                    console.error(err)
                                    await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                                })
                        } else if (data.type === 'photo') {
                            for (let i = 0; i < data.variants.length; i++) {
                                await myst.sendFileFromUrl(from, data.variants[i], data.variants[i].split('/media/')[1], '', id)
                                .then(() => console.log('Twitter media foi mando com sucesso!'))
                                .catch(async (err) => {
                                    console.error(err)
                                    await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                                })
                            }
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            // Misc
            case prefix+'ocr': // by: VideFrelan
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage || isQuotedSticker) {
                    await myst.reply(from, pt.wait(), id)
                    const encryptMedia = isQuotedImage || isQuotedSticker ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    fs.writeFileSync(`./temp/${sender.id}.jpg`, mediaData)
                    ocrtess.recognize(`./temp/${sender.id}.jpg`, ocrconf)
                        .then(async (text) => {
                            await myst.reply(from, `*...:* *OCR RESULT* *:...*\n\n${text}`, id)
                            fs.unlinkSync(`./temp/${sender.id}.jpg`)
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                        })
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'google': // chika-chantekkzz
            case prefix+'gs':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                google({ 'query': q, 'no-display': true })
                    .then(async (results) => {
                        let txt = `── 「 *Pesquisa Google* 」 ──\n\nResultados para: _*${q}*_`
                        for (let i = 0; i < results.length || i < 10; i++) {
                            txt += `\n\n➸ *Titulo*: ${results[i].title}\n➸ *Desc*: ${results[i].snippet}\n➸ *Link*: ${results[i].link}\n\n────────────────────────`
                        }
                        await myst.reply(from, txt, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'screenshot':
            case prefix+'ss':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                if (!isUrl(url)) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Pesquisando screenshot')
                await myst.sendFileFromUrl(from, `https://api.apiflash.com/v1/urltoimage?access_key=${config.apiflash}&url=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('A imagem foi criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'falar':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.sendText(from, q)
            break
            case prefix+'afk': // by Slavyan
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                const razao = q ? q : 'Nenhuma.'
                afk.addAfkUser(sender.id, time, razao, _afk)
                await myst.reply(from, pt.afkOn(pushname, razao), id)
            break
            case prefix+'myst':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                const mystfl = await axios.get(`https://api.simsimi.net/v1/?text=${q}&lang=pt&cf=true`)
                await myst.reply(from, mystfl.data.messages[0].response, id)
            break
            case prefix+'lyric':
            case prefix+'letra':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                misc.lirik(q)
                    .then(async ({ result }) => {
                        if (result.code !== 200) return await myst.reply(from, 'Não encontrado!', id)
                        await myst.reply(from, result.result, id)
                        console.log('Letra foi mando com sucesso!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'sl':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isUrl(url)) return await myst.reply(from, pt.wrongFormat(), id)
                const urlShort = await misc.shortener(url)
                await myst.reply(from, pt.wait(), id)
                await myst.reply(from, urlShort, id)
                console.log('Feito!')
            break
            case prefix+'corona': // by CHIKAA CHANTEKKXXZZ
            case prefix+'coronavirus':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                misc.corona(q)
                    .then(async (res) => {
                        await myst.sendText(from, '🌎️ Covid Inf. - ' + q.charAt(0).toUpperCase() + q.slice(1) + ' 🌍️\n\n✨️ Casos totais: ' + `${res.cases}` + '\n📆️ Casos hoje: ' + `${res.todayCases}` + '\n☣️ Mortes totais: ' + `${res.deaths}` + '\n☢️ Mortes hoje: ' + `${res.todayDeaths}` + '\n⛩️ Casos ativos: ' + `${res.active}` + '.')
                        console.log('Resultado foi mando com sucesso!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'ttp': // CHIKAA CHANTEKKXXZZ
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                await axios.get(`https://api.xteam.xyz/ttp?file&text=${q}`, { responseType: 'arraybuffer' }).then(async (response) => {
                const attp = Buffer.from(response.data, 'binary').toString('base64')
                await myst.sendImageAsSticker(from, attp, { author: authorWm, pack: packWm, keepScale: true })
                })
                    .then(() => console.log('Gif criado com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)    
                    })
            break
            case prefix+'instastory': // By: VideFrelan
            case prefix+'igst':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                misc.its(q)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.story.itemlist.length; i++) {
                            const { urlDownload } = result.story.itemlist[i]
                            await myst.sendFileFromUrl(from, urlDownload, '', 'By: Gahtee', id)
                            console.log('IG Story foi mando com sucesso!')
                        }
                    })
            break
            case prefix+'findsticker':
            case prefix+'ssticker':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                try {
                    misc.sticker(q)
                        .then(async ({ result }) => {
                            if (result.response !== 200) return await myst.reply(from, 'Não Encontrado!', id)
                            for (let i = 0; i < result.data.length; i++) {
                                await myst.sendStickerfromUrl(from, result.data[i], null, { author: authorWm, pack: packWm })
                            }
                            console.log('Sticker foi mando com sucesso!')
                        })
                } catch (err) {
                    console.error(err)
                    await myst.reply(from, `Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908\n\n${err}`, id)
                }
            break
            case prefix+'filme':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
            break
            case prefix+'distancia':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                const cid1 = q.substring(0, q.indexOf('|') - 1)
                const cid2 = q.substring(q.lastIndexOf('|') + 2)
                const datat = await axios.get(`https://api.vhtear.com/distance?from=${cid1}&to=${cid2}&apikey=${config.vhtear}`)
                    var dadost = datat.data.result.data.split(' :')
                    var dadosd = {
                        de: dadost[1].split('\n')[0],
                        para: dadost[2].split('\n')[0],
                        DT: dadost[2].split('\n')[2].split('driving')[0],
                        DF: dadost[2].split('\n')[2].split('driving')[1].split('flying')[0],
                        HT: dadost[3].split('\n')[0],
                        HF: dadost[4].split('\n')[0]
                    }
                await myst.sendText(from, `De:${dadosd.de}\nPara:${dadosd.para}\nDistancia terreste: ${dadosd.DT}\nDistancia Voo: ${dadosd.DF}\nTempo em carro:${dadosd.HT}\nTempo em voo:${dadosd.HF}`)
            break
            case prefix+'ytsearch':
            case prefix+'yts':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                try {
                    misc.ytSearch(q)
                        .then(async ({ result }) => {
                            for (let i = 0; i < 5; i++) {
                                const { urlyt, image, title, channel, duration, views } = await result[i]
                                await myst.sendFileFromUrl(from, image, `${title}.jpg`, pt.ytResult(urlyt, title, channel, duration, views), id)
                                console.log('Pesquisa do YT foi mando com sucesso!')
                            }
                        })
                } catch (err) {
                    console.error(err)
                    await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                }
            break
			case prefix+'tts':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!q) return await myst.reply(from, pt.wrongFormat(), id)
			try {
				const dataText = body.slice(8)
				var langtts = args[0]
				if (args[0] == 'br') langtts = 'pt-br'
				var idptt = tts(langtts)
					idptt.save(`./temp/audio/res${idptt}.mp3`, dataText, async () => {
					await delay(3000)
					await myst.sendPtt(from, `./temp/audio/res${idptt}.mp3`, id)
				})
			} catch (error) { 
				await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
				console.log(color('[TTS]', 'crimson'), color(`→ Obtive erros no comando ${prefix}${command} → ${error.message} - Você pode ignorar.`, 'gold'))
			}
            break
            case prefix+'paramp3': // by: Piyobot
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isMedia && isVideo || isQuotedVideo) {
                    await myst.reply(from, pt.wait(), id)
                    const encryptMedia = isQuotedVideo ? quotedMsg : message
                    const _mimetype = isQuotedVideo ? quotedMsg.mimetype : mimetype
                    console.log(color('[WAPI]', 'green'), 'Baixando e descriptografando a media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, 'video', `${name}.${_mimetype.replace(/.+\//, '')}`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processamento terminado!')
                                await myst.sendFile(from, fileOutputPath, 'audio.mp3', '', id)
                                console.log(color('[WAPI]', 'green'), ' mp3!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'dado':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                var dado = 'd6'
                if (q.includes('d20') || q.includes('20')) {var dado = 'd20'}
                const dadon = await axios.get(`http://roll.diceapi.com/html/${dado}`)
                await myst.sendImageAsSticker(from, dadon.data.split('"')[1], { author: authorWm, pack: packWm, keepScale: true })
            break
            case prefix+'dadoav':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                const dadoav = await axios.get(`https://rolz.org/api/?${q}.json`)
                await myst.reply(from, `── 「 *Dados Avançados* 」 ──\n\nVocê rolou: *${dadoav.data.input}*\nO resultado foi: *${dadoav.data.result}*\nDetalhes: ${dadoav.data.details}`, id)
            break
            case prefix+'calc':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                if (typeof mathjs.evaluate(q) !== 'number') {
                    await myst.reply(from, pt.notNum(q), id)
                } else {
                    await myst.reply(from, `*── 「 Cálculo 」 ──*\n\n${q} = ${mathjs.evaluate(q)}`, id)
                }
            break
            case prefix+'ytmp3':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (url.includes('youtu.be')) var idm = url.split('.be/')[1]
                if (url.includes('watch')) var idm = url.split('watch?v=')[1]
                if (url.includes('shorts')) var idm = (url.split('shorts/')[1]).split('?feature')[0]
                if (!isUrl(url) && !url.includes('youtu.be') && !url.includes('youtube.com')) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                downloader.ytdl(idm)
                    .then(async ({ result }) => {
                        if (result.status === 'error') {
                            await myst.reply(from, result.pesan, id)
                        } else if (Number(result.size.split(' MB')[0]) >= 30) {
                            await myst.sendText(from, pt.videoLimit()+result.UrlMp3)
                            console.log('Link da música '+result.title+' foi mando com sucesso!')
                        } else {
                            await myst.sendFileFromUrl(from, result.imgUrl, `${result.title}.jpg`, pt.ytFoundM(result), id)
                            await myst.sendFileFromUrl(from, result.UrlMp3, `${result.title}.mp3`, '', id)
                            console.log('Musica '+result.title+' foi mando com sucesso!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'ytmp4':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (url.includes('youtu.be')) var idv = url.split('.be/')[1]
                if (url.includes('watch')) var idv = url.split('watch?v=')[1]
                if (url.includes('shorts')) var idv = (url.split('shorts/')[1]).split('?feature')[0]
                if (!isUrl(url) && !url.includes('youtu.be') && !url.includes('youtube.com')) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                downloader.ytdl(idv)
                    .then(async ({ result }) => {
                        if (result.status === 'error') {
                            await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                        } else {
                            await myst.sendFileFromUrl(from, result.imgUrl, `${result.title}.jpg`, pt.ytFoundV(result), id)
                            console.log('Video '+result.title+' foi enviado com sucesso!' )
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'play':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                    if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                if (isUrl(q)) return await myst.reply(from, 'Opa! para o comando /play você apenas deve pesquisar as músicas! para baixar diretamente via link, use o /ytmp3', id)    
                await myst.reply(from, pt.wait(), id)
                console.log(encodeURI(q))
                downloader.ytPlay(encodeURI(q))
                    .then(async ({ result }) => {
                        if (Number(result.size.split(' MB')[0]) >= 30) {
                            await myst.sendText(from, '*'+result.title+'*\n\n'+pt.videoLimit()+result.mp3)
                            console.log('Link da música '+result.title+' foi mando com sucesso!')
                        } else {
                        await myst.sendFileFromUrl(from, result.image, `${result.title}.jpg`, pt.ytPlay(result), id)
                        await myst.sendFileFromUrl(from, result.mp3, `${user}.mp3`, id)
                        /*
                        const responses = await fetch(result.mp3)
                        const buffer = await responses.buffer()
                        await fs.writeFile(`./temp/audio/ytplay_${user}.mp3`, buffer)
                        await myst.sendFile(from, `./temp/audio/ytplay_${user}.mp3`, `ytplay_${user}`, id)
                        console.log('Musica do YT foi mando com sucesso!')
                        fs.unlinkSync(`./temp/audio/ytplay_${user}.mp3`)
                        */
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'whois':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (args.length !== 1) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                misc.whois(args[0])
                    .then(async ({ result }) => {
                        await myst.reply(from, `*── 「 WHOIS 」 ──*\n\n➸ *Endereço de IP*: ${result.ip_address}\n➸ *Cidade*: ${result.city}\n➸ *Região*: ${result.region}\n➸ *País*: ${result.country}\n➸ *CEP*: ${result.postal_code}\n➸ *Latitude e longitude*: ${result.latitude_longitude}\n➸ *Time zone*: ${result.time_zone}\n➸ *Prefixo ligação*: ${result.calling_code}\n➸ *Moeda*: ${result.currency}\n➸ *Lingua*: ${result.languages}\n➸ *ASN*: ${result.asn}\n➸ *Organização*: ${result.org}`, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'local':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                var local = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${q}&limit=1&type=locality&apiKey=c4ab25744b7349c8a1ba0ea5e9576c25`)
                var long = local.data.features[0].properties.lon
                var lati = local.data.features[0].properties.lat
                var lnome = local.data.features[0].properties.formatted
                await myst.sendLocation(from, lati, long, lnome)
            break
            case prefix+'email': // By: VideFrelan
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q.includes('|')) return await myst.reply(from, pt.wrongFormat(), id)
                const emailTarget = q.substring(0, q.indexOf('|') - 1)
                const subjectEmail = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const messageEmail = q.substring(q.lastIndexOf('|') + 2)
                await myst.reply(from, pt.wait(), id)
                misc.email(emailTarget, subjectEmail, messageEmail)
                    .then(async ({ result }) => {
                        if (result.status === '204') {
                            await myst.reply(from, 'Servidor cheio! tente novamente mais tarde', id)
                        } else {
                            await myst.reply(from, `*Email mandado com sucesso*!\n➸ *Alvo*: ${emailTarget}\n➸ *Assunto*: ${result.subjek}\n➸ *Menssagem*: ${result.pesan}`, id)
                            console.log('Email foi mando com sucesso!')
                        }
                    })
            break
            case prefix+'addsticker': // by @hardianto02_
            case prefix+'addstiker':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id) 
                if (isQuotedSticker) {
                    if (_stick.includes(q)) {
                        await myst.reply(from, pt.stickerAddAlready(q), id)
                    } else { 
                        _stick.push(q)
                        fs.writeFileSync('./database/bot/sticker.json', JSON.stringify(_stick))
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        fs.writeFileSync(`./temp/sticker/${q}.webp`, mediaData)
                        await myst.reply(from, pt.stickerAdd(), id)
                    }
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'delsticker':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (_stick.includes(q)) {
                    _stick.splice(q, 1)
                    fs.writeFileSync('./database/bot/sticker.json', JSON.stringify(_stick))
                    fs.unlinkSync(`./temp/sticker/${q}.webp`)
                    await myst.reply(from, pt.stickerDel(), id)
                } else {
                    await myst.reply(from, pt.stickerNotFound())
                }
            break
			case prefix+'akinator':
			case prefix+'aki':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
			try {
				if (args[0] == 'sim') {
					const myAnswer = 0;
					await aki.step(myAnswer);
					jogadas = jogadas + 1
					if (aki.progress >= 90 || aki.currentStep >= 90) {
						await aki.win()
						var akiwon = aki.answers[0]
						await myst.sendFileFromUrl(from, `${akiwon.absolute_picture_path}`, '', pt.akiwon(aki, akiwon), id)
					} else { await myst.reply(from, pt.akistart(aki), id) }
				} else if (args[0] == 'nao' ||args[0] == 'não') {
					const myAnswer = 1;
					await aki.step(myAnswer);
					jogadas = jogadas + 1
					if (aki.progress >= 90 || aki.currentStep >= 90) {
						await aki.win()
						var akiwon = aki.answers[0]
						await myst.sendFileFromUrl(from, `${akiwon.absolute_picture_path}`, '', pt.akiwon(aki, akiwon), id)
					} else { await myst.reply(from, pt.akistart(aki), id) }
				} else if (args[0] == 'ns') {
					const myAnswer = 2;
					await aki.step(myAnswer);
					jogadas = jogadas + 1
					if (aki.progress >= 90 || aki.currentStep >= 90) {
						await aki.win()
						var akiwon = aki.answers[0]
						await myst.sendFileFromUrl(from, `${akiwon.absolute_picture_path}`, '', pt.akiwon(aki, akiwon), id)
					} else { await myst.reply(from, pt.akistart(aki), id) }
				} else if (args[0] == 'voltar') {
					await aki.back()
					await myst.reply(from, pt.akistart(aki), id)
				} else if (args[0] == 'novo') {
					for (let i = 0; i < jogadas; i++) { await aki.back() }
					jogadas = 0
					await myst.reply(from, pt.akistart(aki), id)
				} else {
					await aki.start()
					return myst.reply(from, pt.akistart(aki) + pt.akituto(), id)
					await myst.reply(from, pt.akituto(), id)
				}
			} catch (error) {
				await myst.reply(from, pt.akifail(), id)
				await myst.reply(from, pt.akistart(aki), id)
				console.log(color('[AKINATOR]', 'crimson'), color(`→ Obtive erros no comando ${prefix}${command} → ${error.message} - Você pode ignorar.`, 'gold'))
			}
			break
            case prefix+'stickerlist':
            case prefix+'liststicker':
            case prefix+'stikerlist':
            case prefix+'liststiker':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                let stickerList = `*── 「 Catálogo de Sticker 」 ──*\nTotal: ${_stick.length}\n\n`
                for (let i of _stick) {
                    stickerList += `➸ ${i.replace(_stick)}\n`
                }
                await myst.sendText(from, stickerList)
            break
            case prefix+'lembrete': // by Slavyan
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q.includes('|')) return await myst.reply(from, pt.wrongFormat(), id)
                const timeRemind = q.substring(0, q.indexOf('|') - 1)
                const messRemind = q.substring(q.lastIndexOf('|') + 2)
                const parsedTime = ms(toMs(timeRemind))
                reminder.addReminder(sender.id, messRemind, timeRemind, _reminder)
                await myst.sendTextWithMentions(from, pt.reminderOn(messRemind, parsedTime, sender))
                const intervRemind = setInterval(async () => {
                    if (Date.now() >= reminder.getReminderTime(sender.id, _reminder)) {
                        await myst.sendTextWithMentions(from, pt.reminderAlert(reminder.getReminderMsg(sender.id, _reminder), sender))
                        _reminder.splice(reminder.getReminderPosition(sender.id, _reminder), 1)
                        fs.writeFileSync('./database/user/reminder.json', JSON.stringify(_reminder))
                        clearInterval(intervRemind)
                    }
                }, 1000)
            break
            case prefix+'imagetourl':
            case prefix+'imgtourl':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await myst.reply(from, pt.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                    await myst.reply(from, linkImg, id)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'trending':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.reply(from, pt.wait(), id)
                misc.trendingTwt()
                    .then(async ({ result }) => {
                        let txt = '*── 「 Trending Twitter 」 ──*'
                        for (let i = 0; i < result.length; i++) {
                            const { hastag, rank, tweet, link } = result[i]
                            txt += `\n\n${rank}. *${hastag}*\n➸ *Tweets*: ${tweet}\n➸ *Link*: ${link}`
                        }
                        await myst.reply(from, txt, id)
                        console.log('TT trending Imagem criada com sucesso!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'traduzir':
            case prefix+'trans':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q.includes('|')) return await myst.reply(from, pt.wrongFormat(), id)
                const texto = q.substring(0, q.indexOf('|') - 1)
                const languaget = q.substring(q.lastIndexOf('|') + 2)
                misc.translate(texto, {to: languaget}).then(res => {myst.reply(from, res.text, id)})
            break
            case prefix+'dicionario':
            case prefix+'dicionário':
            case prefix+'dicio':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                const defin = await axios.get(`https://significado.herokuapp.com/meanings/${q}`)
                var palavra = {
                            palavra: `${q}`,
                            def: 'Sem Informações',
                            classe: 'Sem informações',
                            etmo: 'Sem Informações',
                            def2: 'Sem Informações',
                            classe2: 'Sem informações',
                            etmo2: 'Sem Informações'
                        }
                if (defin.data[0].class[0] !== undefined){
                    palavra.classe = defin.data[0].class[0];
                    palavra.def = defin.data[0].meanings[0];
                    palavra.etmo = defin.data[0].etymology[0];
                }
                if (defin.data[0].class[1] !== undefined){
                    palavra.def2 = defin.data[0].meanings[1];
                }
                await myst.reply(from, `── 「 *Dicio* 」 ──\n\n*Palavra:* ${palavra.palavra}\n\n*Classe:* ${palavra.classe}\n\n*Definição:* ${palavra.def}\n\n*Definição 2:* ${palavra.def2}`, id)
            break
            case prefix+'bass':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (args[0] >=101) return await myst.reply(from, 'Só é permitido até o nivel 100', id)
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                    if (args.length !== 1) return await myst.reply(from, pt.wrongFormat(), id)
                    await myst.reply(from, pt.wait(), id)
                    const encryptMedia = isQuotedAudio || isQuotedVoice ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Baixando e descriptografando a media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter(`equalizer=f=40:width_type=h:width=50:g=${args[0]}`)
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processamento finalizado!')
                                await myst.sendPtt(from, fileOutputPath, id)
                                console.log(color('[WAPI]', 'green'), ' audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'nightcore':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                    await myst.reply(from, pt.wait(), id)
                    const encryptMedia = isQuotedAudio || isQuotedVoice ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Baixando e descriptografando a media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter('asetrate=44100*1.25')
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processo finalizado!')
                                await myst.sendPtt(from, fileOutputPath, id)
                                console.log(color('[WAPI]', 'green'), ' audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            // Bot
            case prefix+'menu':
            case prefix+'help':
                const jumlahUser = _registered.length
                const levelMenu = level.getLevelingLevel(sender.id, _level)
                const xpMenu = level.getLevelingXp(sender.id, _level)
                const reqXpMenu = 5 * Math.pow(levelMenu, 2) + 50 * 1 + 100
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (args[0] === 'down') {
                    await myst.sendText(from, pt.menuDownloader())
                } else if (args[0] === 'dados') {
                    await myst.sendText(from, pt.menuBot())
                } else if (args[0] === 'mais') {
                    await myst.sendText(from, pt.menuMisc())
                } else if (args[0] === 'sticker') {
                    await myst.sendText(from, pt.menuSticker())
                } else if (args[0] === 'otaku') {
                    await myst.sendText(from, pt.menuWeeaboo())
                } else if (args[0] === 'maker') {
                    await myst.sendText(from, pt.menuFun())
                } else if (args[0] === 'admins') {
                    await myst.sendText(from, pt.menuModeration())
                } else if (args[0] === 'nsfw') {
                    if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    await myst.sendText(from, pt.menuNsfw())
                } else if (args[0] === 'dono') {
                    if (!isOwner) return await myst.reply(from, pt.ownerOnly())
                    await myst.sendText(from, pt.menuOwner())
                } else if (args[0] === 'level') {
                    if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                    await myst.sendText(from, pt.menuLeveling())
				} else if (args[0] === 'policia' || args[0] == 'polícia') {
					if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                    await myst.sendText(from, pt.menuPolicia())
                } else if (args[0] === 'fofo') {
                    await myst.sendText(from, pt.menuFofo())
                } else {
                    await myst.sendText(from, pt.menu(jumlahUser, levelMenu, xpMenu, role, pushname, reqXpMenu, isPremium ? 'YES' : 'NO'))
                }
            break
            case prefix+'regras':
            case prefix+'rule':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.sendText(from, pt.rules())
            break
            case prefix+'nsfw':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (ar[0] === 'on') {
                    if (isNsfw) return await myst.reply(from, pt.nsfwAlready(), id)
                    _nsfw.push(groupId)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await myst.reply(from, pt.nsfwOn(), id)
                } else if (ar[0] === 'off') {
                    _nsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await myst.reply(from, pt.nsfwOff(), id)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'status':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.sendText(from, `*RAM*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem / 1024 / 1024)} MB\n*CPU*: ${os.cpus()[0].model}`)
            break
            case prefix+'blist':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                let block = pt.listBlock(blockNumber)
                for (let i of blockNumber) {
                    block += `@${i.replace('@c.us', '')}\n`
                }
                await myst.sendTextWithMentions(from, block)
            break
            case prefix+'dono':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.sendContact(from, ownerNumber)
            break
            case prefix+'runtime': // BY HAFIZH
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                const formater = (seconds) => {
                    const pad = (s) => {
                        return (s < 10 ? '0' : '') + s
                    }
                    const hrs = Math.floor(seconds / (60 * 60))
                    const mins = Math.floor(seconds % (60 * 60) / 60)
                    const secs = Math.floor(seconds % 60)
                    return ' ' + pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
                }
                const uptime = process.uptime()
                await myst.reply(from, `*── 「 BOT ATIVO 」 ──*\n\n❏${formater(uptime)}`, id)
            break
            case prefix+'ping':
            case prefix+'p':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.sendText(from, `Pong!\nSpeed: ${processTime(t, moment())} secs`)
            break
            case prefix+'delete':
            case prefix+'del':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!quotedMsg) return await myst.reply(from, pt.wrongFormat(), id)
                if (!quotedMsgObj.fromMe) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
			case prefix+'qr':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
					if (args.length == 0) return myst.reply(from, pt.wrongFormat(), id)
					await myst.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${body.slice(4)}`, id)
			break
			case prefix+'qrler':
				if (isMedia && type === 'image' || isQuotedImage) {
					await myst.reply(from, pt.wait(), id)
					const qrData = isQuotedImage ? quotedMsg : message
					const qrupm = await decryptMedia(qrData, uaOverride)
					const qrUpl = await uploadImages(qrupm, `${sender.id}_img`)
					const qrR = await axios.get(`https://api.qrserver.com/v1/read-qr-code/?fileurl=${qrUpl}`)
					await myst.reply(from, pt.qr(qrR), id)
				} else return myst.reply(from, pt.wrongFormat(), id)
			break
            case prefix+'rbug':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.emptyMess(), id)
				if (isGroupMsg) {
                        await myst.sendText(ownerNumber, `*── 「 BUG 」 ──*\n\n*De*: ${pushname}\n*ID*: ${sender.id}\n*Grupo*: ${(name || formattedTitle)}\n*Mensagem*: ${q}`)
                        await myst.reply(from, pt.received(pushname), id)
                    } else {
                        await myst.sendText(ownerNumber, `*── 「 BUG 」 ──*\n\n*De*: ${pushname}\n*ID*: ${sender.id}\n*Mensagem*: ${q}`)
                        await myst.reply(from, pt.received(pushname), id)
                    }
            break
            case prefix+'termsofservice1':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.sendLinkWithAutoPreview(from, 'https://github.com/SlavyanDesu/BocchiBot', pt.tos(ownerNumber))
            break
            case prefix+'join':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                if (!isUrl(url) && !url.includes('chat.whatsapp.com')) return await myst.reply(from, pt.wrongFormat(), id)
                const checkInvite = await myst.inviteInfo(url)
                    await myst.joinGroupViaLink(url)
                    await myst.reply(from, pt.ok(), id)
                    await myst.sendText(checkInvite.id, `Oi! sou a Myst! fui chamada para esse grupo e estou aqui para servir!\n\nPara começarmos digite:\n/menu`)
            break
            case prefix+'premiumcheck':
            case prefix+'cekpremium':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                const cekExp = ms(premium.getPremiumExpired(sender.id, _premium) - Date.now())
                await myst.reply(from, `*── 「 Premium 」 ──*\n\n➸ *ID*: ${sender.id}\n➸ *Restante*: ${cekExp.days} dia(s) ${cekExp.hours} hora(s) ${cekExp.minutes} minuto(s)`, id)
            break
            case prefix+'premiumlist':
            case prefix+'listpremium':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                let listPremi = '*── 「 Usuários Premium 」 ──*\n\n'
                const deret = premium.getAllPremiumUser(_premium)
                const arrayPremi = []
                for (let i = 0; i < deret.length; i++) {
                    const checkExp = ms(premium.getPremiumExpired(deret[i], _premium) - Date.now())
                    arrayPremi.push(await myst.getContact(premium.getAllPremiumUser(_premium)[i]))
                    listPremi += `${i + 1}. wa.me/${premium.getAllPremiumUser(_premium)[i].replace('@c.us', '')}\n➸ *Nome*: ${arrayPremi[i].pushname}\n➸ *Restante*: ${checkExp.days} dia(s) ${checkExp.hours} hora(s) ${checkExp.minutes} minuto(s)\n\n`
                }
                await myst.reply(from, listPremi, id)
            break
			case prefix+'qpremium':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.reply(from, pt.qPremium(),id)
            break
			case prefix+'pcmd':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (args[0] === 'dados') {
                    await myst.sendText(from, pt.pDados(), id)
                } else if (args[0] === 'nsfw') {
                    await myst.sendText(from, pt.pNsfw(), id)
                } else if (args[0] === 'maker') {
                    await myst.sendText(from, pt.pMaker(), id)
                } else if (args[0] === 'mais') {
                    await myst.sendText(from, pt.pMais(), id)
                } else {
                    await myst.sendText(from, pt.pcmd(), id)
                }
            break
            case prefix+'pegarfoto':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (mentionedJidList.length !== 0) {
                    const userPic = await myst.getProfilePicFromServer(mentionedJidList[0])
                    if (userPic === undefined) {
                        var pek = errorImg
                    } else {
                        pek = userPic
                    }
                    await myst.sendFileFromUrl(from, pek, 'pic.jpg', '', id)
                } else if (args.length !== 0) {
                    const userPic = await myst.getProfilePicFromServer(args[0] + '@c.us')
                    if (userPic === undefined) {
                        var peks = errorImg
                    } else {
                        peks = userPic
                    }
                    await myst.sendFileFromUrl(from, peks, 'pic.jpg', '', id)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
			case prefix+'gamemode':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (args.length == 0) return myst.reply(from, pt.cors(), id)
				if (args[0] == '0' || args[0] == 's' || args[0] == 'survival') {
					await myst.sendTextWithMentions(from, pt.mine(user) + 'survival.')
						} else if (args[0] == '1' || args[0] == 'c' || args[0] == 'creative') {
					await myst.sendTextWithMentions(from, pt.mine(user) + 'creative.')
						} else if (args[0] == '2' || args[0] == 'a' || args[0] == 'adventure') {
					await myst.sendTextWithMentions(from, pt.mine(user) + 'adventure.')
						} else if (args[0] == '3' || args[0] == 'spectator') {
					await myst.sendTextWithMentions(from, pt.mine(user) + 'espectador.')
						} else return myst.reply(from, pt.cors(), id)
				break
            case prefix+'serial':
                if (!isRegistered) return await myst.reply(from, pt.registered(), id)
                if (isGroupMsg) return await myst.reply(from, pt.pcOnly(), id)
                if (args.length !== 1) return await myst.reply(from, pt.wrongFormat(), id)
                const serials = args[0]
                if (register.checkRegisteredUserFromSerial(serials, _registered)) {
                    const name = register.getRegisteredNameFromSerial(serials, _registered)
                    const age = register.getRegisteredAgeFromSerial(serials, _registered)
                    const time = register.getRegisteredTimeFromSerial(serials, _registered)
                    const id = register.getRegisteredIdFromSerial(serials, _registered)
                    await myst.sendText(from, pt.registeredFound(name, age, time, serials, id))
                } else {
                    await myst.sendText(from, pt.registeredNotFound(serials))
                }
            break
            // Weeb zone
            case prefix+'neko':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Pegando imagem de neko...')
                await myst.sendFileFromUrl(from, (await neko.sfw.neko()).url, 'neko.jpg', '', null, null, true)
                    .then(() => console.log('Imagem de neko Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'wp':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Pegando wallpaper...')
                await myst.sendFileFromUrl(from, (await neko.sfw.wallpaper()).url, 'wallpaper.jpg', '', null, null, true)
                    .then(() => console.log('Wallpaper foi mando com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id )
                    })
            break
            case prefix+'kemono':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Pegando imagem kemonomimi...')
                await myst.sendFileFromUrl(from, (await neko.sfw.kemonomimi()).url, 'kemono.jpg', '', null, null, true)
                    .then(() => console.log('Kemonomimi foi mando com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'ssanime':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await myst.reply(from, pt.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    weeaboo.wait(imageBase64)
                        .then(async (result) => {
                            if (result.docs && result.docs.length <= 0) {
                                return await myst.reply(from, 'Anime não encontrado :(', id)
                            } else {
                                const { title, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
                                let teks = ''
                                if (similarity < 0.92) {
                                    teks = 'Pouca similaridade. 🤔\n\n'
                                } else {
                                    teks += `*Titulo*: ${title}\n*T. Secundario*: ${title_romaji}\n*T. Ocidental*: ${title_english}\n*Episódios*: ${episode}\n*Similaridade*: ${(similarity * 100).toFixed(1)}%`
                                    const video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
                                    await myst.sendFileFromUrl(from, video, `${title_romaji}.mp4`, teks, id)
                                        .then(() => console.log('Anime foi mando com sucesso!'))
                                }
                            }
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                        })
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'anime':
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                const getAnime = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${encodeURIComponent(body.slice(7))}&limit=1`)
                if (getAnime.data.status == 404 || getAnime.data.results[0] == '') return await myst.sendFileFromUrl(from, errorurl, 'error.png', pt.notFound())
                await delay(5000)
                misc.translate(getAnime.data.results[0].synopsis, 'pt').then(async (syno) => { await myst.sendFileFromUrl(from, `${getAnime.data.results[0].image_url}`, 'anime.jpg', pt.getAnime(syno, getAnime), id) })
            break
            case prefix+'manga':
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                const getManga = await axios.get(`https://api.jikan.moe/v3/search/manga?q=${encodeURIComponent(body.slice(7))}&limit=1`)
                if (getManga.data.status == 404 || getManga.data.results[0] == '') return await myst.sendFileFromUrl(from, errorurl, 'error.png', pt.notFound())
                await delay(5000)
                misc.translate(getManga.data.results[0].synopsis, 'pt').then(async (syno) => { await myst.sendFileFromUrl(from, `${getManga.data.results[0].image_url}`, 'manga.jpg', pt.getManga(syno, getManga), id) })
            break
            
            case prefix+'waifu':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.reply(from, pt.wait(), id)
                weeaboo.waifu(false)
                    .then(async ({ url }) => {
                        await myst.sendFileFromUrl(from, url, 'waifu.png', '', id)
                            .then(() => console.log('Waifu Imagem criada com sucesso!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            // Fun
            case prefix+'profile':
            case prefix+'me':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (quotedMsg) {
                    const getQuoted = quotedMsgObj.sender.id
                    const profilePic = await myst.getProfilePicFromServer(getQuoted)
                    const username = quotedMsgObj.sender.name
                    const statuses = await myst.getStatus(getQuoted)
                    const benet = _ban.includes(getQuoted) ? 'Yes' : 'No'
                    const adm = groupAdmins.includes(getQuoted) ? 'Yes' : 'No'
                    const premi = premium.checkPremiumUser(getQuoted, _premium) ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(getQuoted, _level)
                    const xpMe = level.getLevelingXp(getQuoted, _level)
                    const req = 5 * Math.pow(levelMe, 2) + 50 * 1 + 100
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfp = errorImg
                    } else {
                        pfp = profilePic
                    }
                    await myst.sendFileFromUrl(from, pfp, `${username}.jpg`, pt.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                } else {
                    const profilePic = await myst.getProfilePicFromServer(sender.id)
                    const username = pushname
                    const statuses = await myst.getStatus(sender.id)
                    const benet = isBanned ? 'Sim' : 'Não'
                    const adm = isGroupAdmins ? 'Sim' : 'Não'
                    const premi = isPremium ? 'Sim' : 'Não'
                    const levelMe = level.getLevelingLevel(sender.id, _level)
                    const xpMe = level.getLevelingXp(sender.id, _level)
                    const req = 5 * Math.pow(levelMe, 2) + 50 * 1 + 100
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfps = errorImg
                    } else {
                        pfps = profilePic
                    }
                    await myst.sendFileFromUrl(from, pfps, `${username}.jpg`, pt.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                }
            break
            case prefix+'escrever':
            case prefix+'write':
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Criando "Escrevendo"...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/write?text=${q}&apikey=${config.vhtear}`, 'nulis.jpg', '', id)
                    .then(() => console.log('Imagem de escrevendo Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'ffbanner': // By: VideFrelan
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q.includes('|')) return myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Criando banner de FF...')
                const teks1ffanjg = q.substring(0, q.indexOf('|') - 1)
                const teks2ffanjg = q.substring(q.lastIndexOf('|') + 2)
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/bannerff?title=${teks1ffanjg}&text=${teks2ffanjg}&apikey=${config.vhtear}`, id)
                console.log('Pronto!')
            break
            case prefix+'fflogo': // By: VideFrelan
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q.includes('|')) return myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Criando logo de FF...')
                const karakter = q.substring(0, q.indexOf('|') - 1)
                const teksff = q.substring(q.lastIndexOf('|') + 2)
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/logoff?hero=${karakter}&text=${teksff}&apikey=${config.vhtear}`, id)
                console.log('Pronto!')
            break
            case prefix+'text3d':
            case prefix+'3d':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Criando texto 3D...')
                await myst.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/text3d?text=${q}`,`${q}.jpg`, '', id)
                console.log('Texto 3D foi mando com sucesso!')
            break
            case prefix+'glitchtext':
            case prefix+'glitch':
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                const teks1 = q.substring(0, q.indexOf('|') - 1)
                const teks2 = q.substring(q.lastIndexOf('|') + 2)
                await myst.reply(from, pt.wait(), id)
                console.log('Criando texto glitch...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/glitchtext?text1=${teks1}&text2=${teks2}&apikey=${config.vhtear}`, '${q}.jpg', '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'ph':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                const kiri = q.substring(0, q.indexOf('|') - 1)
                const kanan = q.substring(q.lastIndexOf('|') + 2)
                await myst.reply(from, pt.wait(), id)
                console.log('Criando texto do PH...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/pornlogo?text1=${kiri}&text2=${kanan}&apikey=${config.vhtear}`, 'ph.jpg', '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'blackpink':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto Blackpink...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/blackpinkicon?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'comic':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto Comic...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/comic_text?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'hacker':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto hacker...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/hacker_avatar?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'grafite':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
				const muro1 = q.substring(0, q.indexOf('|') - 1)
                const muro2 = q.substring(q.lastIndexOf('|') + 2)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto muro...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/cool_wall_graffiti?text1=${muro1}&text2=${muro2}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'metal':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto metal...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/glow_metallic?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'banner':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto banner tipo 1...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/cover_banner?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'corroido':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto corroido...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/eroded_metal?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'banner2':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto banner tipo 2...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/the_wall?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'vittel':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto vittel...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/viettel_text?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'asasg':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto asa de galaxia..')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/wings_galaxy?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'halloween':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto halloween...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/halloween_text?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'grafite2':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
				const grafite21 = q.substring(0, q.indexOf('|') - 1)
                const grafite22 = q.substring(q.lastIndexOf('|') + 2)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto grafite tipo 2...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/girl_graffiti?text1=${grafite21}&text2=${grafite22}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'grafite3':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto grafite tipo 3...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/cartoon_graffiti?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'corasa':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto coração...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/write_heart?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'5mincraft':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto 5mincraft...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/foil_text?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'sangue':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto sangue...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/blood_text?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'matrix':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto matrix...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/matrix_text?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'blights':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto estilo blindgs lights...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/bokeh_text?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'carbon':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto carbon...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/carbon_text?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'vingadores':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
				const vinga1 = q.substring(0, q.indexOf('|') - 1)
                const vinga2 = q.substring(q.lastIndexOf('|') + 2)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto vingadores...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/avengers_text?text1=${vinga2}&text2=${vinga1}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'agua':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto aguinha...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/water_maker?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'metal2':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto metal tipo 2...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/metal_maker?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'gaming':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto gaming...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/gamelogo?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'raio':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto raio...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/thundertext?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'praia':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto praia...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/silktext?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'festa':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto festa...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/partytext?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'mgoogle':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
				const mgoogle1 = q.substring(0, q.indexOf('|') - 1)
                const mgoogle2 = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const mgoogle3 = q.substring(q.lastIndexOf('|') + 2)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto google...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/googletext?text1=${mgoogle1}&text2=${mgoogle2}&text3=${mgoogle3}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'blights2':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto blinding lights tipo 2...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/glowtext?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'vapor':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto vapor...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/wetglass?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'lgalaxia':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto logo galaxia...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/stylelogo?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'tinta':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto tinta...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/watercolor?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'llobo':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
				const llobo1 = q.substring(0, q.indexOf('|') - 1)
                const llobo2 = q.substring(q.lastIndexOf('|') + 2)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto de lobo...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/avatarwolf?text1=${llobo2}&text2=${llobo1}&apikey=mystbotapi0612`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'papelq':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto de papel queimado...')
                await myst.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/burnpaper/?text=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'caneca':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto em caneca...')
                await myst.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/candlemug/?text=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'amor':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto de amor...')
                await myst.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/lovemsg/?text=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'flor':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto de flor...')
                await myst.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/mugflower/?text=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'naruto':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto naruto...')
                await myst.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/narutobanner/?text=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'papelv':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto de papel...')
                await myst.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/paperonglass/?text=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'amor2':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto de amor tipo 2...')
                await myst.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/romancetext/?text=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'sombra':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto de sombra...')
                await myst.sendFileFromUrl(from, `https://videfikri.com/api/textmaker/shadowtext/?text=${q}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'galaxia':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                console.log('Creating texto galaxia...')
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/galaxytext?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Imagem criada com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'triggered':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await myst.reply(from, pt.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Baixando e descriptografando a media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.gif`)
                    const fileOutputPath = path.join(temp, 'video', `${name}.mp4`)
                    canvacord.Canvas.trigger(mediaData)
                        .then((buffer) => {
                            canvacord.write(buffer, fileInputPath)
                            ffmpeg(fileInputPath)
                                .outputOptions([
                                    '-movflags faststart',
                                    '-pix_fmt yuv420p',
                                    '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
                                ])
                                .inputFormat('gif')
                                .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => {
                                    console.log(color('[FFmpeg]', 'green'), 'Processamento finalizado!')
                                    await myst.sendMp4AsSticker(from, fileOutputPath, { fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0, crop: false })
                                    console.log(color('[WAPI]', 'green'), ' GIF!')
                                    setTimeout(() => {
                                        fs.unlinkSync(fileInputPath)
                                        fs.unlinkSync(fileOutputPath)
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'wasted':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${sender.id}`)
                    await myst.reply(from, pt.wait(), id)
                    await myst.sendFileFromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`, 'Wasted.jpg', 'Pronto.. vou mandar a versão sticker tambem', id).then(() => myst.sendStickerfromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`))
                    console.log('Imagem Wasted foi mando com sucesso!')
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'beijo':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        await myst.reply(from, pt.wait(), id)
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const ppRaw = await myst.getProfilePicFromServer(sender.id)
                        const ppSecond = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRaw === undefined) {
                            var ppFirst = errorImg
                        } else {
                            ppFirst = ppRaw
                        }
                        canvacord.Canvas.kiss(ppFirst, ppSecond)
                            .then(async (buffer) => {
                                canvacord.write(buffer, `${sender.id}_kiss.png`)
                                await myst.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else {
                        await myst.reply(from, pt.wrongFormat(), id)
                    }
                } catch (err) {
                    console.error(err)
                    await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                }
            break
            case prefix+'phc':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q.includes('|')) return await myst.reply(from, pt.wrongFormat(), id)
                const usernamePh = q.substring(0, q.indexOf('|') - 1)
                const commentPh = q.substring(q.lastIndexOf('|') + 2)
                const ppPhRaw = await myst.getProfilePicFromServer(sender.id)
                if (ppPhRaw === undefined) {
                    var ppPh = errorImg
                } else {
                    ppPh = ppPhRaw
                }
                const dataPpPh = await bent('buffer')(ppPh)
                const linkPpPh = await uploadImages(dataPpPh, `${sender.id}_ph`)
                await myst.reply(from, pt.wait(), id)
                const preprocessPh = await axios.get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${linkPpPh}&text=${commentPh}&username=${usernamePh}`)
                await myst.sendFileFromUrl(from, preprocessPh.data.message, 'ph.jpg', '', id)
                console.log('Imagem criada com sucesso!')
            break
            case prefix+'fogo':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/fire_maker?text=${q}&apikey=${config.vhtear}`)
                console.log('Imagem criada com sucesso!')
            break
            case prefix+'balloonmaker':
            case prefix+'balao':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q.includes('|')) return await myst.reply(from, pt.wrongFormat(), id)
                const namaKiri = q.substring(0, q.indexOf('|') - 1)
                const namaKanan = q.substring(q.lastIndexOf('|') + 2)
                await myst.reply(from, pt.wait(), id)
                await myst.sendFileFromUrl(from, `https://api.vhtear.com/balloonmaker?text1=${namaKiri}&text2=${namaKanan}&apikey=${config.vhtear}`)
                console.log('Imagem criada com sucesso!')
            break
            case prefix+'sliding':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                await myst.sendVideoAsGif(from, `https://api.vhtear.com/slidingtext?text=${q}&apikey=${config.vhtear}`, 'sliding.gif', '', id)
                console.log('Gif sliding Criado com sucesso')
            break
            // Sticker
            case prefix+'stikernobg':
            case prefix+'stickernobg': // by: VideFrelan
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await myst.reply(from, pt.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const q = await uploadImages(mediaData, `stickernobg.${sender.id}`)
                    misc.stickernobg(q)
                        .then(async ({ result }) => {
                            await myst.sendStickerfromUrl(from, result.image, null, { author: authorWm, pack: packWm })
                            console.log(`Sticker processado em ${processTime(t, moment())} segundos`)
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                        })
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'stickerwm': // By Slavyan
            case prefix+'stcwm':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q.includes('|')) return await myst.reply(from, pt.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await myst.reply(from, pt.wait(), id)
                    const packname = q.substring(0, q.indexOf('|') - 1)
                    const author = q.substring(q.lastIndexOf('|') + 2)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await myst.sendImageAsSticker(from, imageBase64, { author: author, pack: packname })
                    console.log(`Sticker processado em ${processTime(t, moment())} segundos`)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'stickermeme': //Chika Chantexx
            case prefix+'stcmeme':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q.includes('|')) return await myst.reply(from, pt.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await myst.reply(from, pt.wait(), id)
                    const top = q.substring(0, q.indexOf('|') - 1)
                    const topp = top.replace('', '_').replace('\n','%5Cn').replace('?', '~q').replace('%', '~p').replace('#', '~h').replace('/', '~s')
                    const bottom = q.substring(q.lastIndexOf('|') + 2)
                    const bottomm = bottom.replace('', '_').replace('\n','%5Cn').replace('?', '~q').replace('%', '~p').replace('#', '~h').replace('/', '~s')
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, `meme.${sender.id}`)
                    const create = `https://api.memegen.link/images/custom/${topp}/${bottomm}.png?background=${getUrl}`
                    await myst.sendStickerfromUrl(from, create, null, { author: authorWm, pack: packWm, keepScale: true })
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'sticker':
            case prefix+'stiker':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await myst.reply(from, pt.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await myst.sendImageAsSticker(from, imageBase64, { author: authorWm, pack: packWm, keepScale: true })
                    console.log(`Sticker processado em ${processTime(t, moment())} segundos`)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'stickergif':
            case prefix+'stikergif':
            case prefix+'sgif':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isMedia && isVideo || isGif || isQuotedVideo || isQuotedGif) {
                    await myst.reply(from, pt.wait(), id)
                    const encryptMedia = isQuotedGif || isQuotedVideo ? quotedMsg : message
					const mediaData = await decryptMedia(encryptMedia, uaOverride)
					await myst.sendMp4AsSticker(from, mediaData, { crop: true, fps: 10 }, { author: authorWm, pack: packWm })
					.catch(() => { myst.reply(from, 'este gif é muito pesado, tente uma versão menor.', id) })
				} else return myst.reply(from, 'Use apenas para videos e gis, para fotos use o /sticker', id)
            break
            case prefix+'ttg':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                await axios.get(`https://api.xteam.xyz/attp?file&text=${q}`, { responseType: 'arraybuffer' }).then(async (response) => {
                const attp = Buffer.from(response.data, 'binary').toString('base64')
                await myst.sendImageAsSticker(from, attp, { author: authorWm, pack: packWm, keepScale: true })
                })
					.then(() => console.log('GIF criado com sucesso!'))
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)	
					})
            break
            case prefix+'toimg':
            case prefix+'img':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isQuotedSticker) {
                    await myst.reply(from, pt.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await myst.sendFile(from, imageBase64, 'sticker.webp', '', id)
                    } catch (err) {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    }
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'emojisticker':
            case prefix+'emojistiker':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (args.length !== 1) return myst.reply(from, pt.wrongFormat(), id)
                const emoji = emojiUnicode(args[0])
                await myst.reply(from, pt.wait(), id)
                console.log('Criando sticker de emoji')
                await myst.sendStickerfromUrl(from, `https://api.vhtear.com/emojitopng?code=${emoji}&apikey=${config.vhtear}`, null, { author: authorWm, pack: packWm })
                    .then(async () => {
                        await myst.reply(from, pt.ok(), id)
                        console.log(`Sticker processado em ${processTime(t, moment())} segundos`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Emoji não suportado!', id)
                    })
            break
            // NSFW
            case prefix+'lewds':
            case prefix+'lewd':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    await myst.reply(from, pt.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await myst.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Imagem lewd foi mando com sucesso!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                        })
            break
            case prefix+'nhentai':
            case prefix+'nh':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (args.length !== 1) return await myst.reply(from, pt.wrongFormat(), id)
                if (isNaN(Number(args[0]))) return await myst.reply(from, pt.wrongFormat(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    await myst.reply(from, pt.wait(), id)
                    console.log(`Procurando no nHentai para ${args[0]}...`)
                    const validate = await nhentai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await api.getBook(args[0])
                                .then((book) => {
                                     return api.getImageURL(book.cover)
                                })
                            const dojin = await nhentai.getDoujin(args[0])
                            const { title, details, link } = dojin
                            const { tags, artists, languages, categories } = details
                            let teks = `*Titulo*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artistas*: ${artists}\n\n*Linguas*: ${languages.join(', ')}\n\n*Categorias*: ${categories}\n\n*Link*: ${link}`
                            await myst.sendFileFromUrl(from, pic, 'nhentai.jpg', teks, id)
                            console.log('Infos nHentais foram mandas com sucesso!')
                        } catch (err) {
                            console.error(err)
                            await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                        }
                    } else {
                        await myst.reply(from, pt.nhFalse(), id)
                    }
            break
            case prefix+'nhdl':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (args.length == 1) {
					await myst.reply(from, pt.wait(), id)
					const cek = await nhentai.exists(args[0])
					if (cek == true)  {
						await myst.sendFileFromUrl(from, `https://nhder.herokuapp.com/download/nhentai/${args[0]}/zip`, 'hentai.zip', '', id)
						const api = new API()
						const pic = await api.getBook(args[0]).then(book => { return api.getImageURL(book.cover) })
						const dojin = await nhentai.getDoujin(args[0])
						const { title, details, link } = dojin
						const { parodies, tags, artists, groups, languages, categories } = details
						let teks1 = `*Titulos*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artistas*: ${artists}\n\n*Linguas*: ${languages.join(', ')}\n\n*Categorias*: ${categories}\n\n*Link*: ${link}`
						await myst.sendFileFromUrl(from, pic, 'nhentai.jpg', teks1, id)
						.catch(() => myst.reply(from, 'Falha no download', id))
				} else return await myst.reply(from, 'Nenhum resultado encontrado', id) 
			} else return myst.reply(from, 'Use o codigo de 6 digitos do nhentai (Ex. 177013)', id)
			break
            case prefix+'nhsearch':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (args.length !== 1) return await myst.reply(from, pt.wrongFormat(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    await myst.reply(from, pt.wait(), id)
                    console.log(`Procurando nHentai para ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `*── 「 NHENTAI 」 ──*\n\n➸ *Resultados para*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Titulo*: ${title}\n➸ *Linguas*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n──────────────────────────────`
                            }
                            await myst.sendFileFromUrl(from, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Infos nHentais foram mandas com sucesso!'))
                        })
                        .catch(async(err) => {
                            console.error(err)
                            await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                        })
            break
            case prefix+'lolivid':  //Piyobot
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                weeaboo.loli()
                    .then(async (body) => {
                        let lolipiyo = body.split('\n')
                        let papololi = lolipiyo[Math.floor(Math.random() * lolipiyo.length)]
                        await myst.sendFileFromUrl(from, papololi, 'loli.mp4', '', id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
            case prefix+'waifu18':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    await myst.reply(from, pt.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await myst.sendFileFromUrl(from, url, 'waifu.png', '', id)
                                .then(() => console.log('Waifu18 foi manda com sucesso!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                        })
            break
            case prefix+'phdl':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!isUrl(url) && !url.includes('pornhub.com')) return await myst.reply(from, pt.wrongFormat(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    await myst.reply(from, pt.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await myst.sendFileFromUrl(from, thumbnail_url, `${title}`, `Titulo: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('PH Metadata foi manda com sucesso!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await myst.sendFileFromUrl(from, thumbnail_url, `${title}`, `Titulo: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('PH Metadata foi manda com sucesso!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    }
            break
            case prefix+'lewdavatar':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    nsfw.lewdavatar()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'lewdavatar.jpg', '', id)
                    .then(() => console.log('Foto da lewdavatar foi manda com sucesso!'))
                    })
            break
            case prefix+'yuri':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                nsfw.yuri()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'yuri.jpg', '', id)
                    .then(() => console.log('Foto da yuri foi manda com sucesso!'))
                    })
            break
            case prefix+'reddit':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                nsfw.reddit(q)
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'reddit.jpg', '', id)
                    .then(() => console.log('Foto da reddit foi manda com sucesso!'))
                    })
            break
            case prefix+'femdom':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                nsfw.femdom()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'femdom.jpg', '', id)
                    .then(() => console.log('Foto da femdom foi manda com sucesso!'))
                    })
            break
			case prefix+'rneko':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					const rnekoi = ["https://nekos.life/api/v2/img/nsfw_neko_gif", "https://nekos.life/api/v2/img/hololewd", "https://nekos.life/api/v2/img/lewdk", "https://nekos.life/api/v2/img/lewdkemo", "https://nekos.life/api/v2/img/eron", "https://nekos.life/api/v2/img/holoero"]
					const rnekoc = rnekoi[Math.floor(Math.random() * rnekoi.length)];
                    nsfw.neko(rnekoc)
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'neko.jpg', '', id)
                    .then(() => console.log('Foto da neko foi manda com sucesso!'))
                    })
			break
			case prefix+'blowjob':
			case prefix+'boquete':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					const rblowj = ["https://nekos.life/api/v2/img/bj", "https://nekos.life/api/v2/img/blowjob"];
					const rblowjc = rblowj[Math.floor(Math.random() * rblowj.length)];
                    nsfw.boquete(rblowjc)
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'boquete.jpg', '', id)
                    .then(() => console.log('Foto da boquete foi manda com sucesso!'))
                    })
			break
			case prefix+'futanari':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    nsfw.futanari()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'futanari.jpg', '', id)
                    .then(() => console.log('Foto da futanari foi manda com sucesso!'))
                    })
			break
			case prefix+'solo':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    nsfw.solo()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'solo.jpg', '', id)
                    .then(() => console.log('Foto solo foi manda com sucesso!'))
                    })
			break
			case prefix+'anal':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    nsfw.anal()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'anal.jpg', '', id)
                    .then(() => console.log('Foto de anal foi manda com sucesso!'))
                    })
			break
			case prefix+'rloli':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                nsfw.loli()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'loli.jpg', '', id)
                    .then(() => console.log('Foto de loli foi manda com sucesso!'))
                    })
			break
			case prefix+'axila':
			case prefix+'axilas':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					nsfw.axila()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'axila.jpg', '', id)
					.then(() => console.log('Foto da axila foi manda com sucesso!'))
					})
			break
			case prefix+'pes':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					nsfw.pes()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'pes.jpg', '', id)
					.then(() => console.log('Foto dos pes foram mandadas com sucesso!'))
					})
			break
			case prefix+'coxa':
			case prefix+'coxas':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					nsfw.coxa()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'coxa.jpg', '', id)
					.then(() => console.log('Foto das coxas foram mandadas com sucesso!'))
					})
			break
			case prefix+'bunda':
			case prefix+'bundas':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					nsfw.bunda()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'bunda.jpg', '', id)
					.then(() => console.log('Foto da bunda foi manda com sucesso!'))
					})
			break
			case prefix+'peito':
			case prefix+'peitos':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					nsfw.peitos()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'peito.jpg', '', id)
					.then(() => console.log('Foto do peito foi manda com sucesso!'))
					})
			break
			case prefix+'pl':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					nsfw.pl()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'pl.jpg', '', id)
					.then(() => console.log('Peito lateral foi manda com sucesso!'))
					})
			break
			case prefix+'ahegao':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					nsfw.ahegao()
                    .then(async ({ url }) => {
                     await myst.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
					.then(() => console.log('Ahegao foi manda com sucesso!'))
					})
			break
			case prefix+'rnekog':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
				const rnekog = await axios.get(`https://nekos.life/api/v2/img/nsfw_neko_gif`)
				const res1 = await fetch(rnekog.data.url);
				const buffer1 = await res1.buffer(); 
				await fs.writeFile(`./temp/gif/gif.gif`, buffer1)
                const name = new Date() * 1
                const fileInputPath = path.join('./temp', 'gif', `gif.gif`)
                const fileOutputPath = path.join('./temp', 'video', `${name}.mp4`)
                        ffmpeg(fileInputPath)
							.inputFormat('gif')
							.outputOptions([
								'-movflags faststart',
								'-pix_fmt yuv420p',
								'-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
							    ])  
                            .toFormat('mp4')	
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processamento finalizado!')
                                await myst.sendVideoAsGif(from, fileOutputPath, 'neko.gif', '', id)
                                console.log(color('[WAPI]', 'green'), 'Rnekog foi manda com sucesso!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 5000)
                            })
                            .save(fileOutputPath)
			break
			case prefix+'rsolog':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					const solog = await axios.get('https://nekos.life/api/v2/img/solog')
					const res2 = await fetch(solog.data.url);
					const buffer2 = await res2.buffer(); 
					await fs.writeFile(`./temp/gif/gif.gif`, buffer2)
					const name2 = new Date() * 1
					const fileInputPath2  = path.join('./temp', 'gif', `gif.gif`)
					const fileOutputPath2 = path.join('./temp', 'video', `${name2}.mp4`)
                        ffmpeg(fileInputPath2)
							.inputFormat('gif')
							.outputOptions([
								'-movflags faststart',
								'-pix_fmt yuv420p',
								'-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
							    ])  
                            .toFormat('mp4')	
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processamento finalizado!')
                                await myst.sendVideoAsGif(from, fileOutputPath2, 'neko.gif', '', id)
                                console.log(color('[WAPI]', 'green'), 'Rsolog foi manda com sucesso!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath2)
                                    fs.unlinkSync(fileOutputPath2)
                                }, 5000)
                            })
                            .save(fileOutputPath2)
			break
			case prefix+'rwankg':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					const wankg = await axios.get('https://nekos.life/api/v2/img/pwankg')
					const res3 = await fetch(wankg.data.url);
					const buffer3 = await res3.buffer(); 
					await fs.writeFile(`./temp/gif/gif.gif`, buffer3)
					const name3 = new Date() * 1
					const fileInputPath3 = path.join('./temp', 'gif', `gif.gif`)
					const fileOutputPath3 = path.join('./temp', 'video', `${name3}.mp4`)
                        ffmpeg(fileInputPath3)
							.inputFormat('gif')
							.outputOptions([
								'-movflags faststart',
								'-pix_fmt yuv420p',
								'-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
							    ])  
                            .toFormat('mp4')	
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processamento finalizado')
                                await myst.sendVideoAsGif(from, fileOutputPath3, 'neko.gif', '', id)
                                console.log(color('[WAPI]', 'green'), 'Rwankg foi manda com sucesso!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath3)
                                    fs.unlinkSync(fileOutputPath3)
                                }, 5000)
                            })
                            .save(fileOutputPath3)
			break
			case prefix+'rpesg':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					const pesg = await axios.get('https://nekos.life/api/v2/img/feetg')
					const res4 = await fetch(pesg.data.url);
					const buffer4 = await res4.buffer(); 
					await fs.writeFile(`./temp/gif/gif.gif`, buffer4)
					const name4 = new Date() * 1
					const fileInputPath4 = path.join('./temp', 'gif', `gif.gif`)
					const fileOutputPath4 = path.join('./temp', 'video', `${name4}.mp4`)
                        ffmpeg(fileInputPath4)
							.inputFormat('gif')
							.outputOptions([
								'-movflags faststart',
								'-pix_fmt yuv420p',
								'-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
							    ])  
                            .toFormat('mp4')	
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processamento finalizado')
                                await myst.sendVideoAsGif(from, fileOutputPath4, 'neko.gif', '', id)
                                console.log(color('[WAPI]', 'green'), 'Rpesg foi manda com sucesso!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath4)
                                    fs.unlinkSync(fileOutputPath4)
                                }, 5000)
                            })
                            .save(fileOutputPath4)
			break
			case prefix+'rrandog':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					const randog = await axios.get('https://nekos.life/api/v2/img/Random_hentai_gif')
					const res5 = await fetch(randog.data.url);
					const buffer5 = await res5.buffer(); 
					await fs.writeFile(`./temp/gif/gif.gif`, buffer5)
					const name5 = new Date() * 1
					const fileInputPath5 = path.join('./temp', 'gif', `gif.gif`)
					const fileOutputPath5 = path.join('./temp', 'video', `${name5}.mp4`)
                        ffmpeg(fileInputPath5)
							.inputFormat('gif')
							.outputOptions([
								'-movflags faststart',
								'-pix_fmt yuv420p',
								'-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
							    ])  
                            .toFormat('mp4')	
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processamento finalizado')
                                await myst.sendVideoAsGif(from, fileOutputPath5, 'neko.gif', '', id)
                                console.log(color('[WAPI]', 'green'), 'Rrandog foi manda com sucesso!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath5)
                                    fs.unlinkSync(fileOutputPath5)
                                }, 5000)
                            })
                            .save(fileOutputPath5)
			break
            case prefix+'rpeitos':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                const rtits = ["https://meme-api.herokuapp.com/gimme/tits", "https://meme-api.herokuapp.com/gimme/BestTits", "https://meme-api.herokuapp.com/gimme/boobs", "https://meme-api.herokuapp.com/gimme/BiggerThanYouThought", "https://meme-api.herokuapp.com/gimme/smallboobs", "https://meme-api.herokuapp.com/gimme/TinyTits", "https://meme-api.herokuapp.com/gimme/SmallTitsHugeLoad", "https://meme-api.herokuapp.com/gimme/amazingtits"];
                const rtitsc = rtits[Math.floor(Math.random() * rtits.length)];
                nsfw.rpeitos(rtitsc)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'rpeitos.jpg', '', id)
                        .then(() => console.log('rpeitos foi manda com sucesso!'))
                        })
            break
            case prefix+'rmilfs':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                const rmilf = ["https://meme-api.herokuapp.com/gimme/Bbwmilf", "https://meme-api.herokuapp.com/gimme/milf", "https://meme-api.herokuapp.com/gimme/Milfie", "https://meme-api.herokuapp.com/gimme/maturemilf"];
                const rmilfc = rmilf[Math.floor(Math.random() * rmilf.length)];
                nsfw.rmilfs(rmilfc)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'milfs.jpg', '', id)
                        .then(() => console.log('milfs foi manda com sucesso!'))
                        })
            break
            case prefix+'rbdsm':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                const rbdsm = ["https://meme-api.herokuapp.com/gimme/BDSMPics", "https://meme-api.herokuapp.com/gimme/bdsm", "https://meme-api.herokuapp.com/gimme/TeenBDSM", "https://meme-api.herokuapp.com/gimme/BDSMGW"];
                const rbdsmc = rbdsm[Math.floor(Math.random() * rbdsm.length)];
                nsfw.rmilfs(rbdsmc)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'bdsm.jpg', '', id)
                        .then(() => console.log('bdsm foi manda com sucesso!'))
                        })
            break  
            case prefix+'rbundas':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                const rass = ["https://meme-api.herokuapp.com/gimme/CuteLittleButts", "https://meme-api.herokuapp.com/gimme/ass", "https://meme-api.herokuapp.com/gimme/bigasses"];
                const rassc = rass[Math.floor(Math.random() * rass.length)];
                nsfw.rbundas(rassc)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'bundas.jpg', '', id)
                        .then(() => console.log('bundas foi manda com sucesso!'))
                        })
            break 
            case prefix+'rpussy':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                const rpussy = ["https://meme-api.herokuapp.com/gimme/pussy", "https://meme-api.herokuapp.com/gimme/ass", "https://meme-api.herokuapp.com/gimme/LegalTeens"];
                const rpussyc = rpussy[Math.floor(Math.random() * rpussy.length)];
                nsfw.rpussy(rpussyc)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'pussy.jpg', '', id)
                        .then(() => console.log('pussy foi manda com sucesso!'))
                        })
            break
			//Multis
			case prefix+'multilewds':
            case prefix+'multilewd':
            case prefix+'mlewds':
            case prefix+'mlewd':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (isGroupMsg) return await myst.reply(from, pt.pcOnly(), id)
                    await myst.reply(from, pt.wait(), id)
					let tentativas = 0;
					while(tentativas < 5){
						nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await myst.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Lewd foi manda com sucesso!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                        })
						await delay(2000)
					  tentativas ++;
					}
				break
			case prefix+'myuri':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    await myst.reply(from, pt.wait(), id)
					let tmyuri2 = 0;
					while(tmyuri2 < 5){
                        nsfw.yuri()
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'myuri.jpg', '', id)
                        .then(() => console.log('myuri foi manda com sucesso!'))
                        })
					await delay(2000)
					tmyuri2 ++;
					}
            break
            case prefix+'mfemdom':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    await myst.reply(from, pt.wait(), id)
					let tmfemdom2 = 0;
					while(tmfemdom2 < 5){
                        nsfw.femdom()
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'mfemdom.jpg', '', id)
                        .then(() => console.log('mfemdom foi manda com sucesso!'))
                        })
					await delay(2000)
					tmfemdom2 ++;
					}
            break
			case prefix+'mrneko':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmneko = 0;
					while(tmneko < 5){
					const rnekoi = ["https://nekos.life/api/v2/img/nsfw_neko_gif", "https://nekos.life/api/v2/img/hololewd", "https://nekos.life/api/v2/img/lewdk", "https://nekos.life/api/v2/img/lewdkemo", "https://nekos.life/api/v2/img/eron", "https://nekos.life/api/v2/img/holoero", "https://api.computerfreaker.cf/v1/nsfwneko"]
					const rnekoc = rnekoi[Math.floor(Math.random() * rnekoi.length)];
                    nsfw.neko(rnekoc)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'mrneko.jpg', '', id)
                        .then(() => console.log('mrneko foi manda com sucesso!'))
                        })
					await delay(2000)
					tmneko ++;
					}
			break
			case prefix+'mblowjob':
			case prefix+'mboquete':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmbj = 0;
					while(tmbj < 5){
					const rblowj = ["https://nekos.life/api/v2/img/bj", "https://nekos.life/api/v2/img/blowjob"];
					const rblowjc = rblowj[Math.floor(Math.random() * rblowj.length)];
					nsfw.neko(rblowjc)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'boquete.jpg', '', id)
                        .then(() => console.log('boquete foi manda com sucesso!'))
                        })
					await delay(2000)
					tmbj ++;
					}
			break
			case prefix+'mfutanari':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmfuta = 0;
					while(tmfuta < 5){
					nsfw.futanari()
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'futanari.jpg', '', id)
                        .then(() => console.log('futanari foi manda com sucesso!'))
                        })
					await delay(2000)
					tmfuta ++;
					}
			break
			case prefix+'msolo':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmsolo = 0;
					while(tmsolo < 5){
					nsfw.solo()
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'solo.jpg', '', id)
                        .then(() => console.log('solo foi manda com sucesso!'))
                        })
					await delay(2000)
					tmsolo ++;
					}
			break
			case prefix+'manal':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmanal = 0;
					while(tmanal < 5){
					nsfw.anal()
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'anal.jpg', '', id)
                        .then(() => console.log('anal foi manda com sucesso!'))
                        })
					await delay(2000)
					tmanal ++;
					}
			break
			case prefix+'mrloli':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmloli = 0;
					while(tmloli < 5){
                        nsfw.loli()
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                        .then(() => console.log('Ahegao foi manda com sucesso!'))
                        })
					await delay(2000)
					tmloli ++;
					}
			break
			case prefix+'maxila':
			case prefix+'maxilas':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmaxl = 0;
					while(tmaxl < 5){
					nsfw.axila()
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'axila.jpg', '', id)
    					.then(() => console.log('Axilas foi manda com sucesso!'))
    					})
					await delay(2000)
					atmaxl ++;
					}
			break
			case prefix+'mpes':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmpes = 0;
					while(tmpes < 5){
					nsfw.pes()
                        .then(async ({ url }) => {
                        await myst.sendFileFromUrl(from, url, 'pes.jpg', '', id)
    					.then(() => console.log('Pes foi mando com sucesso!'))
    					})
					await delay(2000)
					tmpes ++;
					}
			break
			case prefix+'mcoxa':
			case prefix+'mcoxas':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmcoxa = 0;
					while(tmcoxa < 5){
					nsfw.coxa()
                        .then(async ({ url }) => {
                        await myst.sendFileFromUrl(from, url, 'coxa.jpg', '', id)
    					.then(() => console.log('Coxas foi manda com sucesso!'))
    					})
					await delay(2000)
					tmcoxa ++;
					}
			break
			case prefix+'mbunda':
			case prefix+'mbundas':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmbunda = 0;
					while(tmbunda < 5){
					nsfw.bunda()
                        .then(async ({ url }) => {
                        await myst.sendFileFromUrl(from, url, 'bunda.jpg', '', id)
    					.then(() => console.log('Bundas foram mandadas com sucesso!'))
    					})
					await delay(2000)
					tmbunda ++;
					}
			break
			case prefix+'mpeito':
			case prefix+'mpeitos':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmpeito = 0;
					while(tmpeito < 5){
					nsfw.peitos()
                        .then(async ({ url }) => {
                        await myst.sendFileFromUrl(from, url, 'peito.jpg', '', id)
    					.then(() => console.log('Peitos foram mandadas com sucesso!'))
    					})
					await delay(2000)
					tmpeito ++;
					}
			break
			case prefix+'mpl':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmpl = 0;
					while(tmpl < 5){
					nsfw.pl()
                        .then(async ({ url }) => {
                        await myst.sendFileFromUrl(from, url, 'pl.jpg', '', id)
    					.then(() => console.log('Peito lado foi mando com sucesso!'))
    					})
					await delay(2000)
					tmpl ++;
					}
			break
			case prefix+'mahegao':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
					let tmahegao = 0;
					while(tmahegao < 5){
					nsfw.ahegao()
                        .then(async ({ url }) => {
                        await myst.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
    					.then(() => console.log('Ahegao foi mando com sucesso!'))
    					})
					await delay(2000)
					tmahegao ++;
					}
			break
            case prefix+'mrpeitos':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    let mrtits = 0;
                    while(mrtits < 5){
                const rtits = ["https://meme-api.herokuapp.com/gimme/tits", "https://meme-api.herokuapp.com/gimme/BestTits", "https://meme-api.herokuapp.com/gimme/boobs", "https://meme-api.herokuapp.com/gimme/BiggerThanYouThought", "https://meme-api.herokuapp.com/gimme/smallboobs", "https://meme-api.herokuapp.com/gimme/TinyTits", "https://meme-api.herokuapp.com/gimme/SmallTitsHugeLoad", "https://meme-api.herokuapp.com/gimme/amazingtits"];
                const rtitsc = rtits[Math.floor(Math.random() * rtits.length)];
                nsfw.rpussy(rtitsc)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'pussy.jpg', '', id)
                        .then(() => console.log('pussy foi manda com sucesso!'))
                        })
                    await delay(2000)
                    mrtits ++;
                    }
            break
            case prefix+'mrmilf':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    let mrmilf = 0;
                    while(mrmilf < 5){
                const rmilf = ["https://meme-api.herokuapp.com/gimme/Bbwmilf", "https://meme-api.herokuapp.com/gimme/milf"];
                const rmilfc = rmilf[Math.floor(Math.random() * rmilf.length)];
                nsfw.rmilfs(rmilfc)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'milfs.jpg', '', id)
                        .then(() => console.log('milfs foi manda com sucesso!'))
                        })
                    await delay(2000)
                    mrmilf ++;
                    }
            break
            case prefix+'mrbdsm':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    let mrbdsm = 0;
                    while(mrbdsm < 5){
                const rbdsm = ["https://meme-api.herokuapp.com/gimme/BDSMPics", "https://meme-api.herokuapp.com/gimme/bdsm", "https://meme-api.herokuapp.com/gimme/TeenBDSM"];
                const rbdsmc = rbdsm[Math.floor(Math.random() * rbdsm.length)];
                nsfw.rbdsm(rbdsmc)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'bdsm.jpg', '', id)
                        .then(() => console.log('bdsm foi manda com sucesso!'))
                        })
                    await delay(2000)
                    mrbdsm ++;
                    }
            break  
            case prefix+'mrbundas':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    let mrass = 0;
                    while(mrass < 5){
                const rass = ["https://meme-api.herokuapp.com/gimme/CuteLittleButts", "https://meme-api.herokuapp.com/gimme/ass", "https://meme-api.herokuapp.com/gimme/bigasses"];
                const rassc = rass[Math.floor(Math.random() * rass.length)];
                nsfw.rbundas(rassc)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'bundas.jpg', '', id)
                        .then(() => console.log('bundas foi manda com sucesso!'))
                        })
                    await delay(2000)
                    mrass ++;
                    }
            break 
            case prefix+'mrpussy':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    let mrpussy = 0;
                    while(mrpussy < 5){
                const rpussy = ["https://meme-api.herokuapp.com/gimme/pussy", "https://meme-api.herokuapp.com/gimme/ass", "https://meme-api.herokuapp.com/gimme/LegalTeens"];
                const rpussyc = rpussy[Math.floor(Math.random() * rpussy.length)];
                nsfw.rpussy(rpussyc)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'pussy.jpg', '', id)
                        .then(() => console.log('pussy foi manda com sucesso!'))
                        })
                    await delay(2000)
                    mrpussy ++;
                    }
            break
            case prefix+'mreddit':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (isGroupMsg && !isNsfw) return await myst.reply(from, pt.notNsfw(), id)
                    let mreddit = 0;
                    while(mreddit < 5){
                nsfw.reddit(q)
                        .then(async ({ url }) => {
                         await myst.sendFileFromUrl(from, url, 'reddit.jpg', '', id)
                        .then(() => console.log('reddit foi manda com sucesso!'))
                        })
                    await delay(2000)
                    mreddit ++;
                    }
            break
            // Moderation command
            case prefix+'revoke':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return myst.reply(from, pt.botNotAdmin(), id)
                await myst.revokeGroupInviteLink(groupId)
                await myst.sendTextWithMentions(from, `Link do grupo revogado por @${sender.id.replace('@c.us', '')}`)
            break
            case prefix+'link':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
                const gcLink = await myst.getGroupInviteLink(groupId)
                await myst.reply(from, gcLink, id)
            break
            case prefix+'mutegp':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return myst.reply(from, pt.botNotAdmin(), id)
                if (ar[0] === 'on') {
                    await myst.setGroupToAdminsOnly(groupId, true)
                    await myst.sendText(from, pt.gcMute())
                } else if (ar[0] === 'off') {
                    await myst.setGroupToAdminsOnly(groupId, false)
                    await myst.sendText(from, pt.gcUnmute())
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'add':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
                if (args.length !== 1) return await myst.reply(from, pt.wrongFormat(), id)
                try {
                    await myst.addParticipant(from, `${args[0]}@c.us`)
                } catch (err) {
                    console.error(err)
                    await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                }
            break
            case prefix+'kick':
			case prefix+'ban':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
				if (quotedMsg) {
					const qban = quotedMsgObj.sender.id
                    if (ownerNumber.includes(qban)) return myst.reply(from, pt.kickdono(), id)
                    if (groupAdmins.includes(qban)) return myst.reply(from, pt.removeradm(), id)
                    await myst.sendTextWithMentions(from, pt.ban(qban))
                    await myst.removeParticipant(groupId, qban)
				} else {
                if (mentionedJidList.length === 0) return await myst.reply(from, pt.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.sendTextWithMentions(from, `Tchauzinho~\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i of mentionedJidList) {
                    if (groupAdmins.includes(i)) return await myst.sendText(from, pt.wrongFormat())
                    await myst.removeParticipant(groupId, i)
                }}
            break
			case prefix+'unkick':
			case prefix+'unban':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
					const qunban = quotedMsgObj.sender.id
					await myst.sendTextWithMentions(from, pt.unban(qunban))
					await myst.addParticipant(groupId, qunban).catch(() => { myst.reply(from, pt.unban(qunban), id) })
			break
			case prefix+'softban':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
				if (!quotedMsg) return await myst.reply (from, 'responda a mensagem de quem voce quer banir + o tempo para usar este comando', id)
				if (args.length == 0 || isNaN(args[0])) return myst.reply(from, pt.wrongFormat(), id)
                if (ownerNumber.includes(quotedMsgObj.sender.id)) return myst.reply(from, pt.kickdono(), id)
                if (groupAdmins.includes(quotedMsgObj.sender.id)) return myst.reply(from, pt.removeradm(), id)
                try {
						const aatimep = Number(args[0]) * 60000
						const timeaddmsg = Number(aatimep) + 10000
						const bgmcomum = quotedMsgObj.sender.id
						await myst.sendTextWithMentions(from, pt.softban(bgmcomum, args))
						await delay(1000)
						await myst.removeParticipant(groupId, bgmcomum)
						setTimeout(() => {
							myst.addParticipant(groupId, bgmcomum)
						}, aatimep)
						await delay(timeaddmsg)
						await myst.sendText(from, pt.unsoftban())
						}
						catch (error) { 
						await myst.reply(from, 'Não consegui adicionar esta pessoa.. talvez ela não permita..', id)
						console.log(color('[SOFTBAN]', 'crimson'), color(`→ Obtive erros no comando ${prefix}${command} → ${error.message} - Você pode ignorar.`, 'gold'))
						}
            break
            case prefix+'promote':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await myst.reply(from, pt.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await myst.reply(from, pt.wrongFormat(), id)
                if (groupAdmins.includes(mentionedJidList[0])) return await myst.reply(from, pt.adminAlready(), id)
                await myst.promoteParticipant(groupId, mentionedJidList[0])
                await myst.reply(from, pt.ok(), id)
            break
            case prefix+'demote':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await myst.reply(from, pt.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await myst.reply(from, pt.wrongFormat(), id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await myst.reply(from, pt.notAdmin(), id)
                await myst.demoteParticipant(groupId, mentionedJidList[0])
                await myst.reply(from, pt.ok(), id)
            break
            case prefix+'sair':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                await myst.sendText(from, 'Tchauzinho.. Desculpa se magoei em algo..~ 👋')
                await myst.leaveGroup(groupId)
                try { fs.unlinkSync(`./database/groupsMsgs/${idgp}.json`) } 
                catch(err) { console.error(err) }
            break
            case prefix+'admins':
            case prefix+'admin':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                const groupAdm = await myst.getGroupAdmins(groupId)
                if (isOwner) {
                    let txt = '╭───── 「 *Admisn* 」 ────\n'
                    for (let i = 0; i < groupAdm.length; i++) {
                        txt += '┣➥'
                        txt += ` @${groupAdm[i].replace(/@c.us/g, '')}\n`
                    }
                    txt += '╰── 「 *Myst* 」 ────'
                    await myst.sendTextWithMentions(from, txt)
                } else {
                    let txt = '╭───── 「 *Admisn* 」 ────\n'
                    for (let i = 0; i < groupAdm.length; i++) {
                        txt += '┣➥'
                        txt += ` @${groupAdm[i].replace(/@c.us/g, '')}\n`
                    }
                    txt += '╰── 「 *Myst* 」 ────'
                    await myst.sendTextWithMentions(from, txt)
                }
            break
            case prefix+'everyone':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                const groupMem = await myst.getGroupMembers(groupId)
				if (isOwner) {
                    let txt = '╭───── 「 *Everyone* 」 ─────\n'
                        for (let i = 0; i < groupMem.length; i++) {
                            txt += '┣➥'
                            txt += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                        }
                    txt += '╰───── 「 *Myst* 」 ─────'
                    await myst.sendTextWithMentions(from, txt)
                } else {
                    let txt = '╭───── 「 *Everyone* 」 ─────\n'
                        for (let i = 0; i < groupMem.length; i++) {
                            txt += '┣➥'
                            txt += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                        }
                    txt += '╰───── 「 *Myst* 」 ─────'
                    await myst.sendTextWithMentions(from, txt)
                }
            break
            case prefix+'groupicon':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return myst.reply(from, pt.botNotAdmin(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await myst.reply(from, pt.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await myst.setGroupIcon(groupId, imageBase64)
                    await myst.sendText(from, pt.ok())
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'antilink':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
                if (ar[0] === 'on') {
                    if (isDetectorOn) return await myst.reply(from, pt.detectorOnAlready(), id)
                    _antilink.push(groupId)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await myst.reply(from, pt.detectorOn(n), id)
                } else if (ar[0] === 'off') {
                    _antilink.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await myst.reply(from, pt.detectorOff(), id)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'antitrava':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
                if (ar[0] === 'on') {
                    if (isAntiTravasOn) return await myst.reply(from, pt.antitravaOnAlready(), id)
                    _trava.push(groupId)
                    fs.writeFileSync('./database/group/antitrava.json', JSON.stringify(_trava))
                    await myst.reply(from, pt.antitravaOn(), id)
                } else if (ar[0] === 'off') {
                    _trava.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antitrava.json', JSON.stringify(_trava))
                    await myst.reply(from, pt.antitravaOff(), id)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'levelup':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (ar[0] === 'on') {
                    if (isLevelingOn) return await myst.reply(from, pt.levelingOnAlready(), id)
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await myst.reply(from, pt.levelingOn(), id)
                } else if (ar[0] === 'off') {
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await myst.reply(from, pt.levelingOff(), id)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'welcome':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (ar[0] === 'on') {
                    if (isWelcomeOn) return await myst.reply(from, pt.welcomeOnAlready(), id)
                    _welcome.push(groupId)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await myst.reply(from, pt.welcomeOn(), id)
                } else if (ar[0] === 'off') {
                    _welcome.splice(groupId, 1)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await myst.reply(from, pt.welcomeOff(), id)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'autosticker':
            case prefix+'autostiker':
            case prefix+'autostik':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (ar[0] === 'on') {
                    if (isAutoStickerOn) return await myst.reply(from, pt.autoStikOnAlready(), id)
                    _autosticker.push(groupId)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await myst.reply(from, pt.autoStikOn(), id)
                } else if (ar[0] === 'off') {
                    _autosticker.splice(groupId, 1)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await myst.reply(from, pt.autoStikOff(), id)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'antinsfw':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
                if (ar[0] === 'on') {
                    if (isAntiNsfw) return await myst.reply(from, pt.antiNsfwOnAlready(), id)
                    _antinsfw.push(groupId)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await myst.reply(from, pt.antiNsfwOn(), id)
                } else if (ar[0] === 'off') {
                    _antinsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await myst.reply(from, pt.antiNsfwOff(), id)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
			case prefix+'ghost':
            if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
            if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
            if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
			if (isNaN(args[0])) return myst.reply(from, 'Adicione uma quantidade mínima de mensagens para fazer a remoção', id)
			await myst.reply(from, pt.wait(), id)
            var _msgcount = JSON.parse(fs.readFileSync(`./database/groupsMsgs/${idgp}.json`))
			var userRem = `Removidos ↓\n\n`
            try {
                for (let i = 0; i < groupMembers.length; i++) {
					const msgCount = messages.getMsg(groupMembers[i].id, _msgcount)
					if (groupAdmins.includes(groupMembers[i].id) || botNumber.includes(groupMembers[i].id) || ownerNumber.includes(groupMembers[i].id)) {
						console.log(color('[IMUNE] - ', 'crimson'), groupMembers[i].id)
					} else {
						if (msgCount < args[0]) {
							await myst.removeParticipant(groupId, groupMembers[i].id)
							userRem += `@${groupMembers[i].id}\n\n`
						}
					}
				}
                await myst.sendTextWithMentions(from, userRem.replace('@c.us', ''))
            } catch (err) { await myst.reply(from, 'Talvez seja um engano, pois 0 pessoas foram removidas', id) }
            break
            case prefix+'ssr':
            if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
            if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
            if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
            await myst.reply(from, pt.wait(), id)
            var userRem = `Removidos ↓\n\n`
            try {
                for (let i = 0; i < groupMembers.length; i++) {
                    const numeroSsr = await myst.getContact(groupMembers[i].id)
                    var nomeSsr = numeroSsr.pushname
                    var statusSsr = await myst.getStatus(groupMembers[i].id)
                    if (groupAdmins.includes(groupMembers[i].id) || botNumber.includes(groupMembers[i].id) || ownerNumber.includes(groupMembers[i].id)) {
                        console.log(color('[IMUNE] - ', 'crimson'), groupMembers[i].id)
                    } else {
                        if (!nomeSsr.includes(`${q}`) && !(statusSsr.status).includes(`${q}`)) {
                            await myst.removeParticipant(groupId, groupMembers[i].id)
                            userRem += `@${groupMembers[i].id}\n\n`
                        }
                    }
                }
                await myst.sendTextWithMentions(from, userRem.replace('@c.us', ''))
            } catch (err) { await myst.reply(from, 'Talvez seja um engano, pois 0 pessoas foram removidas', id) }
            break
			//Policia
			case prefix+'d1':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
				if (mentionedJidList.length == 0 && !quotedMsg) return myst.reply(from, pt.wrongFormat(), id)
				if (mentionedJidList.length !== 0) theLolicon = await myst.getContact(mentionedJidList[0])
				var getLolicon = quotedMsg ? quotedMsgObj.sender.pushname : (mentionedJidList.length !== 0 ? theLolicon.pushname : pushname)
				if (getLolicon == undefined) getLolicon = `??? - Nome Confidencial- ???`
				fs.appendFile('./database/policia/lolicon.txt', `\n\n${getLolicon} - ${lvpc} Anos`)
				await myst.reply(from, 'Obrigado pela denúncia! caso queira ver os denúnciados por esse crime, use /fbi', id)
			break
			case prefix+'d2':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
				var aBraPlP = pushname
				if (aBraPlP == undefined) aBraPlP = `\n\n??? - Nome Confidencial - ??? - ${lvpc} Anos`
				fs.appendFile('./database/policia/entregados.txt', `\n\n${aBraPlP} - ${lvpc} Anos`)
				await myst.reply(from, 'Obigado por se denunciar, 3 viaturas foram enviadas a sua casa e sua pena foi reduzida em 2 horas', id)
			break
			case prefix+'d3':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
				if (mentionedJidList.length == 0 && !quotedMsg) return myst.reply(from, pt.wrongFormat(), id)
				if (mentionedJidList.length !== 0) theShotaCmnl = await myst.getContact(mentionedJidList[0])
				var takeChild = quotedMsg ? quotedMsgObj.sender.pushname : (mentionedJidList.length !== 0 ? theShotaCmnl.pushname : pushname)
				if (takeChild == undefined) takeChild = `??? - Nome Confidencial - ???`
				fs.appendFile('./database/policia/reversecon.txt', `\n\n${takeChild} - ${lvpc} Anos`)
				await myst.reply(from, 'Obrigado por denunciar esta criança, vamos prende-la e levar para o canil agr mesmo.', id)
			break
			case prefix+'d4':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
					if (mentionedJidList.length == 0 && args.length <= 3 && !q.includes('|') || !quotedMsg && args.length <= 2 && !q.includes('|')) return myst.reply(from, pt.wrongFormat(), id)
					const theCrime = argk.split('|')[1]
					if (mentionedJidList.length !== 0) criminalSmooth = await myst.getContact(mentionedJidList[0])
					var crimeReported = quotedMsg ? quotedMsgObj.sender.pushname : (mentionedJidList.length !== 0 ? criminalSmooth.pushname : pushname)
					if (crimeReported == undefined) crimeReported = `??? - Top secret name - ???`
				fs.appendFile('./database/policia/crimereport.txt', `\n\n${crimeReported} (${theCrime}) - ${lvpc} Anos`)
				await myst.reply(from, 'Obrigado por denunciar este crime, vamos agr mesmo ir atrás deste sujeito', id)
			break
			case prefix+'d5':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
				if (mentionedJidList.length == 0 && !quotedMsg) return myst.reply(from, pt.wrongFormat(), id)
				if (mentionedJidList.length !== 0) the1000gender = await myst.getContact(mentionedJidList[0])
				var genderFuck = quotedMsg ? quotedMsgObj.sender.pushname : (mentionedJidList.length !== 0 ? the1000gender.pushname : pushname)
				if (genderFuck == undefined) genderFuck = `??? - Nome Confidencial - ???`
				fs.appendFile('./database/policia/gaysreport.txt', `\n\n${genderFuck} - ${lvpc} Anos`)
				await myst.reply(from, 'Denuncia feita a esse lgbtmeudeus3vezqescrevoisso+ vamos ir prender ele agr mesmo', id)	
			break
			case prefix+'fbi':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
				const loliconList = fs.readFileSync('./database/policia/lolicon.txt').toString()
				await myst.reply(from, loliconList, id)
			break
			case prefix+'cia':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
				const reversePedo = fs.readFileSync('./database/policia/reversecon.txt').toString()
				await myst.reply(from, reversePedo, id)
			break
			case prefix+'reu':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
				const peopleCrz = fs.readFileSync('./database/policia/entregados.txt').toString()
				await myst.reply(from, peopleCrz, id)
			break
			case prefix+'gays':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
				const gaysArrest = fs.readFileSync('./database/policia/gaysreport.txt').toString()
				await myst.reply(from, gaysArrest, id)
			break
			case prefix+'crimes':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
            if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
				const aLotCrime = fs.readFileSync('./database/policia/crimereport.txt').toString()
				await myst.reply(from, aLotCrime, id)
			break
			case prefix+'resetar':
			if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
				await fs.writeFileSync('./database/policia/lolicon.txt', 'Lolicons ↓')
				await fs.writeFileSync('./database/policia/reversecon.txt', 'Menores Denunciados ↓')
				await fs.writeFileSync('./database/policia/entregados.txt', 'Auto-denuncias ↓')
				await fs.writeFileSync('./database/policia/gaysreport.txt', 'LGTB\'S Denunciados ↓')
				await fs.writeFileSync('./database/policia/crimereport.txt', 'Crimes Reportados ↓')
				await myst.reply(from, pt.doneOwner(), id)
			break
            //Comandos fofos
            case prefix+'raposa':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                    const rfox = await axios.get(`https://some-random-api.ml/img/fox`)
                    await myst.sendImage(from, rfox.data.link, '', '', id)
            break
            case prefix+'cachorro':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                const rdog = await axios.get(`https://some-random-api.ml/img/dog`)
                await myst.sendImage(from, rdog.data.link, 'dog.jpg')
            break
            case prefix+'gato':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                    const rcat = await axios.get(`https://some-random-api.ml/img/cat`)
                    await myst.sendImage(from, rcat.data.link, 'cat.jpg')
            break
            case prefix+'panda':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                    const rpanda = await axios.get(`https://some-random-api.ml/img/panda`)
                    await myst.sendImage(from, rpanda.data.link, 'panda.jpg')
            break
            case prefix+'pandav':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                    const rpandav = await axios.get(`https://some-random-api.ml/img/red_panda`)
                    await myst.sendImage(from, rpandav.data.link, 'pandav.jpg')
            break
            case prefix+'passaro':
            case prefix+'pássaro':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                    const rbird = await axios.get(`https://some-random-api.ml/img/birb`)
                    await myst.sendImage(from, rbird.data.link, 'bird.jpg')
            break
            case prefix+'koala':
            case prefix+'coala':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                    const rkoala = await axios.get(`https://some-random-api.ml/img/koala`)
                    await myst.sendImage(from, rkoala.data.link, 'koala.jpg')
            break
            //Consulta de jogos (+ discord canvas)
            //Comando feito inteiramente pelo Gahtee
            case prefix+'lol':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!q) return myst.reply(from, pt.wrongFormat(), id)
                    //Pega informações basicas (nick, id, level, id da foto)
                const lolinfo = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${q}?api_key=${config.apiriot}`)
                const lolrank = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${lolinfo.data.id}?api_key=${config.apiriot}`)
                const lolmstr = await axios.get(`https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${lolinfo.data.id}?api_key=${config.apiriot}`)
                const lolchmp = await axios.get(`http://ddragon.leagueoflegends.com/cdn/11.10.1/data/pt_BR/champion.json`)
                //const lolmtcht = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${lolinfo.data.puuid}/ids?start=0&count=1&api_key=${config.apiriot}`)                                   
                //const lolmtch = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${lolmtcht.data[0]}?api_key=${config.apiriot}`)
                var nCmp = {};
                var cmpFundo = {}; 
                var player = {
                            nick: lolinfo.data.name,
                            level: lolinfo.data.summonerLevel,
                            elosd: 'Unranked', 
                            ranksd: '',
                            elofl: 'Unranked', 
                            rankfl: '',
                            fotoid: lolinfo.data.profileIconId,
                            lpsd: '',
                            lpfl: '',
                            winsd: '',
                            losesd: '',
                            winfl: '',
                            losefl: '',
                            m1: 'Sem Dados',
                            m1l: '',
                            m2: 'Sem Dados',
                            m2l: '',
                            m3: 'Sem Dados',
                            m3l: ''
                        }
                        async function nomeCampeao(id) {
                            return new Promise((resolve,reject)=>{
                            request('http://ddragon.leagueoflegends.com/cdn/11.10.1/data/pt_BR/champion.json', function (error, response, body) {
                            let list = JSON.parse(body);
                            let championList = list.data;
                            for (var i in championList) {
                            if (championList[i].key == id) {
                                nCmp = championList[i].name;
                                cmpFundo = championList[i].id
                                resolve();
                            }
                                }
                              });
                            });
                          }
                        if (lolmstr.data[0] !== undefined){
                            await nomeCampeao(lolmstr.data[0].championId)
                            var fBase = cmpFundo
                            player.m1 = cmpFundo
                            player.m1l = lolmstr.data[0].championLevel
                        }
                        if (lolmstr.data[1] !== undefined){
                            await nomeCampeao(lolmstr.data[1].championId)
                            player.m2 = cmpFundo
                            player.m2l = lolmstr.data[1].championLevel
                        }
                        if (lolmstr.data[2] !== undefined){
                            await nomeCampeao(lolmstr.data[2].championId)
                            player.m3 = cmpFundo
                            player.m3l = lolmstr.data[2].championLevel
                        }
                        if (lolrank.data[0]  !== undefined && lolrank.data[0].queueType == 'RANKED_SOLO_5x5') {
                            player.elosd = lolrank.data[0].tier,
                            player.ranksd = lolrank.data[0].rank,
                            player.lpsd = lolrank.data[0].leaguePoints + 'LP',
                            player.winsd = lolrank.data[0].wins,
                            player.losesd = lolrank.data[0].losses
                        }
                        if (lolrank.data[0] !== undefined && lolrank.data[0].queueType == 'RANKED_FLEX_SR') {
                            player.elofl = lolrank.data[0].tier,
                            player.rankfl = lolrank.data[0].rank,
                            player.lpfl = lolrank.data[0].leaguePoints + 'LP',
                            player.winfl = lolrank.data[0].wins,
                            player.losefl = lolrank.data[0].losses
                        }
                        if (lolrank.data[1] !== undefined) {
                            player.elosd = lolrank.data[1].tier,
                            player.ranksd = lolrank.data[1].rank,
                            player.lpsd = lolrank.data[1].leaguePoints + 'LP',
                            player.winsd = lolrank.data[1].wins,
                            player.losesd = lolrank.data[1].losses,
                            player.elofl = lolrank.data[0].tier,
                            player.rankfl = lolrank.data[0].rank,
                            player.lpfl = lolrank.data[0].leaguePoints + 'LP',
                            player.winfl = lolrank.data[0].wins,
                            player.losefl = lolrank.data[0].losses
                        }
                        //cria o canvas
                const lol = createCanvas(1215, 717)
                const lolfoto = await loadImage(`http://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/${player.fotoid}.png`)
                const baselol = await loadImage(`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${fBase}_0.jpg`)
                const overlol = await loadImage('https://i.ibb.co/5MP4y6T/overlay-Lo-L.png')
                const bannerElo = await loadImage(`http://bit.ly/mystB${player.elosd}`)
                const flexLol = await loadImage(`http://bit.ly/myst${player.elofl}`)
                const m1lol = await loadImage(`http://ddragon.leagueoflegends.com/cdn/11.10.1/img/champion/${player.m1}.png`)
                const m2lol = await loadImage(`http://ddragon.leagueoflegends.com/cdn/11.10.1/img/champion/${player.m2}.png`)
                const m3lol = await loadImage(`http://ddragon.leagueoflegends.com/cdn/11.10.1/img/champion/${player.m3}.png`)
                const lolctx = lol.getContext('2d')
                    lolctx.drawImage(baselol, 0, 0, lol.width, lol.height)
                    lolctx.drawImage(overlol, 0, 0, lol.width, lol.height)
                    lolctx.drawImage(lolfoto, 165, 115, 250, 250);
                    lolctx.drawImage(bannerElo, 75, 0, 436, 717)
                    lolctx.drawImage(flexLol, 244 , 475, 100, 100)
                    lolctx.save();
                        lolctx.beginPath();
                        lolctx.arc(1037, 137, 35, 0, Math.PI*2, true); 
                        lolctx.closePath();
                        lolctx.clip();
                        lolctx.drawImage(m1lol, 1000, 100, 75, 75)
                    lolctx.restore();
                    lolctx.save();
                        lolctx.beginPath();
                        lolctx.arc(1112, 187, 35, 0, Math.PI*2, true); 
                        lolctx.closePath();
                        lolctx.clip();
                        lolctx.drawImage(m2lol, 1075, 150, 75, 75)
                    lolctx.restore();
                    lolctx.save();
                        lolctx.beginPath();
                        lolctx.arc(962, 187, 35, 0, Math.PI*2, true); 
                        lolctx.closePath();
                        lolctx.clip();
                        lolctx.drawImage(m3lol, 925, 150, 75, 75)
                    lolctx.restore();
                        lolctx.font = '30px sans-serif';
                        lolctx.fillStyle = '#ffffff';
                        lolctx.textAlign = 'center';
                    lolctx.fillText('M'+player.m1l, 1037, 95)
                    lolctx.fillText('M'+player.m2l, 1112, 145)
                    lolctx.fillText('M'+player.m3l, 962, 145)
                    lolctx.fillText(player.ranksd, 295, 373)
                        lolctx.textAlign = 'left';
                        lolctx.font = '36px sans-serif';
                        lolctx.fillStyle = '#ffffff';
                    lolctx.fillText(player.nick, 550, 110)
                    lolctx.fillText(player.level, 550, 220)
                        lolctx.font = '33px sans-serif';
                        lolctx.fillStyle = '#ffffff';
                    if (player.elosd !== 'Unranked') { lolctx.fillText('Jogos: '+(player.winsd+player.losesd)+' WR: '+(Math.round(player.winsd/(player.winsd+player.losesd)*100))+'%', 550, 325) }
                    else { lolctx.fillText(player.elosd, 550, 325) }
                    if (player.elofl !== 'Unranked') { lolctx.fillText('Jogos: '+(player.winfl+player.losefl)+' WR: '+(Math.round(player.winfl/(player.winfl+player.losefl)*100))+'%', 550, 435) }
                    else { lolctx.fillText(player.elofl, 550, 435) }
                    //transforma o canvas em buffer
                    const buflol = lol.toBuffer()
                    const lol64 = `data:image/png;base64,${buflol.toString('base64')}`
                    //manda o arquivo
                    await myst.sendImage(from, lol64, 'lol.png')
            break
			//Ataques
			case prefix+'bomb':
			if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
			if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
			var opsys = process.platform
			if (opsys == "win32" || opsys == "win64") { opsys = './lib/bomb/bomb.exe' } else { opsys = './lib/bomb/lbomb' }
			if (args.length == 1) {
				if (isNaN(args[0])) return myst.reply(from, pt.wrongFormat(), id)
				if (args[0].includes(`${ownerNumber.replace('@c.us', '')}`) || args[0].includes(`${botNumber.replace('@c.us', '')}`)) {
					await myst.sendText(ownerNumber, pt.bomba(pushname, user))
					await myst.reply(from, pt.fuckbomba(), id)
					return myst.contactBlock(user)
				}
				await myst.sendTextWithMentions(from, pt.bombi(args))
				console.log(color('[BOMB]', 'crimson'), color(`→ Pedido de spam feito pelo ${pushname} no alvo → ${args[0]}.`, 'gold'))
				const atk = execFile(opsys, [`${args[0]}`, '3', '1', '0'], async function(err, data) { if (err) return myst.reply(from, 'O programa fechou, isso indica um erro, fechamento manual ou termino do ataque', id) })
			} else return myst.reply(from, pt.wrongFormat(), id)
			break
            case prefix+'call':
            case prefix+'spamcall':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return myst.reply(from, pt.wrongFormat(), id)
                await myst.reply(from, pt.wait(), id)
                misc.call(q)
                    .then(async ({ result }) => {
                        await myst.reply(from, result.logs, id)
                        console.log(`Numero discado com sucesso: ${q}`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
                    })
            break
			case prefix+'cc':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				if (isNaN(Number(args[0]))) return await myst.reply(from, 'Para usar este comando você deve digitar a BIN (6 números)', id)
					    const isEven = number => number % 2 === 0
						const calculateEven = even => (even * 2 < 10) ? even * 2 : even * 2 - 9
						 const generateCheckSum = card => {
							const checksum = card.split('')
							.map((number, index) => (isEven(index)) ? calculateEven(number) : parseInt(number, 10))
							.reduce((previous, current) => previous + current) % 10
							return checksum === 0 ? 0 : 10 - checksum
						}
						const isValidCreditCard = card => generateCheckSum(card) === 0
						const ANZBinNumber = args[0]
						const randomNumber = Math.random().toString().slice(2,11)
						const partialCreditCardNumber = ANZBinNumber + randomNumber
						const checksum = generateCheckSum(partialCreditCardNumber)
						const generateCreditCard = (partialCreditCardNumber + checksum)
						start = new Date(2021, 0, 1)
						end = new Date(2031, 11, 30)
						function randomDate(start, end) {
						var date = new Date(+start + Math.random() * (end - start));
						var year = date.getFullYear();
						var month = 1+date.getMonth();
						month = month>=10?month:'0'+month;
						return month + '/' + year;
						}					
						var datacc = (randomDate(start, end))
						function cvv(min, max) {
						return Math.floor(Math.random() * (max - min + 1) + min);
						}
						var cvv1 = (cvv(100, 999))
						await myst.reply(from, `Número: ${generateCreditCard}\nData: ${datacc}\nCVV: ${cvv1}`,id)
                        console.log(generateCreditCard+'|'+datacc+'|'+cvv1)
			break
			case prefix+'nome':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
					myst.reply(from, 'Consulta de nome está atualmente OFFLINE, peço desculpas pelo transtorno.',id)
                    /*
                    misc.consultaNome(q)
                    .then(async ({ resultados }) => {
                        let txt = '*── 「 Nomes Encontrados 」 ──*'
                        for (let i = 0; i < resultados.length; i++) {
                            const { cpf, nome, sexo, nascimento } = resultados[i]
                            txt += `\n\n➸ *Nome*: ${nome}\n➸ *CPF*: ${cpf}\n➸ *Sexo*: ${sexo}\n➸ *Nascimento*: ${nascimento}`
                        }
                        await myst.reply(from, txt, id)
                        console.log('Nomes mandos com sucesso')
                    })
                    */
				break
            case prefix+'cpf':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                const infos = await axios.get(`http://api.trackear.com.br/basepv/cpf/${q}/noip`)
                if (infos.data.code !== 200) return await myst.sendText(from, 'CPF não encontrado ou consulta está off')
                await myst.sendText(from, `*CPF encontrado!* \n\n*CPF*: ${infos.data.cpf}\n*Nome*: ${infos.data.nome}\n*Sexo*: ${infos.data.sexo}\n*Nascimento*: ${infos.data.dtNascimento}\n*Idade*: ${infos.data.idade}`)
            break
			case prefix+'nhpdf':
				if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
				const nhpdfchk = await nhentai.exists(args[0])
				if (nhpdfchk != true) return await myst.reply(from,'História não encontrada...',id)
				await myst.reply(from, pt.wait(),id)
					downloader.nhPDF(q)
                    .then(async ({ result }) => {
                        const pic = await api.getBook(args[0])
                                .then((book) => {
                                     return api.getImageURL(book.cover)
                                })
                        const { title, secondary_title, pdf_file } = result
                        const dojin = await nhentai.getDoujin(args[0])
                        const { details, link } = dojin
                        const { tags, artists, languages, categories } = details
                        let teks = `*Titulo*: ${title}\n\n*Titulo Secundario*: ${secondary_title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artistas*: ${artists}\n\n*Linguas*: ${languages.join(', ')}\n\n*Categorias*: ${categories}\n\n*Link Online*: ${link}\n\n*Link para baixar em pdf*: ${pdf_file}`
                        await myst.sendFileFromUrl(from, pic, 'nhentai.jpg', teks, id)
						await console.log('História mandada com sucesso')
                        })
						.catch(async (err) => {
                            console.error(err)
                            await myst.reply(from, 'Um erro aconteceu!\nTente novamente, por favor.\n\nSe tiver duvidas, contate meu dono: wa.me/5583987599908', id)
						})
				break
            case prefix+'wps':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                    try {
                        const wpphe = await axios.get(`https://wallhaven.cc/api/v1/search?apikey=${config.wpheaven}&q=${q}&purity=100&sorting=random`)
                        var rwlpp = ''
                        for (let i = 0; i < 10; i++) { rwlpp += `${wpphe.data.data[i].path}\n` }
                        const heavenwpp = rwlpp.toString().split('\n')
                        const rmvempty = heavenwpp.splice(heavenwpp.indexOf(''), 1)
                        const rWallHe = heavenwpp[Math.floor(Math.random() * heavenwpp.length)]
                        await myst.sendFileFromUrl(from, rWallHe, rWallHe,`Original: ${rWallHe}`)
                    } catch (error) {
                        await myst.reply(from, pt.wpNotFound(), id)
                        console.log(color('[WPS]', 'crimson'), color(`→ Obtive erros no comando ${command} → ${error.message} - Você pode ignorar.`, 'gold'))
                    }
            break
            case prefix+'wpsn':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (!isPremium) return await myst.reply(from, pt.notPremium(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                    try {
                        if (Math.floor(Math.random() * 2) + 1 == 1) { var pur = 111 }
                        else {var pur = 110}
                        const wpphe = await axios.get(`https://wallhaven.cc/api/v1/search?apikey=${config.wpheaven}&q=${q}&purity=${pur}&sorting=random`)
                        var rwlpp = ''
                        for (let i = 0; i < 10; i++) { rwlpp += `${wpphe.data.data[i].path}\n` }
                        const heavenwpp = rwlpp.toString().split('\n')
                        const rmvempty = heavenwpp.splice(heavenwpp.indexOf(''), 1)
                        const rWallHe = heavenwpp[Math.floor(Math.random() * heavenwpp.length)]
                        await myst.sendFileFromUrl(from, rWallHe, rWallHe,`Original: ${rWallHe}`)
                    } catch (error) {
                        await myst.reply(from, pt.wpNotFound(), id)
                        console.log(color('[WPS]', 'crimson'), color(`→ Obtive erros no comando ${command} → ${error.message} - Você pode ignorar.`, 'gold'))
                    }
            break
            // Owner command
            case prefix+'block':
            case prefix+'blok':
                if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                if (mentionedJidList.length !== 0) {
                    for (let blok of mentionedJidList) {
                        if (blok === botNumber) return await myst.reply(from, pt.wrongFormat(), id)
                        await myst.contactBlock(blok)
                    }
                    await myst.reply(from, pt.doneOwner(), id)
                } else if (args.length === 1) {
                    await myst.contactBlock(args[0] + '@c.us')
                    await myst.reply(from, pt.doneOwner(), id)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'unblock':
            case prefix+'unblok':
                if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                if (mentionedJidList.length !== 0) {
                    for (let blok of mentionedJidList) {
                        if (blok === botNumber) return await myst.reply(from, pt.wrongFormat(), id)
                        await myst.contactUnblock(blok)
                    }
                    await myst.reply(from, pt.doneOwner(), id)
                } else if (args.length === 1) {
                    await myst.contactUnblock(args[0] + '@c.us')
                    await myst.reply(from, pt.doneOwner(), id)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'bc':
                if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                if (!q) return await myst.reply(from, pt.emptyMess(), id)
                const chats = await myst.getAllChatIds()
                for (let bcs of chats) {
                    let cvk = await myst.getChatById(bcs)
                    if (!cvk.isReadOnly) await myst.sendText(bcs, `${q}\n\n- Gahtee (Dono)\n_Transmissão_`)
                }
                await myst.reply(from, pt.doneOwner(), id)
            break
            case prefix+'clearall':
                if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                const allChats = await myst.getAllChats()
                for (let delChats of allChats) {
                    await myst.deleteChat(delChats.id)
                }
                await myst.reply(from, pt.doneOwner(), id)
            break
            case prefix+'leaveall':
                if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                if (!q) return await myst.reply(from, pt.emptyMess(), id)
                const allGroup = await myst.getAllGroups()
                for (let gclist of allGroup) {
                    await myst.sendText(gclist.contact.id, q)
                    await myst.leaveGroup(gclist.contact.id)
                }
                await myst.reply(from, pt.doneOwner())
            break
            case prefix+'getss':
                if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                const ses = await myst.getSnapshot()
                await myst.sendFile(from, ses, 'session.png', pt.doneOwner())
            break
            case prefix+'bb':
                if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await myst.reply(from, pt.wrongFormat(), id)
                            _ban.push(benet)
                            fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        }
                        await myst.reply(from, pt.doneOwner(), id)
                    } else {
                        _ban.push(args[1] + '@c.us')
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await myst.reply(from, pt.doneOwner(), id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await myst.reply(from, pt.wrongFormat(), id)
                        _ban.splice(mentionedJidList[0], 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await myst.reply(from, pt.doneOwner(), id)
                    } else{
                        _ban.splice(args[1] + '@c.us', 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await myst.reply(from, pt.doneOwner(), id)
                    }
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
			case prefix+'give':
				if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
				if (mentionedJidList.length == 0 && !quotedMsg) return myst.reply(from, pt.wrongFormat(), id)
				if (mentionedJidList.length !== 0) xpUserGet = await myst.getContact(mentionedJidList[0])
				var userGainXp = quotedMsg ? quotedMsgObj.sender.id : (mentionedJidList.length !== 0 ? xpUserGet.id : user)
				var theXPtoAdd = quotedMsg ? args[0] : (mentionedJidList.length !== 0 ? args[1] : args[1])
				if (isNaN(theXPtoAdd)) return myst.reply(from, 'Somente números', id)
				level.addLevelingXp(userGainXp, Number(theXPtoAdd), _level)
				await myst.sendTextWithMentions(from, `O player @${userGainXp} recebeu a quantidade de ${theXPtoAdd} XP.`)
			break
            case prefix+'eval':
            case prefix+'ev':
                if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                if (!q) return await myst.reply(from, pt.wrongFormat(), id)
                try {
                    let evaled = await eval(q)
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await myst.sendText(from, evaled)
                } catch (err) {
                    console.error(err)
                    await myst.reply(from, err, id)
                }
            break
            case prefix+'shutdown':
                if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                await myst.sendText(from, 'teu pai usa calcinha~ 👋')
				await myst.kill()
            break
            case prefix+'premium':
                if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let prem of mentionedJidList) {
                            if (prem === botNumber) return await myst.reply(from, pt.wrongFormat(), id)
                            premium.addPremiumUser(prem, args[2], _premium)
                            await myst.reply(from, `*── 「 Premium Ativado! 」 ──*\n\n➸ *ID*: ${prem}\n➸ *Duração*: ${ms(toMs(args[2])).days} dia(s) ${ms(toMs(args[2])).hours} hora(s) ${ms(toMs(args[2])).minutes} minuto(s)`, id)
                        }
                    } else {
                        premium.addPremiumUser(args[1] + '@c.us', args[2], _premium)
                        await myst.reply(from, `*── 「 Premium Ativado! 」 ──*\n\n➸ *ID*: ${args[1]}@c.us\n➸ *Duração*: ${ms(toMs(args[2])).days} dia(s) ${ms(toMs(args[2])).hours} hora(s) ${ms(toMs(args[2])).minutes} minuto(s)`, id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await myst.reply(from, pt.wrongFormat(), id)
                        _premium.splice(premium.getPremiumPosition(mentionedJidList[0], _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await myst.reply(from, pt.doneOwner(), id)
                    } else {
                        _premium.splice(premium.getPremiumPosition(args[1] + '@c.us', _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await myst.reply(from, pt.doneOwner(), id)
                    }
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'setstatus':
            case prefix+'setstats':
            case prefix+'setstat':
                if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                if (!q) return await myst.reply(from, pt.emptyMess(), id)
                await myst.setMyStatus(q)
                await myst.reply(from, pt.doneOwner(), id)
            break
            case prefix+'mute':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(pushname), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
                if (!isGroupAdmins && !isOwner) return await myst.reply(from, pt.adminOnly(), id)
                if (ar[0] === 'on') {
                    if (isMute) return await myst.reply(from, pt.muteChatOnAlready(), id)
                    _mute.push(groupId)
                    fs.writeFileSync('./database/bot/mute.json', JSON.stringify(_mute))
                    await myst.reply(from, pt.muteChatOn(), id)
                } else if (ar[0] === 'off') {
                    _mute.splice(groupId, 1)
                    fs.writeFileSync('./database/bot/mute.json', JSON.stringify(_mute))
                    await myst.reply(from, pt.muteChatOff(), id)
                } else {
                    await myst.reply(from, pt.wrongFormat(), id)
                }
            break
            case prefix+'setname':
                if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                if (!q || q.length > 25) return await myst.reply(from, pt.wrongFormat(), id)
                await myst.setMyName(q)
                await myst.reply(from, pt.nameChanged(q), id)
            break
			case prefix+'byebye':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(pushname), id)
				if (!isOwner) return await myst.reply(from, pt.ownerOnly(), id)
                if (!isGroupMsg) return await myst.reply(from, pt.groupOnly(), id)
				if (!isBotGroupAdmins) return await myst.reply(from, pt.botNotAdmin(), id)
					for (let i = 0; i < groupMembers.length; i++) {
						if (groupAdmins.includes(groupMembers[i].id) || ownerNumber.includes(groupMembers[i].id)) {
							console.log(color('[IMUNE] - ', 'crimson'), groupMembers[i].id)
						} else { await myst.removeParticipant(groupId, groupMembers[i].id) }
					}
			break
            case prefix+'grouplist':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                const getGroups = await myst.getAllGroups()
                let txtGc = '*── 「 GROUP LIST 」 ──*\n'
                for (let i = 0; i < getGroups.length; i++) {
                    txtGc += `\n\n❏ *Nome*: ${getGroups[i].name}\n❏ *Mensagens não lidas*: ${getGroups[i].unreadCount} mensagens\n❏ *GroupID*: ${getGroups[i].id}`
                }
                await myst.sendText(from, txtGc)
            break
			case prefix+'elos':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				await myst.reply(from, 'Bronze I-IV (0-28) \nPrata I-IV (29-53) \nOuro I-IV (54-78) \nDiamante I-IV (79-99) \nDiamante Mestre (100-199) \nElite (200-299) \nGlobal (300-399) \nHerói (400-499) \nLendário (500-599) \nSemi-Deus (600-699) \nArcanjo (700-799) \nDemoniaco (800-899) \nDivindade (900+)', id)
			break
			case prefix+'nd11':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
				await myst.reply(from, 'Aqui é um battle royale, vamos banindo os vermes até sobrar os melhores, para o seu bem e de sua família não tente bancar o engraçadinho por aqui\n\n*HIERARCHY ND⏅11*\n\n 💠 *ELDAR* (líder)\n*Ryo Nagasaki*\nO *Eldar dessa comunidade* criador da porra toda...\nÉ Senhor nagasaki pra vocês novatos \nRespeitem a supremacy, vida longa ao rei  リ⏅ウ\n\n ⚜️ *LORDS*\n*K1LLER* (LORD)  *Representante do Eldar* e monitor das conversas e diálogos\nLíder dos ataques organizados.\nThis is Biohazard bitches. ☣︎ \n\n*KAS* (LORD)\n*responsável pelas punições* de membros desobedientes vacile com a gente e vai ter que se entender com eles.\n\n*ROYAL FAMILY* 👑\n*GAHTEE*\nMembro VIP da *ND⏅11* (carinha do bot)\nFiliado ao clã ☣︎', id)
			break
            case prefix+'simbolo':
            case prefix+'símbolo':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.reply(from, '⏅', id)
            break
            case prefix+'kwai':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                if (isGroupMsg) return await myst.reply(from, pt.pcOnly(), id)
                    await myst.reply(from, 'Oi! eu sou a Myst! e eu vou te ensinar como ativar o premium usando o meu codigo kwai! \n\nPrimeiro: Baixe o app Kwai em sua loja de aplicativos (Google Play ou App Store)\n\nSegundo: Crie a sua conta no app\n\nTerceiro: Selecione a opção Kwai Gold\n\nQuarto: Procure a opção de vincular código e ponha o seguinte codigo:\n\nKwai885766175\n\n(Para facilitar, vou mandar também na proxima mensagem)\n\nE após isso, basta você assistir a 3 minutinhos de videos do Kwai e está feito! Basta avisar meu dono que ele vai consultar e efetivar seu premium!\n\nContato do meu dono: wa.me/5583987599908', id)
                    await myst.reply(from, 'Kwai885766175', id)
            break
            case prefix+'destrava':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                await myst.sendText(from, pt.destrava(), id)
            break
            case prefix+'phteste':
                if (!isRegistered) return await myst.reply(from, pt.notRegistered(), id)
                const video = await pornhub.page(q, ['title','download_urls','pornstars']);
                console.log(video)
                await myst.reply(from, video, id)
            break
            default:
                if (isCmd) {
                    await myst.reply(from, pt.cmdNotFound(command), id)
                }
            break
        }
    } catch (err) {
        console.error(color('[ERROR]', 'red'), err)
    }
}
/********** END OF MESSAGE HANDLER **********/