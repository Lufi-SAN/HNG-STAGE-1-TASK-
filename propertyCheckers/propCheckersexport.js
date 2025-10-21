import palindrome_check from './palindrome_check.js'
import unique_charactersF from './unique_characters_check.js'
import word_countF from './word_count.js'
import sha256_hashF from './createSHA.js'
import character_frequency_mapF from './character_frequency_map.js'
import lengthF from './length.js'

function pce(value) {
    const length = lengthF(value);
    const is_palindrome = palindrome_check(value)
    const unique_characters = unique_charactersF(value)
    const word_count = word_countF(value)
    const sha256_hash = sha256_hashF(value)
    const character_frequency_map = character_frequency_mapF(value)

    return {
            length,
            is_palindrome,
            unique_characters,
            word_count,
            sha256_hash,
            character_frequency_map
        }
}

function sha_hash(value) {
    return sha256_hashF(value)
}

const propCheck = {pce, sha_hash}
export default propCheck
