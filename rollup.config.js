import typescript from 'rollup-plugin-typescript'
import html from 'rollup-plugin-html'
import scss from 'rollup-plugin-scss'
import uglify from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV || 'dev'

export default {
  entry: `src/index.ts`,
  dest: `build/index.${env}.js`,
  format: 'es',
  moduleName: 'gaws-starter',
  plugins: [
    html({
      include: '**/*.html',
      htmlMinifierOptions: {
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				conservativeCollapse: true,
				minifyJS: true
			}
    }),
    scss({output: false}),
    typescript(),
    (env === 'prod' && uglify())
  ]
}