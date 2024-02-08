import type { pt_BR as strings } from './src/resources/i18n/pt_BR';
import { type } from '@types/dom-speech-recognition';

declare global {
  type AppStrings = typeof strings;
  type SpeechRecognition = type;
}

export {};
