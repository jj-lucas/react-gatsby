import { useContext, useState } from 'react'
import OrderContext from '../components/OrderContext'
import attachNamesAndPrices from './attachNamesAndPrices'
import calculateOrderTotal from './calculateOrderTotal'
import formatMoney from './formatMoney'

export default function usePizza({ pizzas, values }) {
	const [order, setOrder] = useContext(OrderContext)
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')

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
	async function submitOrder(e) {
		e.preventDefault()
		console.log(e)
		setLoading(true)
		setError(null)
		setMessage(null)

		// gather data to be sent
		const body = {
			order: attachNamesAndPrices(order, pizzas),
			total: formatMoney(calculateOrderTotal(order, pizzas)),
			name: values.name,
			email: values.email,
		}
		// send this order to serverless function when they check out
		const res = fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		const text = JSON.parse(await res.text())

		console.log(text)

		// check if everything worked
		if (res.status >= 400 && res.status < 600) {
			setLoading(false)
			setError(text.message)
		} else {
			// it worked
			setLoading(false)
			setMessage('Success, come on down for your pizza!')
		}
	}

	return {
		order,
		addToOrder,
		removeFromOrder,
		error,
		loading,
		message,
		submitOrder,
	}
}
