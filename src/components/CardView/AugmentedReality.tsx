import React, {useEffect} from 'react';
import * as d3 from 'd3-selection';
import Frame from 'react-frame-component';
import markerPin from './marker-pin.jpg';
import {ModalBody} from '~/components/utils/Modal';
import {Card} from '~/constants/cardFields';
import marker from './map-marker.png';
// import useScript from '~/components/utils/useScript';

const AR: React.FC<any> = props => {
  const {cards} = props;
  console.log('ueaj');
  const ref = React.useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const Scene = d3
  //     .select(ref.current)
  //     .append('a-scene')
  //     .attr('id', 'ascene')
  //     .attr('class', 'flex-grow')
  //     .attr('embedded', true);
  //
  //   Scene.append('camera')
  //     .attr('gps-camera', true)
  //     .attr('rotation-reader', true);
  //   // cont
  //   //   .append('a-marker')
  //   //   .attr('preset', 'hiro')
  //   //   .append('a-box')
  //   //   .attr('position', '0 0.5 0')
  //   //   .attr('material', 'color: yellow;');
  //
  //   const scene = Scene.node(); // document.querySelector('a-scene');
  //   scene.addEventListener('loaded', function() {
  //     cards.forEach((c: Card) => {
  //       const {latitude, longitude} = c.loc.value;
  //       console.log('latitude', latitude, 'longitude', longitude);
  //       // add c name
  //       const text = document.createElement('a-link');
  //       text.setAttribute(
  //         'gps-entity-place',
  //         `latitude: ${latitude}; longitude: ${longitude};`
  //       );
  //       text.setAttribute('title', 'est');
  //       text.setAttribute('href', 'http://www.example.com/');
  //       text.setAttribute('scale', '15 15 15');
  //
  //       text.addEventListener('loaded', () => {
  //         window.dispatchEvent(
  //           new CustomEvent('gps-entity-place-loaded')
  //         );
  //       });
  //     });
  //   });
  // console.log('scene node', scene);

  //   return () =>
  //     void d3
  //       .select(ref.current)
  //       .selectAll('*')
  //       .remove();
  // }, []);

  return <div ref={ref} />;
};

const IFrame: React.FC<any> = props => {
  const {cards} = props;

  const initContent = `<!doctype HTML>
    <html>
    <head>
      <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
      <script src="https://raw.githack.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.min.js"></script>
        <script>
            THREEx.ArToolkitContext.baseURL = 'https://raw.githack.com/jeromeetienne/ar.js/master/three.js/'
        </script>
    </head>

    <body style='margin: 0; overflow: hidden;'>
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs='sourceType: webcam; sourceWidth:1280; sourceHeight:960;
        displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;'>


            <a-camera gps-camera rotation-reader>
        </a-camera>
      </a-scene>
    </body>
    </html>`;

  const onLoad = (a: any) => {
    const cont = a.target.contentWindow.document.body;
    const asc = d3.select(cont).select('a-scene');
    asc
      .selectAll('a-box')
      .data(cards)
      .enter()
      .append('a-image')
      // .attr('color', 'yellow')
      .attr('scale', '20 20 20')
      .attr('src', marker)
      .attr('name', (d: any) => d.title?.value || null)
      .attr(
        'gps-entity-place',
        (d: any) =>
          `latitude: ${d.loc.value.latitude}; longitude: ${d.loc.value.longitude};`
      );
  };

  return (
    <iframe
      className="flex-grow"
      onLoad={onLoad}
      srcDoc={initContent}
    />
  );
};

const AugmentedRealityCont: React.FC<any> = props => {
  const {onClose} = props;

  return (
    <ModalBody
      title="AFrame in an Iframe"
      className="flex-grow flex flex-col"
      onClose={onClose}>
      <IFrame {...props} />
    </ModalBody>
  );
};
export default AugmentedRealityCont;
