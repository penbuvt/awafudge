<script lang="typescript">
	import {
		AwafudgeParser,
		AwafudgeFormatter,
		BrainfuckParser,
		BrainfuckFormatter,
	} from "awafudge";

	let input = $state('');
	let output = $state('');

	function transpileToBrainfuck() {
		const parser = new AwafudgeParser();
		const ast = parser.parse(input);
		const formatted = BrainfuckFormatter.format(ast);
		output = formatted;
	}

	function transpileToAwafudge() {
		const parser = new BrainfuckParser();
		const ast = parser.parse(input);
		const formatted = AwafudgeFormatter.format(ast);
		output = formatted;
	}
</script>

<div class="actions">
  <button onclick={transpileToBrainfuck}>To brainfuck</button>
  <button onclick={transpileToAwafudge}>To awafudge</button>
</div>

<div class="input">
  <textarea bind:value={input} rows={4} cols={80}></textarea>
</div>

<div class="output">
  <textarea bind:value={output} readonly rows={4} cols={80}></textarea>
</div>
