import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const ToppingsStyles = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-bottom: 4rem;
	a {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap: 0 1rem;
		padding: 5px;
		align-items: center;
		background: var(--grey);
		border-radius: 2px;
		.count {
			background: white;
			padding: 2px 5px;
		}
		.active {
			background: var(--yellow);
		}
	}
`

function countPizzasInToppings(pizzas) {
	// return the pizzas with counts
	const counts = pizzas
		.map(pizza => pizza.toppings)
		.flat()
		.reduce((acc, topping) => {
			// check if this is an existing topping
			const existingTopping = acc[topping.id]
			if (existingTopping) {
				// if it is, increment by 1
				existingTopping.count += 1
			} else {
				// otherwise create a new entry and set it to 1
				acc[topping.id] = {
					id: topping.id,
					name: topping.name,
					count: 1,
				}
			}
			return acc
		}, {})
	// sort them based on their count
	const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count)
	return sortedToppings
}
export default function ToppingsFilter() {
	// get a list of all the toppings
	const { toppings, pizzas } = useStaticQuery(graphql`
		query Toppings {
			toppings: allSanityTopping {
				nodes {
					name
					vegetarian
					id
				}
			}
			pizzas: allSanityPizza {
				nodes {
					toppings {
						name
						id
					}
				}
			}
		}
	`)
	console.log({ toppings, pizzas })
	// get a list of all the pizzas with their toppings
	const toppingsWithCounts = countPizzasInToppings(pizzas.nodes)
	console.log(toppingsWithCounts)
	// count how many pizzas are in each toppings
	// loop over the list of toppings and display the topping and the count of pizzas
	return (
		<ToppingsStyles>
			{toppingsWithCounts.map(topping => (
				<Link to={`/topping/${topping.name}`} key={topping.id}>
					<span className="name">{topping.name}</span>
					<span className="count">{topping.count}</span>
				</Link>
			))}
		</ToppingsStyles>
	)
}
