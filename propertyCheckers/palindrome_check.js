function pc(string) {
    return string.replace(/[^a-z0-9]/ig, '').toLowerCase() == string.replace(/[^a-z0-9]/ig, '').toLowerCase().split("").reverse().join("")
}

module.exports = pc