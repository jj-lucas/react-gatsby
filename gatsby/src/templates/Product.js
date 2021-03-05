import { graphql } from 'gatsby'
import React from 'react'

export default function SinglePizzaPage({ data }) {
	const { product } = data.kuraitis
	return (
		<>
			<h1>{product.name_da}</h1>
			<p>{product.description_da}</p>
		</>
	)
}
/*
export const query = graphql`
	query($code: String!) {
		kuraitis {
			product(code: $code) {
				name_da
				code
				description_da
			}
		}
	}
`
*/
