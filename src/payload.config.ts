import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'

dotenv.config({
	path: path.resolve(__dirname, '../.env')
})

export default buildConfig({
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
	collections: [],
	routes: {
		admin: '/admin-panel'
	},
	admin: {
		bundler: webpackBundler(),
		meta: {
			titleSuffix: '- Crypto AI learning app',
			favicon: '/favicon.ico',
			ogImage: '/tumbnail.jpg',
		}
	},
	rateLimit: {
		max: 2000,
	},
	editor: slateEditor({}),
	db: mongooseAdapter({
		url: process.env.MONGODB_URL!,
	}),
	typescript: {
		outputFile: path.resolve(__dirname, 'payload-types.ts'),
	}
})