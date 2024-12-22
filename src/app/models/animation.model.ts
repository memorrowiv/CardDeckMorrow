import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';

// Interface for animation triggers. Not currently being utilized but wanted to provide structure to build off
// if we add more complex animations
export interface AnimationConfig {
  triggerName: string;
  states: { [key: string]: any }; // A map for states
  transitions: { [key: string]: any }; // A map for transitions
}

export function createDealCardAnimation(): AnimationTriggerMetadata {
  return trigger('dealCard', [
    state('initial', style({ opacity: 0, transform: 'scale(0)' })),
    state('final', style({ opacity: 1, transform: 'scale(1)' })),
    transition('initial => final', [animate('0.5s ease-out')]),
  ]);
}

export function createFlipCardAnimation(): AnimationTriggerMetadata {
  return trigger('flipCard', [
    state('flipped', style({ transform: 'rotateY(180deg)' })),
    state('unflipped', style({ transform: 'rotateY(0deg)' })),
    transition('unflipped => flipped', [animate('0.6s ease-in-out')]),
    transition('flipped => unflipped', [animate('0.6s ease-in-out')]),
  ]);
}
