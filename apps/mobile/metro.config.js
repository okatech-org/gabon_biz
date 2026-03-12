const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Ensure Metro knows the project root
config.projectRoot = projectRoot;

// Watch all files in the monorepo
config.watchFolders = [monorepoRoot];

// Disable hierarchical lookup so Metro only uses nodeModulesPaths
config.resolver.disableHierarchicalLookup = true;

// Let Metro know where to resolve packages from (project-local first, then root)
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;
