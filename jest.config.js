module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
	  '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
	},
	moduleNameMapper: {
	  // Mock non-JS modules if needed
	  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	transformIgnorePatterns: [
	  '/node_modules/(?!your-module-to-transform)', // Specify modules to transform
	],
	globals: {
	  'ts-jest': {
		useESM: true, // Enable ESM support
	  },
	},
  };
  