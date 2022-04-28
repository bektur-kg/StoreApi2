// ================= BASE =========================

const BASE_URL = 'https://pbasics.pythonanywhere.com'

// ================ IMPORTS ===================

const $username = document.querySelector('.username')
const $password = document.querySelector('.password')
const $email = document.querySelector('.email')
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
				email: $email.value.trim(),
				username: $username.value.trim(),
				password: $password.value.trim(),
			}),
		}).then((r) => r.json())
	},
}
// ============================================

$form.addEventListener('submit', (e) => {
	e.preventDefault()
	requests.POST(`${BASE_URL}/auth/users/`).then((res) => {
		console.log(res)
		open('../auth.html', '_self')
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
