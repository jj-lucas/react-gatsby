import { MdPerson as icon } from 'react-icons/md'

export default {
	name: 'person',
	title: 'Slicemasters',
	type: 'document',
	icon,
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
			description: 'Name of the person',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 100,
			},
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			description: 'Tell us a bit about them',
		},
	],
}