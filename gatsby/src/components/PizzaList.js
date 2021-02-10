import { Link } from 'gatsby'
import React from 'react'
import Img from 'gatsby-image'

const SinglePizza = ({ pizza }) => (
	<Link to={`pizza/${pizza.slug.current}`}>
		<h2>
			<span className="mark">{pizza.name}</span>
		</h2>
		<p>{pizza.toppings.map(topping => topping.name).join(', ')}</p>
		<Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
	</Link>
)

export default function PizzaList({ pizzas }) {
	return (
		<div>
			{pizzas.map(pizza => (
				<SinglePizza key={pizza.id} pizza={pizza} />
			))}
		</div>
	)
}
