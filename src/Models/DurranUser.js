import Model from 'radiks/lib/model';

export default class DurranUser extends Model {
  static className = 'DurranUser';

  static schema = {
    name: {
      type: String,
      decrypted: true,
    },
    username: {
      type: String,
      decrypted: true,
    },
    bio: {
      type: String,
      decrypted: true,
    },
    imageUrl: {
      type: String,
      decrypted: true,
    },
    bannerUrl: {
      type: String,
      decrypted: true,
    },
    bitcoinAddress: {
      type: String,
      decrypted: true,
    },
    location: {
      type: String,
      decrypted: true,
    },
  };
}
