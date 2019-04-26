const loginBtn = document.querySelector('#loginBtn')
const usernameField = document.querySelector('#usernameField')
const form = document.querySelector('.form')
form.addEventListener('click', e => {
	e.preventDefault()
})
function checkLoginExist() {
	console.log(localStorage.getItem('username'))
	if (localStorage.getItem('username') !== null) {
		window.location = '/chat'
	}
}
document.addEventListener('DOMContentLoaded', checkLoginExist)
loginBtn.addEventListener('click', login)

function login() {
	if (usernameField.value !== '') {
		localStorage.setItem('username', usernameField.value)
	} else {
		usernameField.classList.add('error_border')
		console.log('Pole nie może być puste ')
	}
}
