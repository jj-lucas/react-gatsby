import React from 'react'
import { Link, navigate } from 'gatsby'

export default function Nav() {
	/*
    const goToSlicemasters = e => {
		setTimeout(() => {
			console.log('going')
			navigate('/slicemasters')
		}, 2000)
    }
    */
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/pizzas">Pizza Menu</Link>
				</li>
				<li>
					<Link to="/">LOGO</Link>
				</li>
				<li>
					<Link to="/slicemasters">Slicemasters</Link>
				</li>
				<li>
					<Link to="/order">Order ahead!</Link>
				</li>
			</ul>
		</nav>
	)
}
