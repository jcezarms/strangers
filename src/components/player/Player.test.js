import { render } from '@testing-library/react';
import Player from './Player';

test('local audio file rendering throws no exception', () => {
  expect(() => {
    render(<Player url="../../../assets/audio/0_raw/1 - Dorinha - Da casa de praia ao terreno maior.ogg" />);
  }).rejects.not.toThrow();
});
