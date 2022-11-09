module.exports = function (api) {
  api.cache(true);

  const presets = [
    '@babel/preset-env',
    '@babel/typescript',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ];

  const plugins = [
    'macros', // <-- babel-plugin-macros , fontawesone icon dynamic import need this
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      },
    ],
  ];

  const env = {
    test: {
      plugins: [
        'react-hot-loader/babel',
        'effector/babel-plugin',
        [
          '@babel/transform-runtime',
          {
            regenerator: true,
          },
        ],
      ],
    },
  };

  return {
    presets,
    plugins,
    env,
  };
};