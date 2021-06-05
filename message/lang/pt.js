/* eslint-disable quotes */
const { prefix } = require('../../config.json')

exports.wait = () => {
    return `Espera um pouquinho`
}

exports.ok = () => {
    return `Ok!`
}

exports.apenasBot = () => {
    return `Oi! eu sou a Myst!
Este contato é apenas um bot e não consegue ler mensagens..
Para começar a usar o bot digite */menu*
Ou, caso teha algum problema, consulte meu dono clicando no link abaixo:
wa.me/5583987599908`
}

exports.notPremium = () => {
    return `Desculpe, apenas usuários premium podem usar este comando! para saber mais, digite: /qpremium.`
}

exports.recTrava = (user) => {
    return `Posso ter recebido uma trava pelo wa.me/${user.replace('@c.us', '')} e então o bloqueei, peço que verifique.`
}

exports.baninj = (user) => {
    return `Bani o usuário @${user.replace('@c.us', '')} pelo motivo de: `
}

exports.antitravaOnAlready = () => {
    return `O recurso antitrava ja havia sido ativado anteriormente`
}

exports.antitravaOn = () => {
    return `O recurso antitrava foi ativado`
}

exports.antitravaOff = () => {
    return `O recurso antitrava foi desativado`
}

exports.nopanic = () => {
    return `Protocolo Widow's Wine Concluido!
Inimigo caído! menos um trava-zapper nesse grupo! 
Missão concluída!
Capitã Myst desligando.`
}

exports.qPremium = () => {
    return `
O sistema premium é uma assinatura dá acesso a todos os comandos do /pcmd e você vai poder por o bot em um grupo. além de ajudar o dono a manter o bot online sem erros	de api.
	
1 mês = 5 reais
Aceito: Pix, Mercado Pago, Transferencia, PayPal e Boleto.

*Aceito também baixar Kwai pelo meu link*! *é de graça*!

Caso queira saber mais, entre em contato com o Gahtee clicando no link:
	
wa.me/558387599908?text=Tenho%20interesse%20no%20premium.%20meu%20nome%20é:%20
	`
}

exports.ban = (ban) => {
    return `@${ban} você foi oficialmente expulso desse inferno!`
}

exports.unban = (unban) => {
    return `A entrada do @${unban} foi novamente permitida no inferno...`
}

exports.softban = (bgmcomum, args) => {

	return `Triste, @${bgmcomum}, você vai ser banido por ${args[0]} minutos. Tchauzinho.` 
}

exports.softban2 = (mentionedJidList, args) => {

	return `Triste, ${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}, você vai ser banido por ${args[0]} minutos. Tchauzinho.` 
}

exports.unsoftban = (bgmcomum, args) => {
	return `É hora do orangotango voltar ao grupo..` 
}

exports.cors = () => { 
	return `Você esqueceu de colocar se quer criativo [1 ou c ou creative], survival [0 ou s ou survival], adventure [2 ou a ou adventure] ou espectador [3 ou spectator].` 
}

exports.mine = (user) => { 
	return `O modo de jogo de "@${user}" foi definido para ` 
}

exports.wrongFormat = () => {
    return `Formato Incorreto, cheque no *${prefix}menu*.`
}

exports.emptyMess = () => {
    return `Por favor, escreva a mensagem!`
}

exports.cmdNotFound = (cmd) => {
    return `Comando ${cmd} não existe!`
}

exports.getAnime = (syno, getAnime) => { 
    return `*Titulo:* ${getAnime.data.results[0].title}\n\n*Episódios:* ${getAnime.data.results[0].episodes}\n\n*Classificação:* ${getAnime.data.results[0].rated}\n\n*Nota:* ${getAnime.data.results[0].score}\n\n*Sinopse:* ${syno}\n\n*Link*: ${getAnime.data.results[0].url}` 
}

exports.getManga = (syno, getManga) => { 
    return `*Titulo:* ${getManga.data.results[0].title}\n\n*Capítulos:* ${getManga.data.results[0].chapters}\n\n*Volumes:* ${getManga.data.results[0].volumes}\n\n*Nota:* ${getManga.data.results[0].score}\n\n*Sinopse:* ${syno}\n\n*Link*: ${getManga.data.results[0].url}` 
}

exports.notFound = () => {
    return `Resultado não encontrado!`
}

exports.wpNotFound = () => {
    return `Wallpaper não encontrado!`
}

exports.kickdono = (cmd) => {
    return `Você não pode kickar meu dono!`
}

exports.kickpremium = (cmd) => {
    return `Você não pode kickar um membro premium!`
}

exports.blocked = (ownerNumber) => {
    return `O bot não consegue receber chamadas, você foi bloqueado!\ncontato do dono: wa.me/${ownerNumber.replace('@c.us', '')}`
}

exports.ownerOnly = () => {
    return `Esse comando somente o meu dono pode usar!`
}

exports.doneOwner = () => {
    return `Pronto, chefinho!`
}

exports.groupOnly = () => {
    return `Esse comando só pode ser usado em grupos!`
}

exports.adminOnly = () => {
    return `Esse comando só pode ser usado por ademiros!`
}

exports.notNsfw = () => {
    return `o NSFW não foi ativado`
}

exports.nsfwOn = () => {
    return `O NSFW foi *ativado*!`
}

exports.nsfwOff = () => {
    return `O NSFW foi *desativado*!`
}

exports.nsfwAlready = () => {
    return `O NSFW ja havia sido ativado.`
}

exports.addedGroup = (chat) => {
    return `Oi! sou a Myst! fui chamada para esse grupo e estou aqui para servir!
	
 /menu`
}

exports.nhFalse = () => {
    return `Codigo inválido`
}
exports.nhentai = (title, parodies, tags, artists, groups, languages, categories, link) => {
	return `*Titulo* : ${title}\n\n*Parodia de* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artistas* : ${artists.join(', ')}\n\n*Grupos* : ${groups.join(', ')}\n\n*Linguagens* : ${languages.join(', ')}\n\n*Categoria* : ${categories}\n\n*Link* : ${link}\n\nAguarde, estou enviando o hentai, pode demorar varios minutos dependendo da quantidade de paginas.` 
}

exports.listBlock = (blockNumber) => {
    return `
╭────────────────────────
│                   「 Corredor da Vergonha 」
│
│Total Bloqueados: *${blockNumber.length}* user(s)\n
╰────────────────────────`
}

exports.gaming = (xp) => {
	return `Para apostar você deve ter ao menos 1000 XP e também dizer o valor da sua aposta (máximo de 500) em números.\nSeu XP → ${xp}`
}

exports.limitgame = () => {
	return `Sate, sate, sate, você já jogou demais hoje, evite virar um apostador compulsivo, espere 10 minutos.`
}

exports.loseshot = (nrolxp) => {
	return `Você não sobreviveu a isso, perdendo ${nrolxp} XP, F.`
}

exports.winshot = (prolxp) => {	
	return `Parabéns, você sobreviveu e ganhou ${prolxp} XP!`
}

exports.akituto = () => {
	return `
╭────────────────────────
│Para responder o akinator, você deve 
│usar /aki sim / não / ns
│Caso tenha errado alguma resposta, 
│use: /aki voltar
│E se deseja começar um novo jogo, 
│excluindo o antigo: /aki novo
╰────────────────────────` 
	}

exports.akiresp = () => {
	return `Para jogar akinator, responda com sim ou nao.` 
	}

exports.akiwon = (aki, akiwon) => {
	return `✪ Palpite: ${akiwon.name}\n\n✪ De: ${akiwon.description}\n\n✪ Ranking: ${akiwon.ranking}\n\n✪ Quantidade de Palpites: ${aki.guessCount}\n\nSe não for essa continue jogando para bater a quantidade de tentativas!` 
	}

exports.akifail = () => {
	return `A sessão de jogo fechou, você pode tentar abrir uma nova sessão! use o /aki! se não funcionar sugiro contatar o dono...` 
	}

exports.akistart = (aki) => {
	return `Questão: ${aki.question}\n\nProgresso: ${aki.progress}\n\nResponda com ${prefix}aki sim ou nao.` 
	}

exports.notPremium = () => {
    return `Desculpe, esse comando só pode ser usado por usuários premium!`
}

exports.notAdmin = () => {
    return `EI! CALMA AI! você não é ademiro!`
}

exports.qr = (qrR) => { 
	return `Nesse QR estava escrito: 
	
${qrR.data[0].symbol[0].data}` 
}

exports.adminAlready = () => {
    return `Esse carinha já é ademiro!`
}

exports.botNotPremium = () => {
    return `Comando não suportado, se acha que é um erro, fale com o dono: wa.me/${ownerNumber.replace('@c.us', '')}`
}

exports.botNotAdmin = () => {
    return `Torne o BOT um admin antes`
}

exports.bomba = (pushname, user) => {

	return `O ${pushname} do número wa.me/${user.replace('@c.us', '')} tentou usar o Bomb em mim ou você.` 
}

exports.fuckbomba = (pushname, user) => {

	return `Por você ter tentado usar este comando em mim ou no meu dono, vou avisa-lo.` 
}

exports.bombi = (args) => {

	return `Capitã Myst falando!

recebi seu pedido e ja começarei o ataque contra o "@${args[0]}" dentro de alguns segundos!` 
}


exports.ytFoundV = (res) => {
    return `
╭─────────────────────
│                   「 YOUTUBE 」
│
│ *Video foi encontrado*
│➸ *Título*: ${res.title}
│
│➸ *Link para download do vídeo*: 
│${res.UrlVideo}
│
│➸ *Link para download do áudio*: 
│${res.UrlMp3}
╰─────────────────────`
}

exports.ytFoundM = (res) => {
    return `
╭─────────────────────
│                   「 YOUTUBE 」
│
│Musica foi encontrada
│➸ *Título*: ${res.title}
│
│Estarei enviando em breve
╰─────────────────────`
}

exports.notRegistered = () => {
    return `Você não está registrado\nPor favor, se registre usando:\n*${prefix}register nome | idade*\nExemplo: /register Gahtee | 18\n\n*TEM QUE SER NO MEU PRIVADO*`
}

exports.registered = (name, age, userId, time, serial) => {
    return `
╭────────────────────────
│                   「 Registro 」
│    
│Sua conta foi criada com os seguintes dados:
│➸ *Nome*: ${name}
│➸ *Idade*: ${age}
│➸ *ID*: ${userId}
│➸ *Hora*: ${time}
│➸ *IDU*: ${serial}
│    
│Advertencia:
│Não compartilhe o seu *IDU* com ninguem!
│    
│Digite *${prefix}regras* Primeiro ok?
╰────────────────────────`
}

exports.registeredAlready = () => {
    return `Você já se registrou!`
}

exports.received = (pushname) => {
    return `Oi ${pushname}!\nObrigado por reportar! vamos tentar conserrtar o mais rapido possível.`
}

exports.daily = (time) => {
    return `Desculpe, mas você chegou no limite de usos desse comando.\nPor favor espere *${time.hours}* hora(s) *${time.minutes}* minuto(s) *${time.seconds}* segundo(s)`
}

exports.videoLimit = () => {
    return `Esta mídia é muito grande para eu enviar, então vou manda-lo em forma de link para que você possa baixar!\n\n`
}

exports.ytResult = (urlyt, title, channel, duration, views) => {
    return `
╭──────────────────────
│                   「 YouTube 」
│
│➸ *Titulo*: ${title}
│➸ *Canal*: ${channel}
│➸ *Duração*: ${duration}
│➸ *Views*: ${views}
│➸ *Link*: ${urlyt}
╰──────────────────────`
}

exports.profile = (username, status, premi, benet, adm, level, requiredXp, xp) => {
    return `
╭─────────────────────
│                   「 Usuário」
│
│➸ *Nick*: ${username}
│➸ *Status*: ${status}
│➸ *Premium*: ${premi}
│➸ *Banned*: ${benet}
│➸ *Admin*: ${adm}
│
│
┣─────────────────────
│                   「 Progresso 」
│
│➸ *Level*: ${level}
│➸ *XP*: ${xp} / ${requiredXp}
╰─────────────────────`
}

exports.detectorOn = () => {
    return `
╭────────────────────────
│              「 ANTI LINK DE GRUPOS 」
│
│ATENÇÂO A TODOS OS MEMBROS.
│Este grupo tem um detector de links de grupo, caso mande um, será banido imediatamente
╰────────────────────────`
}

exports.detectorOff = () => {
    return `Detector de links foi *desativado*!`
}

exports.detectorOnAlready = () => {
    return `Detector de links já havia sido ativado!`
}

exports.antiNsfwOn = (name, formattedTitle) => {
    return `
╭────────────────────────
│                   「 ANTI LINK NSFW 」
│
│ATENÇÂO A TODOS OS MEMBROS.
│Este grupo tem um detector de links NSFW, caso mande um, será banido imediatamente
╰────────────────────────`
}

exports.antiNsfwOff = () => {
    return `Detector de links NSFW foi *desativado*!`
}

exports.antiNsfwOnAlready = () => {
    return `Detector de links NSFW já haia sido ativado.`
}

exports.linkDetected = () => {
    return `
╭────────────────────────
│              「 ANTI LINK DE GRUPOS 」
│
│Você mandou um link de grupo!
│Você será banido...
╰────────────────────────`
}

exports.levelingOn = () => {
    return `LevelUP foi *Ativado*!`
}

exports.levelingOff = () => {
    return `LevelUP foi *desativado*!`
}

exports.levelingOnAlready = () => {
    return `LevelUP já havia sido ativado.`
}

exports.levelingNotOn = () => {
    return `LevelUP ainda não foi ativado.`
}

exports.levelNull = () => {
    return `Você ainda não tem nível!`
}

exports.removeradm = () => {
    return `Você precisa remover o adm desta pessoa para usar esse comando`
}

exports.welcome = (event) => {
    return `Bem vindo ao inferno, @${event.who.replace('@c.us', '')}!`
}

exports.welcomeOn = () => {
    return `Bem-vindo foi *ativado*!`
}

exports.welcomeOff = () => {
    return `Bem-Vindo foi *desativado*!`
}

exports.welcomeOnAlready = () => {
    return `Bem-Vindo já havia sido ativado.`
}

exports.minimalDb = () => {
    return `Precisa de ao menos *10* usuários cadastrados e que tenham level!`
}

exports.autoStikOn = () => {
    return `Sticker automático foi *Ativado*!`
}

exports.autoStikOff = () => {
    return `Sticker Automatico foi *desativado*!`
}

exports.autoStikOnAlready = () => {
    return `Sticker automatico ja havia sido ativado antes.`
}

exports.afkOn = (pushname, reason) => {
    return `
╭────────────────────────
│                  ── 「 *AFK* 」 ──
│   
│Função AFK foi ativada!!
│➸ *Nick*: ${pushname}
│➸ *Motivo*: ${reason}
╰────────────────────────`
}

exports.afkOnAlready = () => {
    return `Função AFK já havia sido ativada`
}

exports.afkMentioned = (getReason, getTime) => {
    return `
╭────────────────────────
│                  ── 「 *AFK* 」  ──
│
│Shh.. ele está dormindo! (AFK)
│➸ *Motivo*: ${getReason}
│➸ *Desde*: ${getTime}
╰────────────────────────`
}

exports.afkDone = (pushname) => {
    return `*${pushname}* Acordou, bom dia!`
}

exports.gcMute = () => {
    return `
╭────────────────────────
│                   「 Mutado 」
│    
│Apenas ademiros podem mandar mensagem agora.
╰────────────────────────`
}

exports.gcUnmute = () => {
    return `
╭────────────────────────
│                   「 Desmutado 」
│
│Todos os membros podem falar agora.
╰────────────────────────`
}

exports.notNum = (q) => {
    return `"${q}", não são numeros!`
}

exports.registeredFound = (name, age, time, serial, userId) => {
    return `
╭────────────────────────
│                   「 Registrado 」
│
│Conta foi encontrada!
│➸ *Nome*: ${name}
│➸ *Idade*: ${age}
│➸ *ID*: ${userId}
│➸ *Tempo*: ${time}
│➸ *IDU*: ${serial}
╰────────────────────────`
}

exports.registeredNotFound = (serial) => {
    return `Conta com IDU: *${serial}* não encontrada!`
}

exports.ytPlay = (result) => {
    return `
╭─────────────────────
                   「 YTPlay 」

➸ *Titulo*: ${result.title}
➸ *Duração*: ${result.duration}
➸ *Link*: ${result.url}

O Arquivo está sendo enviado, aguarde...
╰─────────────────────`
}

exports.pcOnly = () => {
    return `Esse comando só pode ser usado no PV do bot!`
}

exports.linkNsfw = () => {
    return `
╭────────────────────────
│                   「 ANTI NSFW LINKS 」
│
│Você mandou um link NSFW
│Agora será banido...
╰────────────────────────`
}

exports.ageOld = () => {
    return `Você esta velho demais para usar esse bot.`
}

exports.fakeLink = () => {
    return `Alto! Este link parece suspeito, por segunrança vou te banir.\nTchauzinho~.`
}

exports.muteChatOn = () => {
    return `Bot agora está mutado!`
}

exports.muteChatOff = () => {
    return `Bot está desmutado!`
}

exports.muteChatOnAlready = () => {
    return `Bot já está mutado!`
}
exports.limit = () => {
    return `
╭────────────────────────
│                   「 LIMITE 」
│
│Isso *é* um erro. contate meu dono.
╰────────────────────────`
}

exports.stickerDel = () => {
    return `O sticker foi deletado do sistema!`
}

exports.stickerAdd = () => {
    return `O sticker foi adicionado ao sistema!`
}

exports.stickerAddAlready = (q) => {
    return `Sticker com a palavra "${q}" ja esta sendo usada!`
}

exports.stickerNotFound = () => {
    return `Sticker não foi encontrado`
}

exports.reminderOn = (messRemind, parsedTime, sender) => {
    return `
╭────────────────────────
│                   「 Lembrete 」
│    
│O lembrete foi definido!
│➸ *Mensagem*: ${messRemind}
│➸ *Duração*: ${parsedTime.hours} hora(s) ${parsedTime.minutes} minuto(s) ${parsedTime.seconds} segundo(s)
│➸ *Para*: @${sender.id.replace('@c.us', '')}
╰────────────────────────`
}

exports.reminderAlert = (messRemind, sender) => {
    return `
╭────────────────────────
│                   「 Lembrete 」
│
│⏰ @${sender.id.replace('@c.us', '')} ⏰
│➸ *Mensagem*: ${messRemind}
╰────────────────────────`
}

exports.nameChanged = (q) => {
    return `Nick trocado para: *${q}*`
}

exports.menu = (jumlahUser, level, xp, role, pushname, requiredXp, premium) => {
    return `
╭────────────────────────
│                   「 Bem-Vindo 」 
┣────────────────────────
│➸ *Nick*: ${pushname}
│➸ *Level*: ${level}
│➸ *XP*: ${xp} / ${requiredXp}
│➸ *Elo*: ${role}
│➸ *Premium*: ${premium}
┣────────────────────────
│
│ */pcmd*
│ _>Comandos Premium_ ⭐
│
│ */qpremium*
│ _>Informações do premium_ ⭐
│
│ */menu down*
│ _>Comandos de Downloads_ ⬇️
│
│ */menu dados*
│ _>Comandos de Dados e afins_ 🔖
│
│ */menu mais*
│ _>Comandos Aleatórios_ ➕
│
│ */menu sticker*
│ _>Comandos que usam Stickers_ 🔰
│
│ */menu otaku*
│ _>Comandos envolvendo Animes_ 🥷
│
│ */menu maker*
│ _>Comandos de Imagens_ 📷
│
│ */menu admins*
│ _>Comandos para admins_ 🏳️‍🌈
│
│ */menu nsfw*
│ _>Comandos Safadinhos_ 🔞
│
│ */menu policia*
│ _>Comandos de denúncia_ 🚓
│
│ */menu fofo*
│ _>Comandos Fofos_ 🦊
│
│ */menu dono*
│ _>Comandos do meu dono_ 🔒
│
│ */menu level*
│ _>Comandos envolvendo level_ 📌
│
┣────────────────────────
│Digite *${prefix}regras* para saber as regras do
│bot.
│Nota: Esse bot tem um _cooldown_ de *5* 
│segundos entre cada comando!.
╰────────────────────────`
}

exports.menuDownloader = () => {
    return `
╭────────────────────────
│                   「 Download 」
┣────────────────────────
│
│1. *${prefix}fb*
│Baixar videos do facebook.
│Uso: *${prefix}fb* link
│
│2. *${prefix}play*
│Baixa músicas do youtube.
│Uso: *${prefix}ytmp3* nome
│
│3. *${prefix}ytmp4*
│Baixar vídeos do youtube.
│(Existe a chance de não funcionar)
│Uso: *${prefix}ytmp4* link
│
│4. *${prefix}ytmp3*
│Baixar Musicas do youtube.
│(Existe a chance de não funcionar)
│Uso: *${prefix}ytmp3* link
│
│5. *${prefix}tiktok*
│Baixa vídeos do tiktok.
│Uso: *${prefix}tiktok* link
│
│6. *${prefix}twt*
│Baixa vídeos do twitter.
│Uso: *${prefix}twt* link
│
│7. *${prefix}igdl*
│Baixar videos do instagram.
│Uso: *${prefix}igdl* link
│
│8. *${prefix}igst*
│Baixar videos do Stories do Instragram.
│Uso: *${prefix}igst* User
│
│ _Lista de Download_
╰────────────────────────`
}

exports.menuBot = () => {
    return `
╭────────────────────────
│                   「 Dados 」
┣────────────────────────
│
│1. *${prefix}regras*
│Leia.
│Uso: *${prefix}regras*
│
│2. *${prefix}menu*
│Mostra os comandos disponíveis.
│Uso: *${prefix}menu (menu)*
│
│3. *${prefix}blist*
│Olhe quem merece vexame.
│Uso: *${prefix}blockl*
│
│4. *${prefix}ping*
│Olhe o ping!
│Uso: *${prefix}ping*
│
│5. *${prefix}dono*
│Contato do dono
│Uso: *${prefix}dono*
│
│6. *${prefix}qr*
│Cria QR Codes
│Uso: *${prefix}qr* (mensagem)
│
│7. *${prefix}qrler*
│Lê QR Codes
│Uso: *${prefix}qrler* (mande ou marque uma imagem)
│
│8. *${prefix}myst*
│Converse comigo!
│Uso: *${prefix}myst* (texto)
│
│9. *${prefix}rbug*
│Reporte algum bug para mim! (fico muito agradecido).
│Uso: *${prefix}rbug explicação*
│
│ _Lista de Dados_
╰────────────────────────`
}

exports.menuMisc = () => {
    return `
╭────────────────────────
│                   「 Mais 」
┣────────────────────────
│
│1. *${prefix}aki*
│Jogue akinator!
│Uso: *${prefix}aki*
│
│2. *${prefix}lol*
│Busque seu status no lol
│Uso: *${prefix}lol* (nick)
│
│3. *${prefix}falar*
│Bot vai repetir sua mensagem
│Uso: *${prefix}falar* texto
│
│4. *${prefix}letra*
│Procura pela letra de uma musica
│Uso: *${prefix}letra* titulo da musica
│
│5. *${prefix}sl*
│Encurta o link
│Uso: *${prefix}sl* link
│
│7. *${prefix}yts*
│Manda resultados do YouTube.
│Uso: *${prefix}yts* pesquisa
│
│8. *${prefix}tts*
│O Bot vai mandar um áudio no idioma que você selecionar
│Os idiomas podem ser encontrados em:
│https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
│Uso: *${prefix}tts* (idioma) Texto
│
│9. *${prefix}distancia*
│Mede a distancia entre duas cidades
│Uso: *${prefix}distancia* de | para
│
│10. *${prefix}sstick*
│Procura um sticker.
│Uso: *${prefix}sstick* Texto
│
│11. *${prefix}calc*
│Calculadora.
│* = multiplicar
│+ = adição
│- = subtração
│/ = divisão
│Uso: *${prefix}calc* 12*12
│
│12. *${prefix}whois*
│Pesquisa o IP.
│Uso: *${prefix}whois* endereço de IP
│
│13. *${prefix}play*
│Manda um audio de YouTube.
│Uso: *${prefix}play* título
│
│15. *${prefix}filme*
│Pesquisa filmes.
│Uso: *${prefix}filme* titulo
│
│16. *${prefix}lembrete*
│Lembtete ué. 
│*s* - segundos
│*m* - minutos
│*h* - horas
│*d* - dias
│Uso: *${prefix}lembrete* 10s | mensagem 
│
│17. *${prefix}imgtourl*
│Upload de imagens.
│Uso: Mande imagens com a descrição *${prefix}imgtourl* ou 
│marque a mensagem com o comando.
│
│18. *${prefix}trending*
│Trendings no twitter.
│Uso: *${prefix}trending*
│
│19. *${prefix}email*
│Send an email.
│Uso: *${prefix}email* email | assunto | mensagem
│
│20. *${prefix}genshin*
│Informações de personagens.
│Uso: *${prefix}genshininfo* nome 
│
│21. *${prefix}traduzir*
│Traduz um texto.
│Uso: *${prefix}traduzir* texto | codigo da lingua
│
│22. *${prefix}corona*
│Checa casos do COVID-19.
│Uso: *${prefix}coronavirus* nação
│
│23. *${prefix}paramp3*
│Converte um vídeo para Mp3
│Uso: Mande um vídeo com o texto *${prefix}tomp3* 
│ou responda uma mensagem com o comando.
│
│24. *${prefix}bass*
│Bass boost.
│Uso: *${prefix}bass* nivel dB.
│
│25. *${prefix}addsticker*
│Adiciona sticker ao sistema.
│Uso: Responda um sticker com o comando 
│*${prefix}addsticker* nome
│
│26. *${prefix}delsticker*
│Remove sticker ao sistema.
│Uso: *${prefix}delstiker* nome
│
│27. *${prefix}stickerlist*
│List de stickers.
│Uso: *${prefix}stickerlist*
│
│28. *${prefix}nightcore*
│Adiciona efeito nightcore a um som.
│Uso: Responda um áudio com o comando *${prefix}nightcore*.
│
│29. *${prefix}ocr*
│Analisa textos de uma imagem.
│Uso: Mande uma imagem com *${prefix}ocr* ou 
│responda uma imagem com o comando.
│
│30. *${prefix}pegarfoto*
│Manda a foto de perfil de um usuário
│Uso: *${prefix}pegafoto* @usuário
│
│31. *${prefix}dado*
│role um dado (normal ou d20)
│Uso: *${prefix}roll* sem nada ou d20
│
│32. *${prefix}dadoav*
│role um dado estilo rpg (Ex. 6d12)
│Uso: *${prefix}dadoav* dado
│
│33. *${prefix}premiumcheck*
│Tempo restante do premium
│Uso: *${prefix}premiumcheck*
│
│34. *${prefix}qpremium*
│Para usuários que desejam ser 
│premium.
│Uso: *${prefix}qpremium*
│
│ _Lista de Mais_
╰────────────────────────`
}

exports.menuSticker = () => {
    return `
╭────────────────────────
│                   「 Sticker 」
┣────────────────────────
│
│1. *${prefix}sticker*
│Cria stickers de imagens.
│Uso: *${prefix}sticker*
│
│2. *${prefix}sgif*
│Cria stickers de Video/Gifs..
│Uso: *${prefix}sgif*
│
│3. *${prefix}ttg*
│Cria texto para stickers animados.
│Uso: *${prefix}ttg* texto
│
│5. *${prefix}emojisticker*
│Converta emoji p sticker.
│Uso: *${prefix}emojisticker* emoji
│
│7. *${prefix}ttp*
│Texto para Sticker.
│Uso: *${prefix}ttp* Texto
│
│8. *${prefix}img*
│Transfome stickers em imagens
│Uso: *${prefix}img* (marque um sticker)
│
│ _Lista Sticker_
╰────────────────────────`
}

exports.menuWeeaboo = () => {
    return `
╭────────────────────────
│                   「 Otaku 」
┣────────────────────────
│
│1. *${prefix}neko*
│Manda a foto de uma neko.
│Uso: *${prefix}neko*
│
│2. *${prefix}wp*
│Manda wallpaper de anime.
│Uso: *${prefix}wp*
│
│3. *${prefix}kemono*
│Manda foto de garotas komonomini.
│Uso: *${prefix}kemono*
│
│4. *${prefix}ssanime*
│Procura um anime pela screenshot.
│Uso: Mande uma screenshot com o
│comando *${prefix}wait* ou responda 
│a imagem com o comando.
│
│5. *${prefix}waifu*
│Manda foto de waifu.
│Uso: *${prefix}waifu*
│
│6. *${prefix}lolivid*
│Manda um video aleatorio de loli (190).
│Uso: *${prefix}lolivid
│
│7. *${prefix}anime*
│Pesquise por um anime
│Uso: *${prefix}anime (nome)
│
│8. *${prefix}manga*
│Pesquise por um mangá
│Uso: *${prefix}manga (nome)
│
│_Lista de Otaku_
╰────────────────────────`
}

exports.menuFun = () => {
    return `
╭────────────────────────
│                   「 Maker 」
┣────────────────────────
│
│1. *${prefix}triggered*
│PUTASSO.
│Uso: Mande uma imagem com o 
│comando *${prefix}triggered* ou 
│responda uma imagem com o comando.
│
│2. *${prefix}beijo*
│Beiju.
│Uso: Mande uma imagem com o 
│comando *${prefix}beijo* ou 
│responda uma com o comando.
│
│3. *${prefix}phc*
│Cria uma comentário do pornhub.
│Uso: *${prefix}phc* username | text
│
│4. *${prefix}fogo*
│Creie uma logo de fogo.
│Uso: *${prefix}fogo* texto
│
│5. *${prefix}balao*
│Cria uma imagem com vários balões.
│Uso: *${prefix}balao* nome1 | nome2
│
│6. *${prefix}sliding*
│Cria um texto sliding.
│Uso: *${prefix}sliding* texto
│
│7. *${prefix}wasted*
│Adiciona o efeito Wasted a uma foto.
│Uso: Mande uma imagem com 
│o comando *${prefix}wasted* ou
│responda com o comando.
│
│8. *${prefix}3d*
│Cria um texto 3d.
│Uso: *${prefix}3d* texto
│
│9. *${prefix}papelq*
│Cria um texto de papel queimado
│Uso: *${prefix}papelq* (texto)
│
│10. *${prefix}caneca*
│Cria um texto em uma caneca
│Uso: *${prefix}caneca* (texto)
│
│11. *${prefix}amor*
│Cria um texto de amor
│Uso: *${prefix}amor* (texto)
│
│12. *${prefix}flor*
│Cria um texto de flor
│Uso: *${prefix}flor* (texto)
│
│13. *${prefix}naruto*
│Cria um banner do naruto
│Uso: *${prefix}naruto* (texto)
│
│14. *${prefix}papelv*
│Cria um texto em papel tecido
│Uso: *${prefix}papelv* (texto)
│
│15. *${prefix}amor2*
│Cria um texto de amor diferente
│Uso: *${prefix}amor2* (texto)
│
│16. *${prefix}sombra*
│Cria um textoem sombra
│Uso: *${prefix}sombra* (texto)
│
│17. *${prefix}gaming*
│Cria uma logo gamer
│Uso: *${prefix}gaming (texto)
│
│ _Lista Maker_
╰────────────────────────`
}

exports.menuModeration = () => {
    return `
╭────────────────────────
│                   「 Admins 」
┣────────────────────────
│
│1. *${prefix}add*
│Adiciona pessoas ao grupo.
│Uso: *${prefix}add* 55839xxxxxxxx
│
│2. *${prefix}ban*
│Remove membros do grupo.
│Uso: *${prefix}ban* @membro 
│ou cite sua mensagem
│
│3. *${prefix}unban*
│Remove banimentos de membros.
│Uso: *${prefix}unban* cite sua mensagem
│
│4. *${prefix}softban*
│Remove temporariamente membros.
│Para usar você deve citar a mensagem
│de quem você quer banir e dizer o 
│tempo do ban
│Uso: *${prefix}softban* tempo_em_minutos
│
│5. *${prefix}promote*
│Torne um membro ademiro.
│Uso: *${prefix}promote* @membro
│
│6. *${prefix}demote*
│Demote um ademiro a membro comum
│Uso: *${prefix}demote* @membro
│
│7. *${prefix}sair*
│Bot quitará do grupo.
│Uso: *${prefix}sair*
│
│8. *${prefix}everyone*
│Menciona todos do grupo.
│Uso: *${prefix}everyone*
│
│9. *${prefix}nsfw*
│Ativa modo NSFW.
│Uso: *${prefix}nsfw* on/off
│
│10. *${prefix}groupicon*
│Muda o icone do grupo.
│Uso: Mande imagens com o 
│comando *${prefix}groupicon* ou 
│responda imagens com o comando.
│
│11.. *${prefix}antilink*
│Ligue o antilink.
│Uso: *${prefix}antilink* on/off
│
│12. *${prefix}welcome*
│Ative a opção de bem-vindo.
│Uso: *${prefix}welcome* on/off
│
│13. *${prefix}autosticker*
│Ativa a função de autosticker
│Uso: *${prefix}autosticker* on/off
│
│14. *${prefix}antinsfw*
│Ativa a proteção de links NSFW.
│Uso: *${prefix}antinsfw* on/off
│
│15. *${prefix}mutegp*
│Deixe o grupo mutado para membros.
│Uso: *${prefix}mutegp* on/off
│
│16. *${prefix}link*
│Manda o link do grupo.
│Uso: *${prefix}link*
│
│17. *${prefix}revoke*
│Revoga o link atual do grupo.
│Uso: *${prefix}revoke*
│
│18. *${prefix}levelup*
│Ativa ou desativa o sistema de level
│Uso: *${prefix}levelup* on/off
│
│19. *${prefix}ghost*
│Remove as pessoas com menos 
│mensagens que o determinado
│Uso: *${prefix}ghost* (nº de mensagens)
│
│20. *${prefix}antitrava*
│Detecta travas, bloqueia o grupo
│Bane o individuo e lança antitravas
│Uso: *${prefix}antitrava* on/off
│
│ _Lista Admins_
╰────────────────────────`
}

exports.menuNsfw = () => {
    return `
╭────────────────────────
│                   「 NSFW 」
┣────────────────────────
│
│1. *${prefix}lewd*
│Manda uma foto sensual de anime.
│Uso: *${prefix}lewd*
│
│2. *${prefix}waifu18*
│Manda uma foto 18+ de uma waifu aleatória.
│Uso: *${prefix}waifu18*
│
│4. *${prefix}yuri*
│Manda fotos yuri.
│Uso: *${prefix}yuri*
│
│5. *${prefix}lewdavatar*
│Manda avatares sensuais.
│Uso: *${prefix}lewdavatar*
│
│6. *${prefix}femdom*
│Fotos femdom.
│Uso: *${prefix}femdom*
│
│7. *${prefix}axila*
│Hentai de axilas
│Uso: *${prefix}axila*
│
│8. *${prefix}coxas*
│Hentai de coxas
│Uso: *${prefix}coxas*
│
│9. *${prefix}peitos*
│Hentai de peitos
│Uso: *${prefix}peitos*
│
│10. *${prefix}bunda*
│Hentai de bundas
│Uso: *${prefix}bunda*
│
│11. *${prefix}pes*
│Hentai de pes
│Uso: *${prefix}pes*
│
│12. *${prefix}pl*
│Hentai de sideboobs
│Uso: *${prefix}pl*
│
│13. *${prefix}ahegao*
│Hentai de ahegao
│Uso: *${prefix}ahegao*
│
│14. *${prefix}rtits*
│Porno real de peito
│Uso: *${prefix}rtits*
│
│15. *${prefix}rmilf*
│Porno real de milfs
│Uso: *${prefix}rmilf*
│
│16. *${prefix}rbdsm*
│Porno real de bdsm
│Uso: *${prefix}rbdsm*
│
│17. *${prefix}rass*
│Porno real de bundas
│Uso: *${prefix}rass*
│
│18. *${prefix}rpussy*
│Porno real de pussys
│Uso: *${prefix}rpussy*
│
│ _Lista Nsfw_
╰────────────────────────`
}

exports.menuOwner = () => {
    return `
╭────────────────────────
│                   「 Dono 」
┣────────────────────────
│
│1. *${prefix}bc*
│broadcast.
│Uso: *${prefix}bc* texto
│
│2. *${prefix}clearall*
│Apaga todos os chats
│Uso: *${prefix}clearall*
│
│3. *${prefix}getss*
│Screenshot do client do bot
│Uso: *${prefix}getss*
│
│4. *${prefix}bb*
│Add/remove ban em usuarios.
│Uso: *${prefix}bb* add/del @user/55839xxxxxxxx
│
│5. *${prefix}leaveall*
│Sai de todos os grupos.
│Uso: *${prefix}leaveall*
│
│6. *${prefix}eval*
│Avalia o codigo javascript.
│Uso: *${prefix}eval*
│
│7. *${prefix}shutdown*
│Desliga o bot
│Uso: *${prefix}shutdown*
│
│8. *${prefix}premium*
│Add/remove usuarios ao premium.
│Uso: *${prefix}premium* add/del @user
│
│9. *${prefix}serial*
│Checa o serial de um usuario.
│Uso: *${prefix}serial* serial
│
│10. *${prefix}exif*
│Muda o metadata dos stickers.
│Uso: *${prefix}exif* nome | autor
│
│11. *${prefix}mute*
│Muta todos os membros
│Uso: Use *${prefix}mute* para mutar 
│ *${prefix}mute* devono para desmutar.
│
│12. *${prefix}setname*
│Mude o nome do bot.
│Uso: *${prefix}name* new_username
│
│13. *${prefix}block*
│Bloqueia um usuario 
│*/unblock* para desbloquear)
│Uso: *${prefix}block* @user/55839xxxxxxxx
│
│14. *${prefix}give*
│Adiciona ou remove xp de um usuário
│(Para remover deixe o valor negativo)
│Uso: *${prefix}give* @user (valor)
│Ou *${prefix}give* (marque) (valor)
│
│ _Lista Dono_
╰────────────────────────`
}

exports.menuLeveling = () => {
    return `
╭────────────────────────
│                   「 LevelUP 」
┣────────────────────────
│
│1. *${prefix}level*
│Cheque seu level estilo discord.
│Uso: *${prefix}level*
│
│2 *${prefix}nivel*
│Cheque seu nivivel e outras informações
│Uso: *${prefix}nivel*
│
│3. *${prefix}leaderboard*
│Cheque os melhores.
│Uso: *${prefix}leaderboard*
│
│4. *${prefix}ativos*
│Veja os membros mais ativos de todos
│Uso: *${prefix}ativos*
│
│5. *${prefix}geral*
│Veja a lista geral de mensagens
│Uso: *${prefix}geral*
│
│ _Lista LevelUP_
╰────────────────────────`
}

exports.rules = () => {
    return `
╭────────────────────────
│                   「 Regras 」
┣────────────────────────
│
│1. Não SPAMME o bot. 
│Penalidade: Aviso e block
│
│2. Não LIGUE pro bot.
│Penalidade: Block
│
│3. Não ABUSE de ERROS
│Penalidade: *BLOCK*
│Se achar erros, AVISE AO DONO
╰────────────────────────`
}

exports.pcmd = () => {
    return `
╭────────────────────────
│                   「 Comandos Premium 」
┣────────────────────────
│ *${prefix}pcmd dados*
│ _>Comandos de dados ou ataques_
│
│ *${prefix}pcmd maker*
│ _>Comandos com criação de imagens_
│
│ *${prefix}pcmd nsfw*
│ _>Comandos Adultos_
│
│ *${prefix}pcmd mais*
│ _>Comandos Aleatórios_
│
│ _Lista Premium_
╰────────────────────────`
}
exports.pDados = () => {
    return `
╭────────────────────────
│              「 Menu Premium: Dados 」
┣────────────────────────	
│1. *${prefix} bomb*
│Spamma ligações e sms para o alvo
│Exemplo de numero correto a ser usado 
│-> 55983xxxxxxx
│Uso: *${prefix} bomb* (numero)
│
│2. *${prefix}spamcall*
│Spam de ligações.
│Uso: *${prefix}spamcall* 55983xxxxxxx
│
│3. *${prefix}spamsms*
│Spam de SMS.
│Uso: *${prefix}spamsms* 55983xxxxxxxx (qntd)
│
│4. *${prefix}cc*
│Gera um cartão falso com base na BIN
│Uso: *${prefix}cc* (BIN)
│
│5. *${prefix}cpf*
│Puxe os dados de alguém pelo cpf
│Uso: *${prefix}cpf* (numero)
│
│ _Menu Premium: Dados_
╰────────────────────────
`
}

exports.pMaker = () => {
    return `
╭────────────────────────
│               「 Menu Premium: Maker 」
┣────────────────────────
│
│1. *${prefix}ffbanner*
│Crie um banner do frifas.
│Uso: *${prefix}ffbanner* texto1 | texto2
│
│2. *${prefix}fflogo*
│Logo com os personagens do free fire.
│No personagem você tem que por o nome do 
│personagem denteo do jogo Ex. Alok
│Uso: *${prefix}fflogo* (perosnagem) | texto2
│
│3. *${prefix}escrever*
│Faça anotações em um livro.
│Uso: *${prefix}escrever* (texto)
│
│4. *${prefix}glitch*
│Cria textos com efeitos de glitchs.
│Uso: *${prefix}glitchtext* (texto1) | (texto2)
│
│6. *${prefix}blackpink*
│Cria uma logo estilo blackpink.
│Uso: *${prefix}blackpink* (texto)
│
│6. *${prefix}ph*
│Cria uma logo estilo pornhub
│Uso: *${prefix}phmaker* (texto1) | (texto2)
│
│7. *${prefix}galaxia*
│Cria uma logo estilo galáxia.
│Uso: *${prefix}galaxy* (texto)
│
│8. *${prefix}comic*
│Cria uma logo estilo quadrinho
│Uso: *${prefix}comic* (texto)
│
│9. *${prefix}hacker*
│Cria uma logo hacker
│Uso: *${prefix}hacker* (texto)
│
│10. *${prefix}grafite*
│Faz um grafite na parede
│Uso: *${prefix}grafite* (texto) | (texto2)
│
│11. *${prefix}grafite2*
│Faz um grafite na parede
│Uso: *${prefix}grafite2* (texto) | (texto2)
│
│12. *${prefix}grafite3*
│Faz um grafite na parede
│Uso: *${prefix}grafite3* (texto)
│
│13. *${prefix}metal*
│Cria uma logo em metal
│Uso: *${prefix}metal* (texto)
│
│14. *${prefix}metal2*
│Cria uma logo em metal
│Uso: *${prefix}metal2* (texto)
│
│15. *${prefix}banner*
│Cria uma art em banner
│Uso: *${prefix}banner* (texto)
│
│16. *${prefix}banner2*
│Cria uma art em banner
│Uso: *${prefix}banner2* (texto)
│
│17. *${prefix}corroido*
│Cria uma logo em metal corroido
│Uso: *${prefix}corroido* (texto)
│
│18. *${prefix}vittel*
│Cria uma logo estilo vittel
│Uso: *${prefix}vittel* (texto)
│
│19. *${prefix}asasg*
│Cria uma arte de asas na galáxia
│Uso: *${prefix}asasg* (texto)
│
│20. *${prefix}halloween*
│Cria uma arte do halloween
│Uso: *${prefix}halloween* (texto)
│
│21. *${prefix}corasa*
│Cria um gif de um coração com asa
│Uso: *${prefix}corasa* (texto)
│
│22. *${prefix}5mincraft*
│Cria uma logo estilo 5mincraft
│Uso: *${prefix}5mincraft* (texto)
│
│23. *${prefix}sangue*
│Cria um texto em sangue
│Uso: *${prefix}sangue* (texto)
│
│24. *${prefix}matrix*
│Cria um texto estilo o filme
│Uso: *${prefix}matrix* (texto)
│
│25. *${prefix}blights*
│Cria uma logo estilo a musica
│Uso: *${prefix}blights* (texto)
│
│26. *${prefix}blights2*
│Cria uma logo estilo a musica
│Uso: *${prefix}blights2* (texto)
│
│27. *${prefix}carbon*
│Faz um texto em carbono
│Uso: *${prefix}carbon* (texto)
│
│28. *${prefix}vingadores*
│Cria uma logo estilo vingadores
│Uso: *${prefix}vingadores* (texto) | (texto2)
│
│29. *${prefix}agua*
│Cria um texto de água
│Uso: *${prefix}agua* (texto)
│
│30. *${prefix}raio*
│Crie uma logo estilo raio
│Uso: *${prefix}raio* (texto)
│
│31. *${prefix}praia*
│Faz uma logo no estilo praia
│Uso: *${prefix}praia* (texto)
│
│32. *${prefix}festa*
│Faz uma logo estilo festa
│Uso: *${prefix}festa* (texto)
│
│33. *${prefix}mgoogle*
│Faz uma imagem de pesquisa
│Uso: *${prefix}mgoogle* (texto) | (texto2) | (texto3)
│
│34. *${prefix}vapor*
│Faz uma imagem triste de vapor
│Uso: *${prefix}vapor* (texto)
│
│35. *${prefix}lgalaxia*
│Faz uma logo na galáxia
│Uso: *${prefix}lgalaxia* (texto)
│
│36. *${prefix}tinta*
│Faz uma arte usando tinta
│Uso: *${prefix}tinta* (texto)
│
│37. *${prefix}llobo*
│Faz uma logo com uma lobo
│Uso: *${prefix}llobo* (texto) | (texto2)
│
│ _Menu Premium: Maker_
╰────────────────────────
`
}

exports.pNsfw = () => {
    return `
╭────────────────────────
│             「 Menu Premium: Adult 」
┣────────────────────────
│1. *${prefix}nhpdf*
│Baixe uma historia do nhentai em pdf! 
│Uso: *${prefix}nhdl (6 digitos)*
│
│3. *${prefix}phdl*
│Baixe videos do pornhub.
│Uso *${prefix}phdl* link
│
│2. *${prefix}rnekog*
│Peça um gif neko hentai! 
│(ESPERE MANDAR PARA PEDIR OUTRO)
│Uso: *${prefix}rnekog*
│
│3. *${prefix}rsolog*
│Peça um gif solo hentai! 
│(ESPERE MANDAR PARA PEDIR OUTRO)
│Uso: *${prefix}rsolog*
│
│4. *${prefix}rwankg*
│Peça um gif wank hentai! 
│(ESPERE MANDAR PARA PEDIR OUTRO)
│Uso: *${prefix}rwankg*
│
│5. *${prefix}rpesg*
│Peça um gif de pes hentai! 
│(ESPERE MANDAR PARA PEDIR OUTRO)
│Uso: *${prefix}rpesg*
│
│6. *${prefix}rrandog*
│Peça um gif aleatorio hentai! 
│(ESPERE MANDAR PARA PEDIR OUTRO)
│Uso: *${prefix}rrandog*
│
│O Premium tem acesso a todos os 
│comandos multi nsfw, que serve 
│para mandar 5 imagens ao inves de 1.
│X. *${prefix}mCOMANDO*
│Exemplo de comado multiplo:
│Uso: *${prefix}mbunda*
│
│7. *${prefix}rneko*
│Hentai de nekos
│Uso: *${prefix}rneko*
│
│8. *${prefix}blowjob*
│Hentai de boquetes
│Uso: *${prefix}blowjob*
│
│9. *${prefix}futanari*
│Hentai de futas
│Uso: *${prefix}futanari*
│
│10. *${prefix}solo*
│Hentai solo
│Uso: *${prefix}solo*
│
│11. *${prefix}anal*
│Hentai anal
│Uso: *${prefix}anal*
│
│12. *${prefix}rloli*
│Hentai loli
│Uso: *${prefix}rloli*
│
│13. *${prefix}reddit*
│Caso não tenha o que você queira,
│procure por um subrreddit!
│Uso: *${prefix}reddit* (subrredit)
│
│ _Menu Premium: Nsfw_
╰────────────────────────`
}

exports.pMais = () => {
    return `
╭────────────────────────
│              「 Menu Premium: Mais 」
┣────────────────────────   
│1. *${prefix} wps*
│Busca por wallpaper
│Uso: *${prefix} wps* (tag)
│
│2. *${prefix} wpsn*
│Busca por wallpaper nsfw
│Uso: *${prefix} wpsn* (tag)
│
│ _Menu Premium: Mais_
╰────────────────────────`
}

exports.menuPolicia = () => {
    return `
╭────────────────────────
│                   「 Comandos Policia 」
┣────────────────────────
│
│Alô? Capitã Myst falando..
│
│1. *${prefix}d1*
│Denucie lolicons, shotacons e etc
│Uso: *${prefix}d1* @membro
│
│2. *${prefix}d2*
│Se entregue à policia.
│Uso: *${prefix}d2* crime*
│
│3. *${prefix}d3*
│Denuncie lolis, shotas, traps e etc
│Uso: *${prefix}d3* @membro
│
│4. *${prefix}d4*
│Denuncie crimes
│Uso: *${prefix}d4* @membro | Crime
│
│5. *${prefix}d5*
│Denuncie algum lgbtqqicapfhelicopteroapachedecombate
│Uso: *${prefix}d5* @membro
│
│6. *${prefix}fbi*
│Veja uma lista de pedófilos
│Uso: *${prefix}fbi*
│
│7. *${prefix}cia*
│Veja uma lista dos menores infratores
│Uso: *${prefix}cia*
│
│8. *${prefix}reu*
│Veja quem se entregou
│Uso: *${prefix}reu*
│
│9. *${prefix}gays*
│Veja os lgbteucansei denunciados
│Uso: *${prefix}gays*
│
│10. *${prefix}crimes*
│Lista dos crimes denunciados
│Uso: *${prefix}crimes*
│
│11. *${prefix}resetar*
│Resete todas as ocorrencias
│Uso: *${prefix}resetar*
│
│ _Lista de Denuncias_
╰────────────────────────`
}

exports.menuFofo = () => {
    return `
╭────────────────────────
│                   「 Comandos Fofos 」
┣────────────────────────
│
│1. *${prefix}raposa*
│Fotos de raposas
│Uso: *${prefix}raposa*
│
│2. *${prefix}cachorro*
│Fotos de doguinhos
│Uso: *${prefix}cachorro*
│
│3. *${prefix}gato*
│Fotos de gatinhos
│Uso: *${prefix}gato*
│
│4. *${prefix}panda*
│Fotos de pandinhas
│Uso: *${prefix}panda*
│
│5. *${prefix}pandav*
│Fotos de pandinhas vermelhos
│Uso: *${prefix}pandav*
│
│6. *${prefix}passaro*
│Fotos de passaros
│Uso: *${prefix}passaro*
│
│7. *${prefix}coala*
│Fotos de coalinhas
│Uso: *${prefix}coala*
│
│ _Lista Fofos_
╰────────────────────────`
}

exports.destrava = () => {
    return `❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n❧═━ ♡♡♡♡ ━═☙\n█▀▄▀█ ▒█░░▒█ ▒█▀▀▀█ ▀▀█▀▀\n█▒█▒█ ▒█▄▄▄█ ░▀▀▀▄▄ ░▒█\n█░░▒█ ░░▒█░░ ▒█▄▄▄█ ░▒█\n\n─▄█▀█▄──▄███▄─\n▐█░██████████▌\n─██▒█████████─\n──▀████████▀──\n─────▀██▀─────\n\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n║║║█◣║║║║◢█║║║\n║║║◥█◣║║◢█◤║║║\n║║║◥██◣◢██◤║║║\n║║║◥██████◤║║║\n║║║◥██████◤║║║\n║║║║◥████◤║║║║\n║║║║║◥██◤║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n║║║║║║██║║║║║║\n─────████─────\n────██████────\n─◥██████████◤─\n──◥████████◤──\n───◥██████◤───\n────◥████◤────\n─────◥██◤─────\n──────◥◤─────\n❦🅜🅨🅢🅣♡🅓🅔🅢🅣🅡🅐🅥🅐❦\n`
}

