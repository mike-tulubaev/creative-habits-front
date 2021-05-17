import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const MAP_STATES: AnimationTriggerMetadata = trigger('mapState', [
  state(
    'intro',
    style({
      opacity: '1',
      transform: ' translateX(380px)',
      height: '100vh',
      right: '50%',
    })
  ),
  state(
    'main',
    style({
      opacity: '0.2',
      transform: ' none',
      height: '100%',
      right: '0',
    })
  ),
  transition('intro <=> main', [animate('500ms ease-in-out')]),
]);
