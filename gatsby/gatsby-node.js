import path, { resolve } from 'path'
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

async function turnSlicemastersIntoPages({ graphql, actions }) {
	// query all slicemasters
	const { data } = await graphql(`
		query {
			slicemasters: allSanityPerson {
				totalCount
				nodes {
					name
					id
					slug {
						current
					}
				}
			}
		}
	`)
	// turn each slicemaster into their own page
	data.slicemasters.nodes.forEach(slicemaster => {
		actions.createPage({
			component: resolve('./src/templates/Slicemaster.js'),
			path: `/slicemaster/${slicemaster.slug.current}`,
			// this data is passed to the template when we create it
			context: {
				name: slicemaster.person,
				slug: slicemaster.slug.current,
			},
		})
	})

	// figure out how many pages there are based
	const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
	const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize)

	// loop from 1 to n and create slicemasters page
	Array.from({ length: pageCount }).forEach((_, i) => {
		actions.createPage({
			path: `/slicemasters/${i + 1}`,
			component: path.resolve('./src/pages/slicemasters.js'),
			// this data is passed to the template when we create it
			context: {
				skip: i * pageSize,
				currentPage: i + 1,
				pageSize,
			},
		})
	})
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
		turnSlicemastersIntoPages(params),
	])
	// create slicemasters
	// await turnProductsIntoPages(params)
}
