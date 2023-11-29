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
    <button class="logo-item" on:click={() => signIn('google', { callbackUrl: '/users' })}>
      <span><i class="fa-brands fa-google"></i></span>
      <span>Google</span>
    </button>
    <!-- <button class="logo-item" on:click={() => signIn('facebook', { callbackUrl: '/users' })}>
      <span><i class="fa-brands fa-facebook"></i></span>
      <span>Facebook</span>
    </button> -->
  </div>
  <aside class="alert variant-filled-warning">
    <div><i class="fas fa-exclamation-triangle"></i></div>
    <div class="alert-message">
        <h3 class="h3">認証に関する注意事項</h3>
        <p>
          ２回目のログインをする場合は、最初に認証したサービスと同じサービスを選択してください。<br />
          もし、別のサービスでログインした場合、最初にログインしたサービスと同じメールアドレスを登録していたらエラーになります。
          エラーが発生したら最初にログインしたサービスでログインし直してください。<br />
          別のサービスが、最初にログインしたサービスと別のメールアドレスを登録していた場合は、新規作成扱いになり、別のアカウントが作成されます。<br />
          困っちゃうので、よろです！
        </p>
    </div>
  </aside>
{/if}
