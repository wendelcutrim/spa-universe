class Router {
    routes = {};

    add(routeName, page) {
        this.routes[routeName] = page;
    }
 
    router(event) {
        event = event || window.event;
    
        event.preventDefault();
    
        window.history.pushState({}, "", event.target.href);
    
        this.handleView();
    };

    handleView() {
        const { pathname } = window.location;
    
        const route = this.routes[pathname] || this.routes[404];
        this.fetchRoute(route);
    };

    async fetchRoute(endPoint) {
        const response = await fetch(endPoint);
    
        const data = await response.text();
    
        this.mountView(data);
    };

    mountView(html) {
        const app = document.getElementById('app');
    
        const {pathname} = window.location;
    
        this.closeMobileMenu();
        this.removePreviousView();
        this.changeBgBody(pathname);
    
        return app.insertAdjacentHTML("beforeend", html);
    };

    removePreviousView() {
        let app = document.getElementById('app');
    
        if(app.childNodes.length == 1) {
            app.removeChild(app.childNodes[0]);
        }
        
    };

    changeBgBody(event) {
        const bg = document.querySelector('body');
        
        if (event == "/universe") {
            bg.style.backgroundImage = "url('./assets/img/mountains-universe-2.png')";
        } else if (event == "/explorer") {
            bg.style.backgroundImage = "url('./assets/img/mountains-universe-3.png')";
        } else {
            bg.style.backgroundImage = "url('./assets/img/mountains-universe-1.png')";
        }
    };

    handleMobileMenu() {
        const menuMobile = document.querySelector('.menu-mobile');

        menuMobile.classList.toggle('open');
    };

    closeMobileMenu() {
        const menuMobile = document.querySelector('.menu-mobile');

        menuMobile.classList.remove('open');
    };
}

export default Router;