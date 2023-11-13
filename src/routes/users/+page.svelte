<script lang="ts">
import { Avatar } from '@skeletonlabs/skeleton';
export let data
const users = data.users
</script>

<div class="overflow-hidden shadow rounded-lg">
  <div class="px-4 py-5 sm:px-6">
    {#each users as { id, name, image}}
      <a href={'/users/' + id } class="h-auto max-w-full flex flex-column items-center px-4 py-5 sm:px-6">
        <Avatar src={image} width="w-12" />
        <span class="px-4">{name}</span>
      </a>
    {/each}
  </div>
</div>
