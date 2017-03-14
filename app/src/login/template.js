const yo = require('yo-yo')
const page = require('page')
const swal = require('sweetalert')
const request = require('superagent')

let el = renderLogin()
function renderLogin () {
  let el = yo`<div class="col-xs-12 col-md-6 col-md-offset-3">
    <div class="login-box">
  <div class="login-logo">
    <a href="/login"><img class="login-logo" src="/logo.jpg"/></a>
  </div>
  <div class="login-box-body">
    <p class="login-box-msg">Iniciar Sesion</p>

    <form>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group has-feedback">
            <input type="text" id="usuario" name="usuario" class="form-control" placeholder="Usuario">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input type="password" id="contrasena" name="contrasena" class="form-control" placeholder="Contraseña">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
               
        </div>
        <div class="col-xs-4 pull-right">
          <button onclick=${logIn} class="btn btn-primary btn-block btn-flat">Entrar</button>
        </div>
      </div>
    </form>
    
  </div>
</div>
  </div>`
  return el
}

function logIn (e) {
  e.preventDefault()

  // let user = document.getElementById('usuario').value
  // let password = document.getElementById('contrasena').value
  // let userParams = {user: user, password: password}

  // request
  // .post('/api/login')
  // .accept('json')
  // .send(userParams)
  // .set('Accept', 'application/json')
  // .end((err, resp) => {
  //   if (err) console.log(err)
  //   resp.body = JSON.parse(resp.text)
  //   if (resp.body.err) {
  //     swal('Error', 'Usuario o Contraseña incorrecto.', 'error')
  //   } else {
  //     window.localStorage.matriculaToken = resp.body.token
  //     window.localStorage.user = user
  //     page.redirect('/')
  //   }
  // })

  let usuario = document.getElementById('usuario').value
  let contrasena = document.getElementById('contrasena').value

  request
  .get('/api/usuario/buscar')
  .query({usuario: {usuario, contrasena}})
  .end((err, resp) => {
    if (err) {
      return swal('Usuario o contrasena incorrecto.')
    }
    let usuario = JSON.parse(resp.text)
    signToken(usuario)
  })
}

function signToken (usuario) {
  request
    .post('/api/token/sign')
    .send({datos: usuario})
    .end((err, resp) => {
      if (err) {
        console.log(err)
        swal('Error', 'Ha ocurrido un error en el inicio de sesion', 'Error')
      }
      let token = JSON.parse(resp.text)
      window.localStorage.tokenApp = token.token
      page.redirect('/')
    })
}

module.exports = el
