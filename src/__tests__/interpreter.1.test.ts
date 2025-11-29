import { createInterpreter } from '@bemedev/app-solid';
import { createTests } from '../interpreterTest';
import { DELAY, machine1 } from './fixtures';

vi.useFakeTimers();

describe('machine1', async () => {
  describe('#01 => Simple', () => {
    const _inter = createInterpreter({
      machine: machine1,
      options: {
        pContext: { iterator: 0 },
        context: { iterator: 0 },
        exact: true,
      },
    });
    const inter = createTests(vi, _inter);

    const wait = inter.createFakeWaiter.withDefaultDelay(DELAY);
    const iterator = inter.testBy(({ context }) =>
      context(s => s.iterator),
    );
    const testValue = inter.testBy(({ value }) => value());

    it(...inter.start);
    it(...testValue('Initial value', 'idle'));
    it('#01.b => is not a UI service', () => {
      expect(inter.__isUsedUi).toBe(false);
    });
    it(...iterator('iterator', 0));
    it(...wait(1));
    it(...iterator('iterator', 1));
    it(...wait(1));
    it(...iterator('iterator', 2));
    it(...wait(1));
    it(...iterator('iterator', 3));
    it(...wait(10));
    it(...iterator('iterator', 13));
    it(...inter.send('NEXT'));
    it(...testValue('Value is now at "final"', 'final'));
    it(...iterator('iterator', 13));
    it(...wait(1000));
    it(...iterator('iterator', 13));
    it(...inter.stop);
    it('#17 => dispose symbol', _inter[Symbol.dispose]);
  });

  describe('#02 => With provideOptions', () => {
    const inter = createTests(
      vi,
      createInterpreter({
        machine: machine1,
        options: {
          pContext: { iterator: 0 },
          context: { iterator: 0 },
          exact: true,
        },
      }),
    ).provideOptions(({ assign }) => ({
      actions: {
        inc: assign(
          'context.iterator',
          ({ context: { iterator } }) => iterator! + 2,
        ),
      },
    }));

    const wait = inter.createFakeWaiter.withDefaultDelay(DELAY);
    const wait2 = inter.createFakeWaiter.all(DELAY);

    const iterator = inter.testBy(({ context }) =>
      context(s => s.iterator),
    );
    const testValue = inter.testBy(({ value }) => value());

    it(...inter.start);
    it(...testValue('Initial value', 'idle'));
    it('#01.b => is not a UI service', () => {
      expect(inter.__isUsedUi).toBe(false);
    });
    it.fails(...inter.hasTags());
    it(...iterator('iterator', 0));
    it(...wait(1));
    it(...iterator('iterator', 2));
    it(...wait2);
    it(...iterator('iterator', 4));
    it(...wait(1));
    it(...iterator('iterator', 6));
    it(...wait(10));
    it(...iterator('iterator', 26));
    it(...inter.send('NEXT'));
    it(...testValue('Value is now at "final"', 'final'));
    it(...iterator('iterator', 26));
    it(...wait(1000));
    it(...iterator('iterator', 26));
    it(...inter.stop);
    it('#18 => Typings', () => {
      expect(inter.__service).toBeUndefined();
    });
  });

  describe('#03 => Real timers', () => {
    beforeAll(() => {
      vi.useRealTimers();
    });
    const inter = createTests(
      vi,
      createInterpreter({
        machine: machine1,
        options: {
          pContext: { iterator: 0 },
          context: { iterator: 0 },
          exact: true,
        },
      }),
    );

    const wait = inter.createFakeWaiter.withDefaultDelay(DELAY);
    const iterator = inter.testBy(({ context }) =>
      context(s => s.iterator),
    );
    const testValue = inter.testBy(({ value }) => value());

    it(...inter.start);
    it(...testValue('Initial value', 'idle'));
    it('#01.b => is not a UI service', () => {
      expect(inter.__isUsedUi).toBe(false);
    });
    it(...iterator('iterator', 0));
    it(...wait(1));
    it(...iterator('iterator', 1));
    it(...wait(1));
    it(...iterator('iterator', 2));
    it(...wait(1));
    it(...iterator('iterator', 3));
    it(...inter.stop);
  });
});
