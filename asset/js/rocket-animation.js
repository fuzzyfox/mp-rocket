/* global Snap, mina */
'use strict';

function smokeGenerator( x, y ) {
  // jitter the input a little
  x = x + ( ( Math.random() * 100 ) - 50 );
  y = y + ( ( Math.random() * 200 ) - 50 );

  var size = Math.random() * 60;
  var fadeDuration = ( Math.random() * 1500 ) + 400;

  var smokeCircle = new Snap( '#smoke' ).paper.circle( x, y, size ).attr({
    fill: '#ccc',
    id: 'node' + (new Date()).valueOf()
  });
  smokeCircle.animate({
    opacity: 0
  }, fadeDuration, function() {
    this.remove();
  });

  return smokeCircle;
}

var snap = new Snap( '#rocket-animation' );

Snap.load( 'asset/svg/rocket-scene.svg', function( file ) {
  // move rocket off canvas (mostly)
  var rocketLayer = file.select( '#rocket-layer' ).transform( 'T-400 0' );
  var bunting = file.select( '#bunting' );
  var launchTower = rocketLayer.select( '#launch-tower' );
  var launchPad = rocketLayer.select( '#launch-pad' );
  var rocket = rocketLayer.select( '#rocket' );

  snap.append( file );

  function resetAnimation(){
    rocketLayer.transform( 'T-1000 0 R0 S1' );
    launchTower.transform( 'T0 0 R0 S1' );
    launchPad.transform( 'T0 0 R0 S1' );
    rocket.transform( 'T0 0 R0 S1' );
    bunting.animate({
      transform: 'T0 0 R0 S1'
    }, 700);
    rocketLayer.animate({
      transform: 'T-400 0 R0 S1'
    }, 5000);
  }

  (function loop() {
    // rocket into launch position
    rocketLayer.animate( {
      transform: 'T0 0'
    }, 5000, mina.easeout, function() {
      // rocket take off smoke
      var smokeTakeOffInterval = setInterval( function() {
        rocket.append( smokeGenerator( 350, 500 ) );
      }, 10 );
      setTimeout( function() {
        // tower fall away
        launchTower.animate( {
          transform: 'T-50 100 R-40 500 500 S0.5'
        }, 1000 , mina.ease, function() {
          // launchTower = this.remove();
        });

        // perception of rocket moving away from ground
        launchPad.animate({
          transform: 'T-200 0 S0.7'
        }, 2000 );

        // rocket lift off
        rocket.animate({
          transform: 'T50 0 R60 S0.7'
        }, 2000, mina.ease, function() {

          // ground disappear
          launchPad.animate({
            transform: 'T-500 0 S0.2'
          }, 500, function() {
            // launchPad = this.remove();
            clearInterval( smokeTakeOffInterval );
          });

          // rocket fly across screen
          var smokeFlyByInterval = setInterval( function() {
            rocket.append( smokeGenerator( 350, 500 ) );
            rocket.append( smokeGenerator( 350, 600 ) );
          }, 50 );
          rocket.animate({
            transform: 'T700 -550 R60 S0.2'
          }, 2000, function() {
            setTimeout( function() {
              rocket.transform( 'T-500 -200 R90 S0.7' ).animate({
                transform: 'T2000 -100 R90 S1.4'
              }, 1000, function() {
                clearInterval( smokeFlyByInterval );
                // rocket = this.remove();

                setTimeout( resetAnimation, 1000 );
                setTimeout( loop, 10000 );
              });
            }, 1200 );
          });

          // make ground fall away
          bunting.animate({
            transform: 'T0 50'
          }, 2000, function() {
            // bunting = this.remove();
          });
        });
      }, 1000 );
    });
  }());
});