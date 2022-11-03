import WbTransform from './WbTransform.js';

export default class WbSolid extends WbTransform {
  clone(customID) {
    if(!customID)customID=getAnId()
    console.error('Trying to clone a solid');
    var newSolid = new WbSolid(customID, translation, scale, rotation);
    this.useList.push(customID);
    return newSolid;
  }

  createWrenObjects() {
    super.createWrenObjects(true);

    if (typeof this.boundingObject !== 'undefined')
      this.boundingObject.createWrenObjects();
  }

  delete(isBoundingObject) {
    if (typeof this.boundingObject !== 'undefined')
      this.boundingObject.delete(true);

    super.delete(isBoundingObject);
  }

  preFinalize() {
    super.preFinalize();

    if (typeof this.boundingObject !== 'undefined')
      this.boundingObject.preFinalize();
  }

  postFinalize() {
    super.postFinalize();

    if (typeof this.boundingObject !== 'undefined')
      this.boundingObject.postFinalize();
  }

  updateBoundingObjectVisibility() {
    super.updateBoundingObjectVisibility();

    if (typeof this.boundingObject !== 'undefined')
      this.boundingObject.updateBoundingObjectVisibility();
  }
}
