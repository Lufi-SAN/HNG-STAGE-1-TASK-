const franc = require('franc')
const mapToLocale = require('../mapLocale')

function detectLocaleFromString(value) {
    const francCode = franc(value)
    const locale = mapToLocale[francCode] || 'en-US'
    return locale
}

function length(string) {
    const locale = detectLocaleFromString(string)
    const stringSegmenter = new Intl.Segmenter(locale, {  granularity: 'grapheme' }).segment(string)
    return [...stringSegmenter].length
}

module.exports = length