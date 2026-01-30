<script lang="ts">
  import type { Snippet } from 'svelte';

  export interface TabDescriptor {
    id: string;
    title: string;
  }

  export interface Props {
    tabs: TabDescriptor[],
    activeTabId: string;
    onChange: (string) => void
  }

  let {
    tabs = [],
    activeTabId = '',
    onChange = () => {},
  }: Props = $props();
</script>

<ul>
{#each tabs as { id, title } (id)}
  <li><button onclick={() => onChange(id)}>{title}</button></li>
{/each}
</ul>
