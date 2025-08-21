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

<h1>awafudge</h1>

<button onclick={transpileToBrainfuck}>To brainfuck</button>
<button onclick={transpileToAwafudge}>To awafudge</button>
<textarea bind:value={input}></textarea>
<textarea bind:value={output}></textarea>
