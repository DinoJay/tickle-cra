import React, {
  Component,
  useImperativeHandle,
  useRef,
  useEffect
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import smoothscroll from 'smoothscroll-polyfill';
// import scrollIntoView from 'scroll-into-view';
// window.__forceSmoothScrollPolyfill__ = true;
// kick off the polyfill!
smoothscroll.polyfill();

// import scrollIntoView from 'scroll-into-view-if-needed';

const {Provider, Consumer} = React.createContext({
  register: null,
  unregister: null
});

const ScrollView = React.forwardRef((props, ref) => {
  const {children, boundary, onScrollEnd = d => d} = props;
  const elements = {};

  const register = (name, ref) => {
    elements[name] = ref;
    return ref;
  };

  const unregister = name => {
    delete elements[name];
  };

  const childRef = useRef();

  useImperativeHandle(ref, () => ({
    scrollTo(name, opts = {}) {
      const elem = elements[name];
      if (!elem || !elem.current) return;

      const node = ReactDOM.findDOMNode(elem.current);
      // const cont = document.getElementById('content-container');
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'end',
        ...opts
      });
      // scrollIntoView(node, {
      //   behavior: 'smooth',
      //   inline: 'right',
      //   // scrollMode: 'if-needed',
      //   boundary: boundary ? boundary.current : cont,
      //   ...opts
      // });
    }
  }));

  return (
    <Provider value={{register, unregister}}>
      {React.cloneElement(children, {ref: childRef})}
    </Provider>
  );
});

const ScrollConsumer = React.forwardRef(
  ({register, unregister, name, children}, extRef) => {
    const ref = extRef || React.useRef();
    // console.log('ref current', ref);

    useEffect(
      () =>
        // TODO
        // ref.current = register(name, ref);
        unregister
    );

    return React.cloneElement(children, {ref});
  }
);

const ScrollElement = React.forwardRef(({name, children}, ref) => (
  <Consumer>
    {({register, unregister}) => (
      <ScrollConsumer
        register={register}
        unregister={unregister}
        name={name}
        ref={ref}>
        {children}
      </ScrollConsumer>
    )}
  </Consumer>
));

export {ScrollView, ScrollElement};
