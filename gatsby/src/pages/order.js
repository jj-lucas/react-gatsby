import { graphql } from 'gatsby'
import React from 'react'
import Img from 'gatsby-image'
import useForm from '../utils/useForm'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from '../utils/formatMoney'

export default function OrderPage({ data }) {
	const pizzas = data.pizzas.nodes

	const { values, updateValue } = useForm({ name: '', email: '' })
	return (
		<>
			<fieldset>
				<legend>Your info</legend>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					value={values.name}
					onChange={updateValue}
				/>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					value={values.email}
					onChange={updateValue}
				/>
			</fieldset>
			<fieldset>
				<legend>Menu</legend>
				{pizzas.map(pizza => (
					<div key={pizza.id}>
						<Img
							width="50"
							height="50"
							fluid={pizza.image.asset.fluid}
							alt={pizza.name}
						/>
						<div>
							<h2>{pizza.name}</h2>
						</div>
						<div>
							{['S', 'M', 'L'].map(size => (
								<button type="button" key={size}>
									{size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
								</button>
							))}
						</div>
					</div>
				))}
			</fieldset>
			<fieldset>
				<legend>Order</legend>
			</fieldset>
		</>
	)
}

export const query = graphql`
	query {
		pizzas: allSanityPizza {
			nodes {
				name
				price
				id
				slug {
					current
				}
				image {
					asset {
						fluid(maxWidth: 100) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
`
