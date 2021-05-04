import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import {Control} from 'mapbox-gl';
import * as PropTypes from 'prop-types';
import * as React from 'react';

const noop = () => {
  /* do nothing */
};

export default class DrawControl extends React.Component {
  static contextTypes = {
    map: PropTypes.object.isRequired
  };

  static defaultProps = {
    onDrawActionable: noop,
    onDrawCombine: noop,
    onDrawCreate: noop,
    onDrawDelete: noop,
    onDrawModeChange: noop,
    onDrawRender: noop,
    onDrawSelectionChange: noop,
    onDrawUncombine: noop,
    onDrawUpdate: noop,
    position: 'top-left'
  };

  componentWillMount() {
    const {
      modes,
      onDrawActionable,
      onDrawCombine,
      onDrawCreate,
      onDrawDelete,
      onDrawModeChange,
      onDrawRender,
      onDrawSelectionChange,
      onDrawUncombine,
      onDrawUpdate,
      position
    } = this.props;

    console.log('this context', this.context);
    // tslint:disable-next-line
    // const {map} = this.context;

    // this.draw = new MapboxDraw({
    //   ...this.props,
    //   modes: {
    //     ...MapboxDraw.modes,
    //     ...modes
    //   }
    // });
    // map.addControl(this.draw, position);
    //
    // // Hook draw events
    // map.on('draw.actionable', onDrawActionable);
    // map.on('draw.combine', onDrawCombine);
    // map.on('draw.create', onDrawCreate);
    // map.on('draw.delete', onDrawDelete);
    // map.on('draw.modechange', onDrawModeChange);
    // map.on('draw.render', onDrawRender);
    // map.on('draw.selectionchange', onDrawSelectionChange);
    // map.on('draw.uncombine', onDrawUncombine);
    // map.on('draw.update', onDrawUpdate);
  }

  componentWillUnmount() {
    // // tslint:disable-next-line
    // const {map} = this.context;
    // if (!map || !map.getStyle()) {
    //   return;
    // }
    // map.removeControl(this.draw);
  }

  render() {
    return null;
  }
}
