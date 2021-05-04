import React from 'react';
import posed, {PoseGroup} from 'react-pose';

export default function ManualSwitcher(props) {
  const {visibleIndex, className, children} = props;
  return (
    <PoseGroup animateOnMount className={className}>
      {children[visibleIndex]}
    </PoseGroup>
  );
}
