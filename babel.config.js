module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        blacklist: null, // DEPRECATED
        whitelist: null, // DEPRECATED
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@assets': ['./src/app/assets'],
          '@common': ['./src/app/common/index'],
          '@hooks': ['./src/app/common/hooks/index'],
          '@native-module': ['./src/app/common/native-module/index'],
          '@validate': ['./src/app/common/yup-validate'],
          '@listener': ['./src/app/common/redux/listener.ts'],
          '@animated': ['./src/app/common/animated/index'],
          '@config': ['./src/app/config'],
          '@features': ['./src/app/features'],
          '@components': ['./src/app/library/components/index'],
          '@components': ['./src/app/library/components'],
          '@utils': ['./src/app/library/utils'],
          '@storage': ['./src/app/library/utils/storage/index'],
          '@networking': ['./src/app/library/networking/index'],
          '@networking': ['./src/app/library/networking'],
          '@model': ['./src/app/model'],
          '@navigation': ['./src/app/navigation'],
          '@store': ['./src/app/redux/store'],
          '@redux-slice': ['./src/app/redux/action-slice/index'],
          '@redux-action-type': ['./src/app/redux/action-type'],
          '@theme': ['./src/app/themes/index'],
          '@theme': ['./src/app/themes'],
          '@transition': ['./src/app/transition/index'],
        },
      },
    ],
  ],
};
