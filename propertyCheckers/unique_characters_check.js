function unique_charactersF(string) {
    return Array.from(new Set(string.trim().split(" ").join(""))).length
}

export default unique_charactersF
