import crypto from 'crypto'

function sha256_hashF(string) {
    return crypto.createHash("sha256").update(string).digest("hex")
}

export default sha256_hashF