document.addEventListener("DOMContentLoaded", () => {
  routerSetup();
});

// Set up router navigate event listener.
// Removes current child of <div id="content"></div>
// and replaces it with child element relating to
// new route.
function routerSetup() {
  document.addEventListener("router-navigate", (event) => {
    const contentElement = document.getElementById("content");
    const oldRouteElement = contentElement.firstElementChild;
    const newRouteElement = document.createElement(event.detail);
    contentElement.replaceChild(newRouteElement, oldRouteElement);

    let routeUrl = `#${event.detail}`;
    if (event.detail === "home-page") {
      routeUrl = "#";
    }
    history.pushState(event.detail, event.detail, routeUrl);
  });
}
