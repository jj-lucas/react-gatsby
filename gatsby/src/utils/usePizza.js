import { useState } from 'react'

export default function usePizza({ pizzas, inputs }) {
	// create state to hold order
	const [order, setOrder] = useState([])
	// make function to add things to order
	function addToOrder(orderedPizza) {
		setOrder([...order, orderedPizza])
	}
	// make function to remove things from order
	function removeFromOrder(index) {
		setOrder([
			// everything before the item we want to remove
			...order.slice(0, index),
			// everything after the item we want to remove
			...order.slice(index + 1),
		])
	}
	// send this order to serverless function when they check out
	// TODO

	return {
		order,
		addToOrder,
		removeFromOrder,
	}
}
