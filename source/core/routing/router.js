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
    const newRouteElement = document.createElement(event.detail.route);
    contentElement.replaceChild(newRouteElement, oldRouteElement);

    history.pushState(
      event.detail.route,
      event.detail.route,
      getRouterUrls(event.detail.route, event.detail.params)
    );
  });
}

function getRouterUrls(route, params) {
  const routerUrls = {
    "home-page": "",
    "recipe-details": `recipes/${params.id}`,
    "recipe-contribute": `recipes/contribute`,
  };

  return `#/${routerUrls[route]}`;
}
