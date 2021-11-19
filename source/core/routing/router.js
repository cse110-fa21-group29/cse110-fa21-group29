// Route patterns for the different pages of the site.
// Each route pattern is the URL with all parameters replaced with "_".
// Key is name of component (route), value is URL.
const routePatterns = {
  "home-page": "#/",
  "recipe-details": "#/recipes/_",
  "recipe-contribute": "#/recipes/contribute",
  "meal-planner": "#/meal-planner",
  "about-us": "#/about-us",
  search: "#/search",
};

// Initial setup, runs on page loaded
window.addEventListener("DOMContentLoaded", () => {
  routerSetup();
  navigateFromUrl(window.location.hash);
});

// Set up router navigate event listener.
// Removes current child of <div id="content"></div>
// and replaces it with child element relating to
// new route.
function routerSetup() {
  document.addEventListener("router-navigate", (event) => {
    loadRoute(event.detail.route);

    // If we are pushing this route to the history state
    // AND we aren't already on the page, push the history state
    const url = getUrlFromRoute(event.detail.route, event.detail.params);
    if (!event.detail.preventStatePush && window.location.hash !== url) {
      history.pushState(
        {
          route: event.detail.route,
          params: event.detail.params,
        },
        event.detail.route,
        url
      );
    }
  });

  // Popstate event runs whenever back/forward arrows are clicked.
  // If state is null, this means the user typed a new hash in the url
  // and hit enter, so we navigate to the url as a backup.
  // If state exists, we emit a router-navigate event without pushing
  // the route's state.
  window.addEventListener("popstate", (event) => {
    if (event.state) {
      const routerEvent = new CustomEvent("router-navigate", {
        detail: {
          ...event.state,
          preventStatePush: true,
        },
        bubbles: true,
        composed: true,
      });
      document.dispatchEvent(routerEvent);
    } else {
      navigateFromUrl(window.location.hash);
    }
  });
}

// Load the correct web component based on the given route.
// We assume all web components are named the same as their routes.
function loadRoute(route) {
  const contentElement = document.getElementById("content");
  const newRouteElement = document.createElement(route);

  // If there is an element loaded already, replace it with new one.
  // Otherwise, add new one.
  if (contentElement.childElementCount > 0) {
    const oldRouteElement = contentElement.firstElementChild;
    contentElement.replaceChild(newRouteElement, oldRouteElement);
  } else {
    contentElement.appendChild(newRouteElement);
  }
}

// Navigate to a page based on only the URL.
// Used when we are navigating without a state.
// If we can match the url to a route pattern,
// we load the route onto the page and store its state in
// the current history entry.
// If we cannot match the url to a route pattern,
// we redirect to the home page.
function navigateFromUrl(url) {
  const initialRoute = getRoutefromUrl(url);

  if (initialRoute) {
    loadRoute(initialRoute);
    history.replaceState(initialRoute, initialRoute, url);
  } else {
    const routerEvent = new CustomEvent("router-navigate", {
      detail: {
        route: "home-page",
        params: [],
      },
      bubbles: true,
      composed: true,
    });
    document.dispatchEvent(routerEvent);
  }
}

// Generates correct url for a particular route
function getUrlFromRoute(route, params) {
  // Replace all "_" in route's pattern with provided params
  const urlPattern = routePatterns[route];

  let splitUrl = urlPattern.split("/");
  let currentParam = 0;
  for (let i = 0; i < splitUrl.length; i++) {
    const urlSection = splitUrl[i];
    if (urlSection === "_") {
      splitUrl[i] = params[currentParam];
    }
  }

  return splitUrl.join("/");
}

// Generate correct route for a particular URL.
// If no routes match the URL, returns false.
function getRoutefromUrl(url) {
  // No URL at all is the same as the home page
  if (url.length === 0) {
    return "home-page";
  }

  // Replace all numbers in URL with "_"
  let splitUrl = url.split("/");
  for (let i = 0; i < splitUrl.length; i++) {
    const urlSection = splitUrl[i];
    if (!isNaN(parseInt(urlSection))) {
      splitUrl[i] = "_";
    }
  }

  // Compare url pattern against all route patterns
  const urlPattern = splitUrl.join("/");
  for (const route in routePatterns) {
    if (routePatterns[route] === urlPattern) {
      return route;
    }
  }

  return false;
}
