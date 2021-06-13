module.exports = {
    transform: { "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest" },
    roots: ['<rootDir>'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};