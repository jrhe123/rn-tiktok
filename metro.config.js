// eslint-disable-next-line @typescript-eslint/no-var-requires
const exclusionList = require('metro-config/src/defaults/exclusionList');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    blacklistRE: exclusionList([/#current-cloud-backend\/.*/]),
  },
};
