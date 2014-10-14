console.log("phaser-ext.js");

Phaser.Tween.prototype.onChainComplete = function (func, context) {
    this._lastChild.onComplete.add(func, context);
}