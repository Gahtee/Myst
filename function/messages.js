const fs = require('fs-extra')

const getMsg = (userId, _dir, groupId) => {
    let pos = null
    let found = false
    let created = false
    let iddg = groupId
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            pos = i
            found = true
        }
    })
    if (found === false && pos === null) {
        const obj = { id: userId, msg: 0 }
        _dir.push(obj)
        fs.writeFileSync(`./database/groupsMsgs/${iddg}.json`, JSON.stringify(obj))
        return 1
    } else { return _dir[pos].msg }
}

const addMsg = (userId, amount, _dir, groupId) => {
    let position = null
    let iddgr = groupId
    Object.keys(_dir).forEach((i) => { if (_dir[i].id === userId) { position = i } })
    if (position !== null) {
        _dir[position].msg += amount
        fs.writeFileSync(`./database/groupsMsgs/${iddgr}.json`, JSON.stringify(_dir))
    }
}

module.exports = {
	getMsg,
	addMsg
}