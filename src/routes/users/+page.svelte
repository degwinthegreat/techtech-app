<script lang="ts">
import { Avatar } from '@skeletonlabs/skeleton';
import noImage from '$lib/images/noImage.jpg'
export let data
const users = data.users
</script>

<div class="overflow-hidden shadow rounded-lg">
  <div class="px-4 py-5 sm:px-6">
    {#each users as { id, name, image}}
      <a href={'/users/' + id } class="h-auto max-w-full flex flex-column items-center px-4 py-5 sm:px-6">
        {#if image}
          {#if image.startsWith("https://")}
            <Avatar src={image} width="w-12" />
          {:else}
            <Avatar src={'https://pub-02e9c1cb43104a24af96fae27d2066ba.r2.dev/' + user.image} width="w-12" />
          {/if}
        {:else}
          <Avatar src={noImage} width="w-12" />
        {/if}
        <span class="px-4">{name}</span>
      </a>
    {/each}
  </div>
</div>
