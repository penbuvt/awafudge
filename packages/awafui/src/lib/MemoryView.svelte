<script lang="ts">
  let { memory, pointer } = $props();
</script>

<table class="memory-view">
  <thead>
    <tr>
      {#each memory as cellValue, index}
        <th class={{ current: index === pointer }}>{index}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    <tr>
      {#each memory as cellValue, index}
        <td class={{ current: index === pointer }}>{cellValue}</td>
      {/each}
    </tr>
  </tbody>
</table>

<style>
  .memory-view {
    border: 1px outset black;
    background-color: #4b5fa8;
  }

  th, td {
    box-sizing: content-box;
    width: 3ch;
    border: 1px inset black;
    padding: 0.5ex;
    background-color: white;
    text-align: right;
  }

  .current {
    background: #fcf9ac;
    font-weight: bold;
  }
</style>
