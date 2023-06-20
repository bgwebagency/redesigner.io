const nextJest = require('next/jest')
const createJestConfig = nextJest({
	dir: './',
})
const customJestConfig = {
	moduleDirectories: ['node_modules', '<rootDir>/'],
	testEnvironment: 'jest-environment-jsdom',
	preset: 'ts-jest',
	transform: {
		'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
	},
	transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
	testPathIgnorePatterns: ['<rootDir>/e2e'],
	setupFilesAfterEnv: ['./app/jest.setup.js'],
}
module.exports = createJestConfig(customJestConfig)
