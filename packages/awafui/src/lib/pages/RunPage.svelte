<script lang="typescript">
	import { tick } from "svelte";
	import { AwafudgeParser, Interpreter } from "awafudge";
	import MemoryView from "$lib/MemoryView.svelte";

	let input = $state('');
	let output = $state('');

  async function run() {
		const parser = new AwafudgeParser();
		const ast = parser.parse(input);

		const interpreter = new Interpreter();

		const runner = interpreter.run(ast);

		let step;
		do {
			step = runner.next();
			if (!step.done) {
				output = step.value;
			}
			await tick();
			console.log('DEBUG step', step);
		} while (!step.done);
		
  }
</script>

<div class="actions">
  <button onclick={run}>Run</button>
</div>

<div class="input">
  <textarea bind:value={input} rows={4} cols={80}></textarea>
</div>

<MemoryView {...output} />
