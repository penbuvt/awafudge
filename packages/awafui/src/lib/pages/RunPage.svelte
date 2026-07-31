<script lang="typescript">
	import { tick } from "svelte";
	import { AwafudgeParser, Interpreter } from "awafudge";
	import MemoryView from "$lib/MemoryView.svelte";

	let input = $state('');
	let output = $state('');
	let interpreter;
	let runner;

  async function run() {
		const parser = new AwafudgeParser();
		const ast = parser.parse(input);

		interpreter = new Interpreter();

		runner = interpreter.run(ast);

		let step;
		do {
			step = runner.next();
			if (!step.done) {
				output = step.value;
			}
			await new Promise((resolve) => setTimeout(resolve, 300));
		} while (!step.done);
  }

	function stop() {
		runner?.return();
	}
</script>

<div class="actions">
  <button onclick={run}>Run</button>
  <button onclick={stop}>Stop</button>
</div>

<div class="input">
  <textarea bind:value={input} rows={4} cols={80}></textarea>
</div>

<MemoryView {...output} />
