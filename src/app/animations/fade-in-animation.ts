/**
 * Class that contains the code for the fade in animation
 */

/**
 * Libraires
 */
import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
    trigger('fadeInAnimation', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('.3s', style({ opacity: 1 }))
        ])
    ]);
