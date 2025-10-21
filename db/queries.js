require('dotenv').config()
const pool = require('./pool')
const table_name = process.env.TABLE_NAME

async function getStringFromDB(string) {
    const { rows } = await pool.query(`SELECT (string, palindrome, length, word_count) FROM ${table_name} WHERE string = ($1)`, [string])
    return rows
}

async function addStringToDB(string, palindrome, length, word_count) {
    await pool.query(`INSERT INTO ${table_name} (string, palindrome, length, word_count) VALUES ($1, $2, $3, $4)`, [string, palindrome, length, word_count])
}

async function getFilteredStrings(filters) {
    const values = [];
    const whereClauses = [];

    if (filters.is_palindrome !== undefined) {
        values.push(filters.is_palindrome === 'true');
        whereClauses.push(`palindrome = $${values.length}`);
    }

    if (filters.min_length !== undefined) {
        values.push(Number(filters.min_length));
        whereClauses.push(`length >= $${values.length}`);
    }

    if (filters.max_length !== undefined) {
        values.push(Number(filters.max_length));
        whereClauses.push(`length <= $${values.length}`);
    }

    if (filters.word_count !== undefined) {
        values.push(Number(filters.word_count));
        whereClauses.push(`word_count = $${values.length}`);
    }

    if (filters.contains_character !== undefined) {
        values.push(`%${filters.contains_character}%`);
        whereClauses.push(`string ILIKE $${values.length}`);
    }

    let queryText = `SELECT * FROM ${table_name}`;
    if (whereClauses.length > 0) {
        queryText += ' WHERE ' + whereClauses.join(' AND ');
    }

    const {rows} = await pool.query(queryText, values);
    return rows
}

async function filterNatural(query) {
    let queryText = `SELECT * FROM ${table_name} WHERE`;
    switch(query) {
        case 'all single word palindromic strings':
            queryText + 'word_count = 1 AND palindrome = true'
            break;
        case 'strings longer than 10 characters':
            queryText + 'length > 10'
            break;
        case 'palindromic strings that contain the first_vowel':
            queryText + 'palindrome = true AND string ILIKE %a%'
            break;
        case 'strings containing the letter z':
            queryText + 'string ILIKE %z%'
            break;
    }
    
    const {rows} = await pool.query(queryText);
    return rows
}

async function deleteString(string) {
    await pool.query(`DELETE FROM ${table_name} WHERE string = $1`, [string])
}


module.exports = {
    getStringFromDB,
    addStringToDB,
    getFilteredStrings,
    filterNatural,
    deleteString
}