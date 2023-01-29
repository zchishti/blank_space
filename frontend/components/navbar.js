class Navbar extends HTMLElement{ 
    constructor(){
        super();
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" id="home-icon"><i class="fa-solid fa-calendar-days"></i></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="index.html">Home</a>
              <a class="nav-link" href="dashborad.html">Dashboard</a>
            </div>
          </div>
          <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#" 
                    id="navbar-usericon"><i class="fa-solid fa-user"></i></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" id="navbar-username">${user.name? user.name : ''}</a>
                </li>
            </ul>
          </div>
        </div>
    </nav>
    `
    }
}

window.customElements.define('custom-navbar', Navbar)