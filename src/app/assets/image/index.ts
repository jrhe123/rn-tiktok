export const images = {
  bg_wallpaper: require('./source/bg.png'),
  default: require('./source/default.png'),
  welcome_tiktok_logo: require('./source/welcome_tiktok_logo.png'),
  welcome_cat_tiktok: require('./source/welcome_cat_tiktok.gif'),
  welcome_dog_tiktok: require('./source/welcome_dog_tiktok.gif'),
  welcome_bird_tiktok: require('./source/welcome_bird_tiktok.gif'),
  welcome_seal_tiktok: require('./source/welcome_seal_tiktok.gif'),
  welcome_iphone: require('./source/welcome_iphone.png'),
  pure_tiktok: require('./source/pure_tiktok_logo.png'),
};

export type ImageTypes = keyof typeof images;
