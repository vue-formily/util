const path = require('path');
const typescript = require('rollup-plugin-typescript2');

const dirMap = {
  'vue-formily-util': path.resolve(__dirname, `../src/index.ts`)
};

const formatNameMap = {
  'vue-formily-util': 'VueFormilyUtil'
};

const pkgNameMap = {
  'vue-formily-util': 'vue-formily-util'
};

const formatMap = {
  es: 'esm',
  umd: ''
};

const tsPlugin = typescript({
  tsconfig: path.resolve(__dirname, '../tsconfig.json'),
  cacheRoot: path.resolve(__dirname, '../node_modules/.rts2_cache'),
  useTsconfigDeclarationDir: true,
  tsconfigOverride: {
    exclude: ['**/tests']
  }
});

const package = require(path.resolve(__dirname, `../package.json`));

function createConfig(pkg, format) {
  const config = {
    input: {
      input: dirMap[pkg],
      plugins: [tsPlugin]
    },
    output: {
      banner: `/**
  * vue-formily-util v${package.version}
  *
  * @link ${package.homepage}
  * @source ${package.repository}
  * (c) ${new Date().getFullYear()} An Ha
  * @license MIT
  */`,
      format,
      name: format === 'umd' ? formatNameMap[pkg] : undefined,
      sourcemap: true,
      // Disable warning about mixed named/default exports
      // We we have handled this in the index file
      exports: 'named'
    }
  };

  config.bundleName = `${pkgNameMap[pkg]}${formatMap[format] ? '.' + formatMap[format] : ''}.js`;

  return config;
}

module.exports = {
  formatNameMap,
  pkgNameMap,
  formatMap,
  createConfig
};
