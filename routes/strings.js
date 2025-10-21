import { Router } from 'express'
import propCheck from '../propertyCheckers/propCheckersexport.js'
import db from '../db/queries.js'
import mapNL from '../mapNL.js'

const stringsRouter = Router()


stringsRouter.post('/', async(req, res, next) => {
    //check if req.body object has value property
    if (!req.body || !req.body.hasOwnProperty('value')) {
        return res.status(400).json({
            error : 'Bad Request',
            message : 'Invalid request body or missing "value" screen' 
        })
    }

    const {value} = req.body;
    //check if value type is string
    if (typeof value !== "string") {
        return res.status(422).json({
            error : 'Unprocessable Entity',
            message : 'Invalid data type for "value"' 
        })
    }
    //query database
    
        const DBString =  await db.getStringFromDB(value)
        if (typeof DBString == 'string') {
            return res.status(409).json({
                error: 'Conflict',
                message: 'String already exists in the system' 
            })
        }
    
    
    const propObject = propCheck.pce(value)
    const id = propCheck.sha_hash(value)
    
    await db.addStringToDB(
        value,
        propObject.is_palindrome,
        propObject.length,
        propObject.word_count
    )

    res.status(201).json({
        id: id,
        value: value,
        properties : propObject,
        created_at : new Date(Date.now()).toISOString()
    });
})

stringsRouter.get('/:string_value', async(req, res, next) => {
    //Access db for string value
    const string_value = req.params.string_value;
    
    const DBString = await db.getStringFromDB(string_value)
    if (typeof DBString != 'string') {
        return res.status(404).json({
            error: 'Not Found',
            message: 'String does not exist in the system'
        })
    }
    
    res.status(200).json({
        id: propCheck.sha_hash(string_value),
        value: string_value,
        properties: propCheck.pce(string_value),
        created_at: new Date(Date.now()).toISOString()
    })
})

stringsRouter.get('/', async (req, res) => {
    const acceptedQueryParams = ['is_palindrome','min_length','max_length','word_count','contains_character']
    for(let key in req.query ) {
        if (!acceptedQueryParams.includes(key)) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Invalid query parameter values or types"
            })
        }
    }
    const query = req.query
    for(let key in query ) {
        if ( query[key] == '' || query[key] == null || query[key] == undefined ) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Invalid query parameter values or types"
            })
        }
    }

    const filteredStrings = await db.getFilteredStrings(query)
    console.log(filteredStrings)
    const data = filteredStrings.map((entry) => ({
        id: propCheck.sha_hash(entry.string),
        value: entry.string,
        properties: propCheck.pce(entry.string),
        created_at: new Date(Date.now()).toISOString()
    }
    ))

    res.status(200).json({
        data,
        count: data.length,
        filters_applied: query,
    }) 
})

stringsRouter.get('/filter-by-natural-language', async (req, res) => {
    const acceptedQueryValues = ['all single word palindromic strings','strings longer than 10 characters','palindromic strings that contain the first vowel','strings containing the letter z']
    if(!acceptedQueryValues.includes(req.query.query)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Unable to process natural language query'
        })
    }
    
    const query = req.query.query
    
    const filteredStrings = await db.filterNatural(query)
    const data = filteredStrings.map((entry) => {
        return entry.string
    })
    const original_query = query
    const parsed_filters = mapNL[query]
    

    res.status(200).json({
        data,
        count: data.length,
        interpreted_query: {
            original_query,
            parsed_filters
        },
        filters_applied: query,
    })
    
})

stringsRouter.delete('/:string_value', async (req, res) => {
    const value = req.params.string_value;
    const DBString =  await db.getStringFromDB(value)
    if (typeof DBString != 'string') {
        return res.status(404).json({
            error: 'Not found',
            message: 'String does not exist in the system' 
        })
    }
    await db.deleteString(value)
    res.status(204).json({})
})

export default stringsRouter