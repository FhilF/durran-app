import Model from 'radiks/lib/model';

export default class Dare extends Model {
  static className = 'Dare';

  static schema = {
    title: {
      type: String,
      decrypted: true,
    },
    description: {
      type: String,
      decrypted: true,
    },
    dateTimeStart: {
      type: Date,
      decrypted: true,
    },
    dateTimeEnd: {
      type: Date,
      decrypted: true,
    },
    createdBy: {
      type: String,
      decrypted: true,
    },
  };

}
