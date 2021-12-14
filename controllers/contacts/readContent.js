const fs = require('fs/promises')
const path = require('path')
const readContent = async()=>{
    const content = await fs.readFile(path.join(__dirname, '../../db/contacts.json'), 'utf8')
    const result = JSON.parse(content)
    return result
}

module.exports = {
    readContent
}