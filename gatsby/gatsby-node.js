import path from 'path'

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
	console.log(data)
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

export async function createPages(params) {
	// create pizzas
	await turnPizzasIntoPages(params)
	// create toppings
	// create slicemasters
}