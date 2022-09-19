export const images = {
  bg_wallpaper: require('./source/bg.png'),
  tk_bg_wallpaper: require('./source/tk_bg.jpeg'),
  default: require('./source/default.png'),
  welcome_tiktok_logo: require('./source/welcome_tiktok_logo.png'),
  welcome_cat_tiktok: require('./source/welcome_cat_tiktok.gif'),
  welcome_dog_tiktok: require('./source/welcome_dog_tiktok.gif'),
  welcome_bird_tiktok: require('./source/welcome_bird_tiktok.gif'),
  welcome_seal_tiktok: require('./source/welcome_seal_tiktok.gif'),
  welcome_iphone: require('./source/welcome_iphone.png'),
  pure_tiktok: require('./source/pure_tiktok_logo.png'),

  tk_frame1: require('./source/tk_frame_1.png'),
  tk_frame2: require('./source/tk_frame_2.png'),
  tk_frame3: require('./source/tk_frame_3.png'),
  tk_frame4: require('./source/tk_frame_4.png'),
  tk_frame5: require('./source/tk_frame_5.png'),
};

export type ImageTypes = keyof typeof images;
