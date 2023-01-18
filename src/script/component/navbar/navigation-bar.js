class NavigationBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="container">
            <a class="navbar-brand fw-bold" href="#">Plant Disease</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Klasifikasi
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Jagung</a></li>
                            <li><a class="dropdown-item" href="#">Padi</a></li>
                            <li><a class="dropdown-item" href="#">Mentimun</a></li>
                            <li><a class="dropdown-item" href="#">Tomat</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#tim-pengembang">Pengembang</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#credits">Credits</a>
                    </li>
                </ul>
            </div>
        </div>
        `;
    }

}

customElements.define('navigation-bar', NavigationBar);