const { fetchJson } = require('../tools/fetcher')
const ph = require('@justalk/pornhub-api')
const config = require('../config.json')

const randomLewd = () => new Promise((resolve, reject) => {
    const tag = ['ecchi', 'lewdanimegirls', 'hentai', 'hentaifemdom', 'hentaiparadise', 'hentai4everyone', 'animearmpits', 'animefeets', 'animethighss', 'animebooty', 'biganimetiddies', 'animebellybutton', 'sideoppai', 'ahegao']
    const randTag = tag[Math.floor(Math.random() * tag.length)]
    console.log(`Searching lewd from ${randTag} subreddit...`)
    fetchJson(`https://meme-api.herokuapp.com/gimme/${randTag}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const axila = () => new Promise((resolve, reject) => {
    console.log('Searching for armpits...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animearmpits')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const pes = () => new Promise((resolve, reject) => {
    console.log('Searching for feets...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animefeets')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const coxa = () => new Promise((resolve, reject) => {
    console.log('Searching for thighs...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animethighss')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const bunda = () => new Promise((resolve, reject) => {
    console.log('Searching for ass...')
    fetchJson('https://meme-api.herokuapp.com/gimme/animebooty')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const peitos = () => new Promise((resolve, reject) => {
    console.log('Searching for boobs...')
    fetchJson('https://meme-api.herokuapp.com/gimme/biganimetiddies')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const pl = () => new Promise((resolve, reject) => {
    console.log('Searching for sideboobs...')
    fetchJson('https://meme-api.herokuapp.com/gimme/sideoppai')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const loli = () => new Promise((resolve, reject) => {
    console.log('Searching for loli...')
    fetchJson('https://nekos.life/api/v2/img/keta')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const ahegao = () => new Promise((resolve, reject) => {
    console.log('Searching for ahegao...')
    fetchJson('https://meme-api.herokuapp.com/gimme/ahegao')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const anal = () => new Promise((resolve, reject) => {
    console.log('Searching for anal...')
    fetchJson('https://nekos.life/api/v2/img/anal')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const solo = () => new Promise((resolve, reject) => {
    console.log('Searching for solo...')
    fetchJson('https://nekos.life/api/v2/img/solo')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const futanari = () => new Promise((resolve, reject) => {
    console.log('Searching for futanari...')
    fetchJson('https://nekos.life/api/v2/img/futanari')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const boquete = (boquete) => new Promise((resolve, reject) => {
    console.log('Searching for boquete...')
    fetchJson(`${boquete}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const neko = (neko) => new Promise((resolve, reject) => {
    console.log('Searching for neko...')
    fetchJson(`${neko}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const femdom = () => new Promise((resolve, reject) => {
    console.log('Searching for femdom...')
    fetchJson('https://nekos.life/api/v2/img/femdom')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const lewdavatar = () => new Promise((resolve, reject) => {
    console.log('Searching for lewdavatar...')
    fetchJson('https://nekos.life/api/v2/img/nsfw_avatar')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const yuri = () => new Promise((resolve, reject) => {
    console.log('Searching for yuri...')
    fetchJson('https://nekos.life/api/v2/img/eroyuri')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const rpeitos = (peitos) => new Promise((resolve, reject) => {
    console.log('Searching for peitos...')
    fetchJson(`${peitos}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const rbdsm = (bdsm) => new Promise((resolve, reject) => {
    console.log('Searching for bdsm...')
    fetchJson(`${bdsm}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const rbundas = (bunda) => new Promise((resolve, reject) => {
    console.log('Searching for bunda...')
    fetchJson(`${bunda}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const rpussy = (bucetas) => new Promise((resolve, reject) => {
    console.log('Searching for pussy...')
    fetchJson(`${bucetas}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const rmilfs = (milfs) => new Promise((resolve, reject) => {
    console.log('Searching for milfs...')
    fetchJson(`${milfs}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const reddit = (q) => new Promise((resolve, reject) => {
    console.log('Searching for '+q)
    fetchJson(`https://meme-api.herokuapp.com/gimme/${q}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const phDl = (url) => new Promise((resolve, reject) => {
    console.log(`Get Pornhub metadata from ${url}`)
    ph.page(url, ['title', 'download_urls', 'thumbnail_url'])
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports = {
    randomLewd,
    axila,
    pes,
    coxa,
    bunda,
    peitos,
	neko,
    pl,
	loli,
	futanari,
	boquete,
	anal,
	lewdavatar,
	yuri,
	femdom,
	solo,
    ahegao,
	rpeitos,
	rbdsm,
	rbundas,
	rpussy,
	reddit,
    phDl
}
