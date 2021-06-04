const { fetchJson } = require('../tools/fetcher')
const { twitter } = require('video-url-link')
const { promisify } = require('util')
const config = require('../config.json')
const twtGetInfo = promisify(twitter.getInfo)

const insta = (url) => new Promise((resolve, reject) => {
    console.log(`Get Instagram media from ${url}`)
    fetchJson(`https://api.vhtear.com/instadl?link=${url}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const tik = (url) => new Promise((resolve, reject) => {
    console.log(`Get TikTok media from ${url}`)
    fetchJson(`https://api.vhtear.com/tiktokdl?link=${url}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const fb = (url) => new Promise((resolve, reject) => {
    console.log(`Get Facebook media from ${url}`)
    fetchJson(`https://api.vhtear.com/fbdl?link=${url}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const nhPDF = (Sdig) => new Promise((resolve, reject) => {
    console.log(`pegando a historia ${Sdig}`)
    fetchJson(`https://api.vhtear.com/nhentaipdfdownload?query=${Sdig}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const ytdl = (idv) => new Promise((resolve, reject) => {
    console.log(`Get YouTube media from ${idv}`)
    fetchJson(`https://api.vhtear.com/ytdl?link=https://youtu.be/${idv}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const ytPlay = (q) => new Promise((resolve, reject) => {
    console.log(`Searching for ${q} in YouTube...`)
	console.log(`https://api.vhtear.com/ytmp3?query=${q}&apikey=${config.vhtear}`)
    fetchJson(`https://api.vhtear.com/ytmp3?query=${q}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})


const tweet = (url) => new Promise((resolve, reject) => {
    console.log(`Get Twitter media from ${url}`)
    twtGetInfo(url, {}, (error, info) => {
        if (error) {
            reject(error)
        } else {
            resolve(info)
        }
    })
})

const tikNoWm = (url) => new Promise((resolve, reject) => {
    console.log(`Get TikTok with no WM from ${url}`)
    fetchJson(`https://videfikri.com/api/tiktok/?url=${url}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})



module.exports = {
    fb,
    ytdl,
	ytPlay,
    tik,
	nhPDF,
    insta,
    tweet,
    tikNoWm
}
