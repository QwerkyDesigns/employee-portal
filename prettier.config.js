const newLocal = 'prettier-plugin-tailwindcss';
module.exports = {
    singleQuote: true,
    semi: true,
    plugins: [require(newLocal)],
    tabWidth: 4,
    trailingComma: 'none',
    printWidth: 160
};
