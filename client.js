// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface} from 'react-360-web';

const CustomRaycaster = {
	drawsCursor: () => true,
	fillDirection: direction => {
	  direction[0] = 0;
	  direction[1] = 0;
	  direction[2] = -1;
	  return true;
	},
	fillOrigin: origin => {
	  origin[0] = 0;
	  origin[1] = 0;
	  origin[2] = 0;
	  return true;
	},
	getMaxLength: () => Infinity,
	getType: () => "simple",
	hasAbsoluteCoordinates: () => false
};

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    cursorVisibility: "visible",
    assetRoot: '/',
    ...options,
  });

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('Othello_VR', { /* initial props */ }),
    r360.getDefaultSurface()
  );

  const boardSurface = new Surface(
    600,
    600,
    Surface.SurfaceShape.Flat
  );
  
  boardSurface.setAngle(
    0,
    -Math.PI / 6
  );

  r360.renderToSurface(
    r360.createRoot('Panel'),
    boardSurface,
  )

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
  r360.controls.clearRaycasters();
  r360.controls.addRaycaster(CustomRaycaster);
}

window.React360 = {init};
