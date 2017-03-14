const yo = require('yo-yo')

let el = yo`
  <div class="container">
    <form>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div class ="form-group">
            <label for="nombre">Usuario:</label>
            <select class="form-control">
              <option value="">
                emry
              </option>
            </select>
          </div> 
        </div>
        44
      <div class="row">
        <div class="form-group">
          <div class="col-xs-4 col-xs-offset-8 text-right">
            <button class="btn btn-warning">Cerrar</button>
            <button class="btn btn-danger">Eliminar</button>
          </div>
      </div>
    </form>
  </div>
`

module.exports = el
