const { fetchJson, fetchText } = require('../tools/fetcher')
const config = require('../config.json')
const moment = require('moment-timezone')
const needle = require('needle')
const trans = require('@vitalets/google-translate-api')
const fetch = require('node-fetch')

const stickernobg = (query) => new Promise((resolve, reject) => {
    console.log('Converting sticker no bg...')
    fetchJson(`https://api.vhtear.com/removebgwithurl?link=${query}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const call = (phoneNumber) => new Promise((resolve, reject) => {
    console.log(`Calling number: ${phoneNumber}...`)
    fetchJson(`https://videfikri.com/api/call?nohp=${phoneNumber}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const email = (emailTarget, subjectEmail, messageEmail) => new Promise((resolve, reject) => {
    console.log(`Sending email to: ${emailTarget}\nSubject: ${subjectEmail}\nMessage: ${messageEmail}`)
    fetchJson(`https://videfikri.com/api/spamemail?email=${emailTarget}&subjek=${subjectEmail}&pesan=${messageEmail}`)
        .then((result) => resolve(result))
        .catch((err) =>  reject(err))
})

const its = (query) => new Promise((resolve, reject) => {
    console.log('Searching for IG Story...')
    fetchJson(`https://api.vhtear.com/igstory?query=${query}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const lirik = (query) => new Promise((resolve, reject) => {
    console.log(`Searching lyrics for ${query}...`)
    fetchJson(`https://api.vhtear.com/liriklagu?query=${query}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const distance = (from, to) => new Promise((resolve, reject) => {
    console.log('Get data and calculate it...')
	console.log(`https://api.vhtear.com/distance?from=${from}&to=${to}&apikey=${config.vhtear}`)
    fetchJson(`https://api.vhtear.com/distance?from=${from}&to=${to}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const sticker = (query) => new Promise((resolve, reject) => {
    console.log('Searching for sticker...')
    fetchJson(`https://api.vhtear.com/wasticker?query=${query}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const ytSearch = (query) => new Promise((resolve, reject) => {
    console.log(`Get YouTube search results for ${query}...`)
    fetchJson(`https://api.vhtear.com/youtube?query=${query}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const whois = (ip) => new Promise((resolve, reject) => {
    console.log(`Look-up IP for ${ip}`)
    fetchJson(`https://api.vhtear.com/ipwhois?ipaddr=${ip}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const shortener = (url) => new Promise((resolve, reject) => {
    console.log('Creating shortlink...')
    fetchText(`https://tinyurl.com/api-create.php?url=${url}`)
        .then((text) => resolve(text))
        .catch((err) => reject(err))
})

const trendingTwt = () => new Promise((resolve, reject) => {
    console.log('Get Twitter trending...')
    fetchJson('https://docs-jojo.herokuapp.com/api/trendingtwitter')
        .then((resultados) => resolve(resultados))
        .catch((err) => reject(err))
})

const consultaNome = (nomeP) => new Promise((resolve, reject) => {
    console.log(`Consultando o nome ${nomeP}`)
    fetchJson(`http://45.178.183.3/nome.php?nome=${nomeP}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const spamsms = (no, amount) => new Promise((resolve, reject) => {
    console.log(`Sending spam SMS to: ${no}`)
    fetchJson(`https://docs-jojo.herokuapp.com/api/spamsms?no=${no}&jum=${amount}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const corona = (country) => new Promise((resolve, reject) => {
    console.log(`Search for country ${country}`)
    fetchJson(`https://coronavirus-19-api.herokuapp.com/countries/${country}/`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const credito = (numero) => new Promise((resolve, reject) => {
    console.log(`tentando adicionar bonus`)
    return fetch("http://interatividade.oi.ddivulga.com/carrotProcess.php", {
		  body: `msisdn=${numero}&campid=1003bf0e-7251233f-6f45-4179-8752-fb36dbfe1ac9&opCode=OO&opCode=OO`,
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  method: "POST"
		})
})
/*
const credito2 = (numero) => new Promise((resolve, reject) => {
    console.log(`tentando adicionar bonus`)
	fetchJson('http://interatividade.oi.ddivulga.com/carrotProcess.ph', body: `msisdn=${numero}&campid=1003bf0e-7251233f-6f45-4179-8752-fb36dbfe1ac9&opCode=OO&opCode=OO`, method: "POST" })
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})
*/
const translate = (text, lang) => { return new Promise(async (resolve, reject) => { 
	trans(text, { client: 'gtx', to: lang })
	.then((res) => resolve(res.text))
	.catch((err) => reject(err)) }) 
}

module.exports = {
    lirik,
    sticker,
    ytSearch,
    whois,
    shortener,
    its,
    distance,
    trendingTwt,
	consultaNome,
    spamsms,
    email,
    call,
	translate,
    stickernobg,
	credito,
    corona
}
