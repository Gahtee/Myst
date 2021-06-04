const fs = require('fs-extra')

const addLimit = (userId, _dir) => {
    const obj = { id: userId, time: Date.now() }
    _dir.push(obj)
    fs.writeFileSync('./database/user/tempjogo.json', JSON.stringify(_dir))
}

const getLimit = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _dir[position].time
    }
}

module.exports = {
    addLimit,
    getLimit
}