let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('darkToggle')

const enableDarkmode = () => {
  document.documentElement.classList.add('dark')
  localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
  document.documentElement.classList.remove('dark')
  localStorage.setItem('darkmode', 'inactive')
}

if (darkmode === "active") {
  enableDarkmode()
}

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})
