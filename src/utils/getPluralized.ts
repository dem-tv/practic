import type { WordForms } from '@/types/pluralized.types';

export function getPluralized(number: number, wordForms: WordForms): string {
  const num = Math.abs(number) % 100;

  if (num > 10 && num < 20) {
    return `${number} ${wordForms.five}`;
  }

  if (num % 10 === 1) {
    return `${number} ${wordForms.one}`;
  }

  if (num % 10 >= 2 && num % 10 <= 4) {
    return `${number} ${wordForms.two}`;
  }

  return `${number} ${wordForms.five}`;
}
