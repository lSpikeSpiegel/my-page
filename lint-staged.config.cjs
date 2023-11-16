module.exports = {
	"*.{js,jsx,ts,tsx,vue,scss,less,styl,html}": [
		// "eslint --fix",
		// "vue-tsc --noEmit --skipLibCheck",
		"prettier --write"
	],
	"{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
	"package.json": ["prettier --write"],
	"*.md": ["prettier --write"]
};
