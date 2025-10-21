const characterFrequencyMap = require('./propertyCheckers/character_frequency_map');
const palindrome_check = require('./propertyCheckers/palindrome_check')
const unique_characters = require('./propertyCheckers/unique_characters_check')
const word_count = require('./propertyCheckers/word_count')
const sha256_hash = require('./propertyCheckers/createSHA')
const character_frequency_map = require('./propertyCheckers/character_frequency_map')
const length = require('./propertyCheckers/length');

function pce(value) {
    const length = length(value);
    const is_palindrome = palindrome_check(value)
    const unique_characters = unique_characters(value)
    const word_count = word_count(value)
    const sha256_hash = sha256_hash(value)
    const character_frequency_map = characterFrequencyMap(value)

    return {
            length: entry.length,
            is_palindrome,
            unique_characters,
            word_count,
            sha256_hash,
            character_frequency_map
        }
}

function sha_hash(value) {
    return sha256_hash(value)
}

module.exports = {pce, sha_hash}
