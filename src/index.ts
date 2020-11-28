import * as PIXI from 'pixi.js';
import { canBreakChars } from './KinsokuShori';

PIXI.TextMetrics.canBreakChars = canBreakChars;
