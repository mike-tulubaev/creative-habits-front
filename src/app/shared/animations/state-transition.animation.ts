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
      opacity: '0.6',
      transform: ' translateX(-50%)',
      height: '100%',
      left: '50%',
      filter: 'blur(55px)',
    })
  ),
  state(
    'main',
    style({
      opacity: '1',
      transform: ' translateX(-50%)',
      height: '100%',
      left: '50%',
      filter: 'none',
    })
  ),
  transition('intro <=> main', [animate('500ms ease-in-out')]),
]);
