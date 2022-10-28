const webotsView = document.getElementsByTagName('webots-view')[0];
webotsView._view.animation
webotsView._view.animation._view.x3dScene
webotsView._view.animation._view.x3dScene.WbWorld

webotsView._view.animation._view.x3dScene.WbWorld.instance.robots
webotsView._view.animation._view.x3dScene.render();
webotsView._view.animation._view.animation.pause()


webotsView._view.animation._view.x3dScene.applyPose({"id":132,"translation":"0 0.0676 0","rotation":"0.0009 -1 0 0.0203"});
webotsView._view.animation._view.x3dScene.render();
webotsView._view.animation._view.x3dScene.WbWorld.instance.robots



let pose = {
      'id': nodeId,
      [field]: value
    };

let pose = {'id': "n84", "translation":"5,0,0" };

const use = WbWorld.instance.nodes.get(object.useList[length]);
this._applyPoseToObject(pose, use);

webotsView._view.animation._view.x3dScene._applyPoseToObject(pose, use)



// Moving the gantry... only works for animation....
let pose = {'id': "n84", "translation":"0,1,0" };
webotsView._view.animation._view.x3dScene._applyPoseToObject(pose, use)

// But we require to move it so as to refresh
/// check updateAnimationState for how to apply it...

... start by loading an empty world...
    The rest of the stuff are done in the mqtt

webotsView._view.animation._view.x3dScene.WbWorld.instance.tracks.forEach(track => {if (track.linearSpeed !== 0) {track.animateMesh();track.linearSpeed = 0; } });

RQ::
    Animating the motion
    Moving the camera





ORD:::
    Friday...
        1. Creating the scenes using js in quasar
        2. Making them completely serverless... We already have the farmbotSimulatorJs
        3. controlling it from the JS....

