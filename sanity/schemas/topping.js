import { FaPepperHot as icon, FaCarrot as IconVegetarian } from 'react-icons/fa'

export default {
	name: 'topping',
	title: 'Toppings',
	type: 'document',
	icon,
	fields: [
		{
			name: 'name',
			title: 'Topping name',
			type: 'string',
			description: 'Name of the topping',
		},
		{
			name: 'vegetarian',
			title: 'Vegetarian',
			type: 'boolean',
		},
	],
	preview: {
		select: {
			name: 'name',
			vegetarian: 'vegetarian',
		},
		prepare: ({ name }) => ({
			title: `${name}`,
		}),
	},
}
