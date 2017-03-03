const Database = require('./')

let db = new Database()

db.setup()
.then(() => console.log('Setup completado.'))
