import React from 'react'
import GlobalStyles from '../styles/GlobalStyles'
import Typography from '../styles/Typography'
import Footer from './Footer'
import Nav from './Nav'

export default function Layout({ children }) {
	return (
		<div>
			<Nav />
			<GlobalStyles />
			<Typography />
			{children}
			<Footer />
		</div>
	)
}
