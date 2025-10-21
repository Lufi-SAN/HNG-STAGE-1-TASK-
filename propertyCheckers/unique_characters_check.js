function ucc(string) {
    return Array.from(new Set(string.trim().split(" ").join(""))).length
}

module.exports = ucc
