console.log("Routes JS");

const routes = {
    "/": "../../pages/home.html",
    "/universe": "../../pages/universe.html",
    "/explorer": "../../pages/explorer.html",
    404: "../../pages/not-found.html",
}

function router(event) {
    event = event || window.event;

    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    handleView();
}

function handleView() {
    const { pathname } = window.location;

    const route = routes[pathname] || routes[404];
    fetchRoute(route);
}

async function fetchRoute(endPoint) {
    const response = await fetch(endPoint);

    const data = await response.text();

    mountView(data);
}

function mountView(html) {
    const app = document.getElementById('app');

    const {pathname} = window.location;

    removePreviousView()
    changeBgBody(pathname)

    return app.insertAdjacentHTML("beforeend", html);
}

function removePreviousView() {
    let app = document.getElementById('app');

    if(app.childNodes.length == 1) {
        app.removeChild(app.childNodes[0]);
    }
    
}

function changeBgBody(event) {
    const bg = document.querySelector('body');

    console.log(event)

    if (event == "/universe") {
        bg.style.backgroundImage = "url('./assets/img/mountains-universe-2.png')";
    } else if (event == "/explorer") {
        bg.style.backgroundImage = "url('./assets/img/mountains-universe-3.png')";
    } else {
        bg.style.backgroundImage = "url('./assets/img/mountains-universe-1.png')";
    }
}

handleView()