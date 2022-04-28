// ================= BASE =========================

const BASE_URL = 'https://pbasics.pythonanywhere.com'

// ================ IMPORTS ===================

const $username = document.querySelector('.username')
const $password = document.querySelector('.password')
const $form = document.querySelector('.form')
const $seePassword = document.querySelector('.seePassword')

// ================ STATES ====================
let seePasswordState = false
const requests = {
	POST: (url) => {
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				username: $username.value.trim(),
				password: $password.value.trim(),
			}),
		}).then((res) => {
			if (res.status < 400) {
				return res.json()
			}
		})
	},
}
// ============================================

$form.addEventListener('submit', (e) => {
	e.preventDefault()
	requests.POST(`${BASE_URL}/auth/token/login`).then((res) => {
		console.log(res)
		localStorage.setItem('userToken', res.auth_token)
		open('../index.html', '_self')
	})
})

$seePassword.addEventListener('click', (e) => {
	e.preventDefault()
	seePasswordState = !seePasswordState
	if (!seePasswordState) {
		$password.setAttribute('type', 'text')
	} else {
		$password.setAttribute('type', 'password')
	}
})
