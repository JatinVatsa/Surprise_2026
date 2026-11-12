const navigationEntry = performance.getEntriesByType("navigation")[0];

if (navigationEntry?.type === "reload") {
  const currentUrl = new URL(window.location.href);
  const isThirdPage = currentUrl.pathname.split("/").includes("third_page");
  const targetUrl = new URL(
    isThirdPage ? "./index.html" : "../second_page/index.html",
    currentUrl,
  );

  if (currentUrl.pathname !== targetUrl.pathname) {
    window.location.replace(targetUrl);
  }
}
