const loginBtn = document.querySelector('#loginBtn')
const usernameField = document.querySelector('#usernameField')
const form = document.querySelector('.form')

function checkLoginExist() {
	if (localStorage.getItem('username') !== null) {
		window.location = '/chat'
	}
}
document.addEventListener('DOMContentLoaded', checkLoginExist)
loginBtn.addEventListener('click', e => {
	e.preventDefault()
	login()
})

function login() {
	if (usernameField.value !== '') {
		localStorage.setItem('username', usernameField.value)
		window.location = '/chat'
	} else {
		usernameField.classList.add('errorBorder')
		document.querySelector('#errorText').style.visibility = 'visible'
	}
}
