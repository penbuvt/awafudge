<script lang="typescript">
	import {
		AwafudgeParser,
		AwafudgeFormatter,
	} from "awafudge";

	let input = $state('');
	let output = $state('');

	function formatAwafudge() {
		const parser = new AwafudgeParser();
		const ast = parser.parse(input);
		const formatted = AwafudgeFormatter.format(ast);
		output = formatted;
	}
</script>

<div class="actions">
  <button onclick={formatAwafudge}>Format</button>
</div>

<div class="input">
  <textarea bind:value={input} rows={4} cols={80}></textarea>
</div>

<div class="output">
  <textarea bind:value={output} readonly rows={4} cols={80}></textarea>
</div>
