function palindrome_check(string) {
    return string.replace(/[^a-z0-9]/ig, '').toLowerCase() == string.replace(/[^a-z0-9]/ig, '').toLowerCase().split("").reverse().join("")
}

export default palindrome_check