import { Interpreter } from '../../src/interpreter/interpreter';
import { Token } from '../../src/tokens';
import { TokenType } from '../../src/token-types';
import { strict as assert } from 'node:assert';

describe('interpreter', () => {
  describe('run', () => {
    let interpreter: Interpreter;

    beforeEach(() => {
      interpreter = new Interpreter();
    });

    it('runs the empty program', () => {
      const input: Token[] = [];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
    });

    describe('right shift', () => {
      it('runs an empty right shift instruction', () => {
        const input: Token[] = [
          { type: TokenType.RightShift, count: 0 },
        ];

        const runner = interpreter.run(input);
        const result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.pointer, 0);
        assert.strictEqual(interpreter.memory[0], 0);
      });

      it('runs a single right shift instruction', () => {
        const input: Token[] = [
          { type: TokenType.RightShift, count: 1 },
        ];

        const runner = interpreter.run(input);
        let result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.pointer, 1);
        assert.strictEqual(result.value.memory[1], 0);

        result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.pointer, 1);
        assert.strictEqual(interpreter.memory[1], 0);
      });

      it('runs multiple right shift instructions', () => {
        const input: Token[] = [
          { type: TokenType.RightShift, count: 3 },
        ];

        const runner = interpreter.run(input);
        let result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.pointer, 1);
        assert.strictEqual(result.value.memory[1], 0);

        result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.pointer, 2);
        assert.strictEqual(result.value.memory[2], 0);

        result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.pointer, 3);
        assert.strictEqual(result.value.memory[3], 0);

        result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.pointer, 3);
        assert.strictEqual(interpreter.memory[3], 0);
      });
    });

    describe('left shift', () => {
      beforeEach(() => {
        interpreter.memory = new Array(51);
        interpreter.pointer = 50;
      });

      it('runs an empty left shift instruction', () => {
        const input: Token[] = [
          { type: TokenType.LeftShift, count: 0 },
        ];

        const runner = interpreter.run(input);
        const result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.pointer, 50);
        assert.strictEqual(interpreter.memory[50], undefined);
      });

      it('runs a single left shift instruction', () => {
        const input: Token[] = [
          { type: TokenType.LeftShift, count: 1 },
        ];

        const runner = interpreter.run(input);
        let result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.pointer, 49);
        assert.strictEqual(result.value.memory[49], 0);

        result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.pointer, 49);
        assert.strictEqual(interpreter.memory[49], 0);
      });

      it('runs multiple left shift instructions', () => {
        const input: Token[] = [
          { type: TokenType.LeftShift, count: 3 },
        ];

        const runner = interpreter.run(input);
        let result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.pointer, 49);
        assert.strictEqual(result.value.memory[49], 0);

        result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.pointer, 48);
        assert.strictEqual(result.value.memory[48], 0);

        result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.pointer, 47);
        assert.strictEqual(result.value.memory[47], 0);

        result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.pointer, 47);
        assert.strictEqual(interpreter.memory[47], 0);
      });

      it('runs a single left shift instruction with the pointer at the left-most position'
        // behaviour when a left shift instruction is encoutered
        // when pointer === 0 is undefined
      );
    });

    describe('increment', () => {
      it('runs an empty increment instruction', () => {
        const input: Token[] = [
          { type: TokenType.Increment, count: 0 },
        ];

        const runner = interpreter.run(input);
        const result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.memory[0], 0);
      });

      it('runs a single increment instruction', () => {
        const input: Token[] = [
          { type: TokenType.Increment, count: 1 },
        ];

        const runner = interpreter.run(input);
        let result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.memory[0], 1);

        result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.memory[0], 1);
      });

      it('runs multiple increment instructions', () => {
        const input: Token[] = [
          { type: TokenType.Increment, count: 3 },
        ];

        const runner = interpreter.run(input);
        let result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.memory[0], 1);

        result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.memory[0], 2);

        result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.memory[0], 3);

        result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.memory[0], 3);
      });

      it('overflows the cell when incrementing past the max', () => {
        const input: Token[] = [
          { type: TokenType.Increment, count: 1 },
        ];
        interpreter.memory[0] = 255;

        const runner = interpreter.run(input);
        const result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.memory[0], 0);
      });
    });

    describe('decrement', () => {
      it('runs an empty decrement instruction', () => {
        const input: Token[] = [
          { type: TokenType.Decrement, count: 0 },
        ];
        interpreter.memory[0] = 50;

        const runner = interpreter.run(input);
        const result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.memory[0], 50);
      });

      it('runs a single decrement instruction', () => {
        const input: Token[] = [
          { type: TokenType.Decrement, count: 1 },
        ];
        interpreter.memory[0] = 50;

        const runner = interpreter.run(input);
        let result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.memory[0], 49);

        result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.memory[0], 49);
      });

      it('runs multiple decrement instructions', () => {
        const input: Token[] = [
          { type: TokenType.Decrement, count: 3 },
        ];
        interpreter.memory[0] = 50;

        const runner = interpreter.run(input);
        let result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.memory[0], 49);

        result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.memory[0], 48);

        result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(result.value.memory[0], 47);

        result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.memory[0], 47);
      });

      it('underflows the cell when decrementing from 0', () => {
        const input: Token[] = [
          { type: TokenType.Decrement, count: 1 },
        ];
        interpreter.memory[0] = 0;

        const runner = interpreter.run(input);
        const result = runner.next();

        assert.strictEqual(result.done, false);
        assert.strictEqual(interpreter.memory[0], 255);
      });
    });

    describe('loop', () => {
      it('runs a single empty loop instruction', () => {
        const input: Token[] = [
          { type: TokenType.Loop, content: [] },
        ];

        const runner = interpreter.run(input);
        const result = runner.next();

        assert.strictEqual(result.done, true);
        assert.strictEqual(interpreter.memory[0], 0);
      });

      it('runs a single-level loop instruction', () => {
        // +++[->+<]
        const input: Token[] = [
          { type: TokenType.Increment, count: 3 },
          { type: TokenType.Loop, content: [
            { type: TokenType.Decrement, count: 1 },
            { type: TokenType.RightShift, count: 1 },
            { type: TokenType.Increment, count: 1 },
            { type: TokenType.LeftShift, count: 1 },
          ] },
        ];

        const runner = interpreter.run(input);
        let result;

        [
          [0, [1]],
          [0, [2]],
          [0, [3]],
          [0, [2]],
          [1, [2, 0]],
          [1, [2, 1]],
          [0, [2, 1]],
          [0, [1, 1]],
          [1, [1, 1]],
          [1, [1, 2]],
          [0, [1, 2]],
          [0, [0, 2]],
          [1, [0, 2]],
          [1, [0, 3]],
          [0, [0, 3]],
        ].forEach(([expectedPointer, expectedMemory], index) => {
          result = runner.next();

          assert.strictEqual(result.done, false);
          assert.strictEqual(result.value.pointer, expectedPointer);
          assert.deepStrictEqual(result.value.memory, expectedMemory);
        });

        result = runner.next();

        assert.strictEqual(result.done, true);
        assert.deepStrictEqual(interpreter.memory, [0, 3]);
      });

      it('runs a nested loop instruction', () => {
        // Generates value 16 in cell 7
        // >+[>-[-<]>>]>
        const input: Token[] = [
          { type: TokenType.RightShift, count: 1 },
          { type: TokenType.Increment, count: 1 },
          { type: TokenType.Loop, content: [
            { type: TokenType.RightShift, count: 1 },
            { type: TokenType.Decrement, count: 1 },
            { type: TokenType.Loop, content: [
              { type: TokenType.Decrement, count: 1 },
              { type: TokenType.LeftShift, count: 1 },
            ] },
            { type: TokenType.RightShift, count: 1 },
            { type: TokenType.RightShift, count: 1 },
          ] },
          { type: TokenType.RightShift, count: 1 },
        ];

        const runner = interpreter.run(input);

        // Instead of asserting every intermediate step,
        // assert the number of steps and final result and assume
        // the intermediate steps are correct.
        let stepCount = 0;
        for (; !runner.next().done; stepCount++) {
          runner.next();
        }

        assert.strictEqual(stepCount, 2542); // loops by themselves don't contribute towards step count
        assert.strictEqual(interpreter.pointer, 7);
        assert.strictEqual(interpreter.memory[7], 16);
      });
    });
  });
});
