<script lang="ts">
	import TabBar, { type TabDescriptor } from "$lib/TabBar.svelte";
	import ConvertPage from "$lib/pages/ConvertPage.svelte";
	import FormatPage from "$lib/pages/FormatPage.svelte";

	let activeTabId = $state('convert');

	const tabs: TabDescriptor[] = [
		{
			id: 'convert',
			title: 'Convert',
		},
		{
			id: 'format',
			title: 'Format',
		},
	];

	function onTabChange(tabId: string): void {
		activeTabId = tabId;
	}
</script>

<h1>awafudge</h1>

<TabBar {tabs} {activeTabId} onChange={onTabChange} />
{#if activeTabId === 'convert'}
	<ConvertPage />
{:else if activeTabId === 'format'}
	<FormatPage />
{/if}
