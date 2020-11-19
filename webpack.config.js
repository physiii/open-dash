const path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	nodeExternals = require('webpack-node-externals'),
	LOCAL_IDENT_NAME = '[name]__[local]___[hash:base64:5]';

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'js/bundle.js'
	},
	target: 'node-webkit',
	node: {
		__dirname: false
	},
	plugins: [
		// new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			minify: false,
			cache: false
		}),
		new MiniCssExtractPlugin({
			filename: 'css/main.css'
		})
	],
	externals: [nodeExternals({
		whitelist: [
			'normalize-css', // Normalize doesn't automatically inject the CSS unless it and its dependencies are included in the bundle.
			'insert-css'
		]
	})],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						],
						plugins: [
							[
								'react-css-modules',
								{
									exclude: 'node_modules',
									generateScopedName: LOCAL_IDENT_NAME,
									handleMissingStyleName: 'warn'
								}
							]
						]
					}
				}
			},
			{
				test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					{
						loader: MiniCssExtractPlugin.loader // Extract CSS to file for production.
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: LOCAL_IDENT_NAME,
							minimize: true,
							sourceMap: true
						}
					}
				]
			},
			// This allows us to import jsmpeg in any file as if it was exported like an ES6 module.
			{
				test: require.resolve(path.resolve(__dirname, 'src/lib/jsmpeg/jsmpeg.min.js')),
				use: ['exports-loader?JSMpeg']
			}
		]
	}
};
