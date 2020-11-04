import Model from 'radiks/lib/model';

export default class Entry extends Model {
  static className = 'Entry';

  static schema = {
    caption: {
      type: String,
      decrypted: true,
    },
    file: {
      type: Object,
      decrypted: true,
    },
    dareId: {
      type: String,
      decrypted: true,
    },
    createdBy: {
      type: String,
      decrypted: true,
    },
  };


}
