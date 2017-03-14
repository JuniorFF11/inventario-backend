const yo = require('yo-yo')
const page = require('page')
function getNavbar (menu, submenu) {
  let elNavbar = yo`<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">Inventario</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
         ${menu.map(
          function renderMenu (element) {
            if (element.padreId === '0') {
              let el = yo` 
              <li class="dropdown"> 
              <a href=${element.link} class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">${element.descripcion} <i class="fa fa-chevron-circle-down" aria-hidden="true"> </i></a>
              <ul class="dropdown-menu">
                  ${menu.map(submenu => {
                    if (element.menuId === submenu.padreId) return yo`<li  class="text-center"><a href="${submenu.link}"> ${submenu.descripcion}</a></li>`
                  })}
              </ul>
              </li>
              `
              return el
            }
          })}
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user-circle-o user-option" aria-hidden="true"> </i> ${window.localStorage.usuario}</a>
          <ul class="dropdown-menu">
            <li><a onclick=${logOut}>Cerrar Sesion</a></li>  
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>`
  return elNavbar
}
function logOut () {
  window.localStorage.clear()
  page.redirect('/login')
}
module.exports = getNavbar
