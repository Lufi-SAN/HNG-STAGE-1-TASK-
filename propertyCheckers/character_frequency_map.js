function cfa(string) {
    const alteredvalue = string.replace(/[^a-z0-9]/ig, '')
    const storageArr = Array.from(alteredvalue)
    const initSet = new Set(alteredvalue)
    const initArr = Array.from(initSet)
    function objCreator(params) {
            const obj = {};
           params.forEach((param) => {
               obj[param] = 0
           })
        return obj
    }
    const initObj = objCreator(initArr)
    storageArr.forEach((store) => {
        initObj[store]++
    })
    return initObj
}

module.exports = cfa;