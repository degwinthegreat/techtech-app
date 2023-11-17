<script>
  import { signIn, signOut } from '@auth/sveltekit/client'
  import { page } from '$app/stores'
</script>

{#if $page.data.session?.user}
  <button class="btn variant-filled-error" on:click={signOut}>ログアウト</button>
{:else}
  <!-- <h2 class="h1 text-center">パスワードでログイン</h2>
  <div class="logo-cloud bg-initial grid-cols-1 lg:!grid-cols-1 gap-1">
    <a class="logo-item" href="/#">
      <span><i class="fa-solid fa-key"></i></span>
      <span>パスワード</span>
    </a>
  </div> -->
  <h2 class="h1 text-center">SNSでログイン</h2>
  <div class="logo-cloud bg-initial grid-cols-1 lg:!grid-cols-1 gap-1">
    <button class="logo-item" on:click={() => signIn('github', { callbackUrl: '/users' })}>
      <span><i class="fa-brands fa-github"></i></span>
      <span>GitHub</span>
    </button>
    <!-- <button class="logo-item" on:click={() => signIn('slack', { callbackUrl: '/users' })}>
      <span><i class="fa-brands fa-slack"></i></span>
      <span>Slack</span>
    </button> -->
  </div>
{/if}
