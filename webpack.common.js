const path = require( 'path' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

module.exports = {
  entry: {
    popup: path.resolve( 'src/popup/popup.tsx' ),
    background: path.resolve( 'src/background.ts' ),
    content: path.resolve( 'src/content.ts' ),
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin( {
      cleanStaleWebpackAssets: false
    } ),
    new CopyPlugin( {
      patterns: [
        {
          from: path.resolve( "src/static" ),
          to: path.resolve( "dist" )
        }
      ]
    } ),
    new HtmlWebpackPlugin( {
      title: "React Chrome Extension",
      filename: "popup.html",
      chunks: ["popup"],
      template: path.resolve("src/popup/popup.html")
    } )
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve( 'dist' )
  }
}