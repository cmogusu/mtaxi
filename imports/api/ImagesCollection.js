import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const ImagesCollection = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false,
  storagePage: '/home/clive/www/websites/i/meteor/',
  // downloadRoute: '/files/images',
  onBeforeUpload(file) {
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }

    console.log('this should be called', file);
    return 'Please upload image, with size equal or less than 10MB';
  },
});


if (Meteor.isSearver) {
  Meteor.publish('Images', () => ImagesCollection.find());
}

if (Meteor.isClient) {
  Meteor.subscribe('Images');
}


Meteor.methods({
  // 'images.add'() {}
  'images.remove'(id) {
    check(vehicle, Object);
    forEach(vehicle, vehicleProp => check(vehicleProp, String));

    if (!this.userId) {
      throw new Meteor.Error('no way in looser!');
    }

    const obj = {
      ...vehicle,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    };

    // console.log(obj);
    ImagesCollection.find();
  },
});


export default ImagesCollection;
