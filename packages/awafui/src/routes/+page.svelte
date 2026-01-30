<script lang="ts">
	import TabBar, { type TabDescriptor } from "$lib/TabBar.svelte";
	import ConvertPage from "$lib/pages/ConvertPage.svelte";

	let activeTabId = $state('convert');

	const tabs: TabDescriptor[] = [
		{
			id: 'convert',
			title: 'Convert',
		}
	];

	function onTabChange(tabId: string): void {
		activeTabId = tabId;
	}
</script>

<h1>awafudge</h1>

<TabBar {tabs} {activeTabId} onChange={onTabChange} />
{#if activeTabId === 'convert'}
	<ConvertPage />
{/if}
