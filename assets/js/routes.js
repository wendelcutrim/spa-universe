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

    window.history.pushState({}, "", event.target.href)

    handleView()
}

function handleView() {
    const { pathname } = window.location;

    const route = routes[pathname] || routes[404];
    fetchRoute(route);
}

async function fetchRoute(endPoint) {
    const response = await fetch(endPoint);

    const data = await response.text();
    console.log(data);

    mountView(data);
}

function mountView(html) {
    const app = document.getElementById('app');

    removePreviousView()

    return app.insertAdjacentHTML("beforeend", html);
}

function removePreviousView() {
    let app = document.getElementById('app');

    if(app.childNodes.length == 1) {
        app.removeChild(app.childNodes[0]);
    }
    
}

handleView()