import { graphql } from 'gatsby'
import React from 'react'

export default function SinglePizzaPage() {
	return <p>Single pizza</p>
}

export const query = graphql`
	query($slug: String!) {
		pizza: sanityPizza(slug: { current: { eq: $slug } }) {
			name
			id
			image {
				asset {
					fluid(maxWidth: 800) {
						...GatsbySanityImageFluid
					}
				}
			}
			toppings {
				id
				vegetarian
				name
			}
		}
	}
`