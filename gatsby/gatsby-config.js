import dotenv from 'dotenv'

dotenv.config({
	path: '.env',
})

// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
export default {
	siteMetadata: {
		title: `Slicks Slices`,
		siteUrl: 'https://gatsby.pizza',
		description: 'The best pizza in Hamilton',
	},
	plugins: [
		{
			resolve: 'gatsby-source-graphql',
			options: {
				// Arbitrary name for the remote schema Query type
				typeName: 'Kuraitis',
				// Field under which the remote schema will be accessible. You'll use this in your Gatsby query
				fieldName: 'kuraitis',
				// Url to query from
				url: 'http://localhost:4444/graphql',
			},
		},
		{
			resolve: 'gatsby-source-sanity',
			options: {
				projectId: '3b9p4imn',
				dataset: 'production',
				watchMode: true,
				token: process.env.SANITY_TOKEN,
			},
		},
	],
}
