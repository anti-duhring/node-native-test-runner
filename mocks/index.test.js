const File = require("./src/file")
const { error } = require("./src/constants")
const assert = require('assert')

;(async () => {
    
    // Variables created in a empty statement
    {
        const filePath = './mock/emptyFile-invalid.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = './mock/invalid-header.csv'
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = './mock/fiveItems-invalid.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = './mock/threeItems-valid.csv'
        const expected = [
            {
                id: 1,
                name: 'neo',
                profession: 'developer',
                age: '30'
            },
            {
                id: 2,
                name: 'tom',
                profession: 'quarterback',
                age: '45'
            },
            {
                id: 3,
                name: 'lebron',
                profession: 'guard',
                age: '38'
            }
        ]
        const result = await File.csvToJSON(filePath)
        assert.deepEqual(result, expected)
    }
})()