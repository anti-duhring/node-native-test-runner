const { readFile } = require('fs/promises')
const { error } = require('./constants')

const DEFAULT_OPTION = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']

}
class File {
    static async csvToJSON(filePath) {
        const content = await readFile(filePath, 'utf-8')
        const validation = this.isValid(content)

        if(!validation.valid) throw new Error(validation.error)

        return this.parseCSVToJSON(content)
    }

    static isValid(csvString, options = DEFAULT_OPTION) {

        const [headers, ...content] = csvString.split(/\r?\n/)
        const isHeaderValid = headers === options.fields.join(',')

        if(!content.length || content.length > options.maxLines) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        if(!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        return {
            valid: true
        }
    }

    static parseCSVToJSON(csvString) {
        let [headers, ...content] = csvString.split(/\r?\n/)
        
        headers = headers.split(',')
        content = content.map(line => {
            const columns = line.split(',')
            const entity = {}

            for(const index in columns) {
                entity[headers[index]] = columns[index].trim()
            }

            return entity
        })

        return content
    }
    
}

module.exports = File
