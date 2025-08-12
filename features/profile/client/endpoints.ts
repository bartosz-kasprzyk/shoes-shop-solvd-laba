export default {
  baseURL: process.env.NEXT_PUBLIC_SHOES_SHOP_BASE_API,
  getProfile: '/users/me',
  updateProfile: '/users',
  updateProfileAvatar: '/upload',
  deleteProfileAvatar: '/upload/files',
};
