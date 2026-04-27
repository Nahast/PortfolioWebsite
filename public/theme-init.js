(function () {
  try {
    var s = localStorage.getItem('rj-theme')
    document.documentElement.dataset.theme = s || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  } catch (e) {}
})()
