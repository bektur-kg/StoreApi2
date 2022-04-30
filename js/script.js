// ================= BASE =========================

const BASE_URL = 'https://pbasics.pythonanywhere.com'
const USER_TOKEN = localStorage.getItem('userToken')

// ================ IMPORTS ===================

const $container = document.querySelector('.container')
const $categories = document.querySelector('.categoriesList')
const $logout = document.querySelector('.logoutBtn')
const $adminPanel = document.querySelector('.adminPanel')
const $addAdmin = document.querySelector('.addProduct')
const $removeAdmin = document.querySelector('.cancelAdmin')
const $createProduct = document.querySelector('.addAdmin')
const $title = document.querySelector('.title')
const $desc = document.querySelector('.desc')
const $imgURL = document.querySelector('.imgURL')
const $price = document.querySelector('.price')
const $category = document.querySelector('.category')
const $loading = document.querySelector('.row')

// ================ STATES ====================

const categories = [
	{
		route: 1,
		title: 'Кроссовки',
	},
	{
		route: '',
		title: 'Все',
	},
	{
		route: 2,
		title: 'Тапочки',
	},
	{
		route: 3,
		title: 'Туфли',
	},
]

const REQUESTS = {
	get: (url) => {
		return fetch(url, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Token ${USER_TOKEN}`,
			},
		}).then((r) => r.json())
	},
	post: (url, body) => {
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Token ${USER_TOKEN}`,
			},
			body: JSON.stringify(body),
		}).then((r) => r.json())
	},
	delete: (url) => {
		return fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Token ${USER_TOKEN}`,
			},
		}).then((r) => r.json())
	},
}
// ============================================

window.addEventListener('load', () => {
	if (!USER_TOKEN) {
		open('../auth.html', '_self')
	}
})

function getProducts() {
	REQUESTS.get(`${BASE_URL}/products/`).then((res) => {
		cardTemplate(res)
	})
}
window.addEventListener('load', () => {
	$loading.innerHTML =
		'<div class="lds-facebook"><div></div><div></div><div></div></div>'
	getProducts()
})

window.addEventListener('load', () => {
	const template = categories
		.map(({ route, title }) => {
			return `<li onclick="getCategories('${route}')">${title}</li>`
		})
		.join('')
	$categories.innerHTML = template
})

$logout.addEventListener('click', (e) => {
	e.preventDefault()
	localStorage.removeItem('userToken')
	window.open('../auth.html', '_self')
})

$addAdmin.addEventListener('click', (e) => {
	e.preventDefault()
	$adminPanel.classList.toggle('active')
})

$removeAdmin.addEventListener('click', (e) => {
	e.preventDefault()
	$adminPanel.classList.remove('active')
})

$createProduct.addEventListener('click', (e) => {
	e.preventDefault()
	$createProduct.disabled = true
	const sendBody = {
		title: $title.value,
		description: $desc.value,
		price: $price.value,
		image_url: $imgURL.value,
		category: $category.value,
	}
	REQUESTS.post(`${BASE_URL}/products/create/`, sendBody).then(getProducts)
})

function getCategories(route) {
	REQUESTS.get(`${BASE_URL}/products/?category=${route}`).then((res) =>
		cardTemplate(res)
	)
}

function cardTemplate(base) {
	const template = base
		.reverse()
		.map(({ category, description, id, image, image_url, price, title }) => {
			return `
				<div class="card">
					<div class="card-header">
						<h3>${title}</h3>
					</div>
					<div class="card-body">
						<div class="card-img">
							<img src="${image ? image : image_url}">
					</div>
					</div>
					<div class="card-footer">
						<span>${price}$</span>
					</div>
					<div class="btnContainer">
						<button class="deleteProduct" onclick="deleteProduct('${id}')">Delete</button>
						<button class="moreBtn" onclick="moreCard()">More</button>
					</div>
				</div>
			`
		})
		.join('')
	$container.innerHTML = template
}

function deleteProduct(id) {
	REQUESTS.delete(`${BASE_URL}/products/delete/${id}`).finally(() => {
		getProducts()
	})
}
