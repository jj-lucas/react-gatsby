import path from 'path'
import fetch from 'isomorphic-fetch'

async function turnPizzasIntoPages({ graphql, actions }) {
	// get a template for this page
	const pizzaTemplate = path.resolve('./src/templates/Pizza.js')

	// query all pizzas
	const { data } = await graphql(`
		query {
			pizzas: allSanityPizza {
				nodes {
					name
					slug {
						current
					}
				}
			}
		}
	`)
	// loop over and create a page
	data.pizzas.nodes.forEach(pizza => {
		console.log(`Creating a page for ${pizza.name}`)
		actions.createPage({
			path: `pizza/${pizza.slug.current}`,
			component: pizzaTemplate,
			context: {
				slug: pizza.slug.current,
			},
		})
	})
}

async function turnToppingsIntoPages({ graphql, actions }) {
	// get a template
	const toppingsTemplate = path.resolve('./src/pages/pizzas.js')
	// query all of the toppings
	const { data } = await graphql(`
		query {
			toppings: allSanityTopping {
				nodes {
					name
					id
				}
			}
		}
	`)
	// create a page for that topping
	data.toppings.nodes.forEach(topping => {
		actions.createPage({
			path: `topping/${topping.name}`,
			component: toppingsTemplate,
			context: {
				topping: topping.name,
				toppingRegex: `/${topping.name}/i`,
			},
		})
	})
	// pass topping data to pizza.js
}

/*
async function turnProductsIntoPages({ graphql, actions }) {
	// get a template for this page
	const productTemplate = path.resolve('./src/templates/Product.js')

	// query all pizzas
	const { data } = await graphql(`
		query {
			kuraitis {
				products {
					id
					name_da
					code
				}
			}
		}
	`)
	console.log(data)
	// loop over and create a page
	data.kuraitis.products.forEach(product => {
		console.log(`Creating a page for ${product.name_da}`)
		actions.createPage({
			path: `product/${product.code}`,
			component: productTemplate,
			context: {
				code: product.code,
			},
		})
	})
}
*/

async function fetchBeersAndTurnIntoNodes({
	actions,
	createNodeId,
	createContentDigest,
}) {
	// fetch a list of beers
	const res = await fetch('https://api.sampleapis.com/beers/ale')
	const beers = await res.json()
	console.log(beers)

	// loop over each one
	for (const beer of beers) {
		// create a node for each beer
		const nodeMeta = {
			id: createNodeId(`beer-${beer.name}`),
			parent: null,
			children: [],
			internal: {
				type: 'Beer',
				mediaType: 'application/json',
				contentDigest: createContentDigest(beer),
			},
		}
		actions.createNode({
			...beer,
			...nodeMeta,
		})
	}
}

export async function sourceNodes(params) {
	await Promise.all([
		// fetch a list of beers and source them into gatsby API
		fetchBeersAndTurnIntoNodes(params),
	])
}

export async function createPages(params) {
	// wait for all promises to be resolved before finishing this fucntion
	await Promise.all([
		turnPizzasIntoPages(params),
		turnToppingsIntoPages(params),
	])
	// create slicemasters
	// await turnProductsIntoPages(params)
}
