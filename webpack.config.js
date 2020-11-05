const path = require('path');
const entryPath = path.join(__dirname, 'src');
const outputPath = path.join(__dirname, 'dist');

module.exports = {
	entry: path.join(entryPath, 'index.js'),
	output: {
		filename: 'bundle.js',
		path: outputPath
	},
	module:{
		rules:[
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader'
			},
			{
				test: /\.(css|scss|sass)$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	devServer:{
		contentBase: outputPath,
		historyApiFallback: true
	},
	resolve:{
		extensions: ['.jsx', '.js']
	}
}