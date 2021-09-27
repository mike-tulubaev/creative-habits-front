import {
  animate,
  animateChild,
  AnimationTriggerMetadata,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const WAIT_CHILD_ANIMATION: AnimationTriggerMetadata = trigger(
  'waitChildAnimation',
  [
    transition(':enter', [query('@*', animateChild())]),
    transition(':leave', [query('@*', animateChild())]),
  ]
);

export const SLIDE_FROM_LEFT: AnimationTriggerMetadata = trigger(
  'slideFromLeft',
  [
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate('0.5s ease-out', style({ transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0)' }),
      animate('0.5s ease-in', style({ transform: 'translateX(-100%)' })),
    ]),
  ]
);

export const SLIDE_APPEARENCE: AnimationTriggerMetadata = trigger(
  'slideAppearence',
  [
    transition(':enter', [
      style({ opacity: 0, height: 0, overflow: 'hidden' }),
      animate('0.25s 0.3s', style({ opacity: 1, height: '*' })),
    ]),
    transition(':leave', [
      style({ opacity: 1, height: '*', overflow: 'hidden' }),
      animate('0.25s', style({ opacity: 0, height: 0 })),
    ]),
  ]
);

export const FADE_IN_OUT: AnimationTriggerMetadata = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(500, style({ opacity: 1 })),
  ]),
  transition(':leave', [animate(500, style({ opacity: 0 }))]),
]);

export const APPEARENCE_DELAY_500: AnimationTriggerMetadata = trigger(
  'appearenceDelay500',
  [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0ms 500ms', style({ opacity: 0 })),
    ]),
    transition(':leave', [
      style({ opacity: 0 }),
      animate('0ms', style({ opacity: 0 })),
    ]),
  ]
);

export const FADE_APPEARENCE_DELAY_500: AnimationTriggerMetadata = trigger(
  'fadeAppearenceDelay500',
  [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('500ms 500ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 0 }),
      animate('0ms', style({ opacity: 0 })),
    ]),
  ]
);

export const FADE_HABITS: AnimationTriggerMetadata = trigger('fadeHabits', [
  transition(':leave', [animate('250ms', style({ opacity: 0 }))]),
  transition(':enter', [
    style({ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%' }),
    animate('250ms 125ms', style({ opacity: 1 })),
  ]),
]);

export const FADE_HABIT_LIST: AnimationTriggerMetadata = trigger(
  'fadeHabitList',
  [
    transition(':enter', [
      style({
        position: 'static',
        opacity: 0,
      }),
      animate('0.25s ease', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ position: 'absolute', opacity: 1 }),
      animate('0.25s 0.027s ease', style({ opacity: 0 })),
    ]),
  ]
);
export const FADE_HABIT_VIEW: AnimationTriggerMetadata = trigger(
  'fadeHabitView',
  [
    transition(':enter', [
      style({ transform: 'translateY(100%)' }),
      animate('0.5s', style({ transform: 'translateY(0)' })),
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0)' }),
      animate('0.5s', style({ transform: 'translateY(-100%)' })),
    ]),
  ]
);
