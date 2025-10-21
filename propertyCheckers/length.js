import {franc} from 'franc'
import mapToLocale from '../mapLocale.js'

function detectLocaleFromString(value) {
    const francCode = franc(value)
    const locale = mapToLocale[francCode] || 'en-US'
    return locale
}

function lengthF(string) {
    const locale = detectLocaleFromString(string)
    const stringSegmenter = new Intl.Segmenter(locale, {  granularity: 'grapheme' }).segment(string)
    return [...stringSegmenter].length
}

export default lengthF