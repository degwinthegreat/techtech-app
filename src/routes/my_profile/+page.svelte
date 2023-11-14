<script lang="ts">
  // import { InputChip } from "@skeletonlabs/skeleton";
  import { signOut } from '@auth/sveltekit/client'
</script>

<div class="overflow-hidden shadow rounded-lg">
  <div class="px-4 py-5 sm:px-6">
    <label class="label px-4 py-5 sm:px-6">
      <span>📸プロフィール画像</span>
      	<div>
          <!-- <img class="h-auto max-w-full rounded-lg" src={tamamushiIcon} alt=""> -->
        </div>
      <input class="input" type="file" />
    </label>
    <hr />
    <label class="label px-4 py-5 sm:px-6">
      <span>💳表示名</span>
      <input class="input" type="text" placeholder="表示名" value="Kawaida" />
    </label>
    <hr />
    <label class="labe px-4 py-5 sm:px-6">
      <span>✏️自己紹介</span>
      <textarea class="textarea" rows="4" placeholder="自己紹介を入力してください." value="高知に移住してきました！" />
    </label>
    <hr />
    <!-- <label class="label px-4 py-5 sm:px-6">
      <span>🔖タグ</span>
      <InputChip bind:value={list} name="tags" transitions={true} placeholder="..." readonly={true}/>
    </label> -->
    <button class="btn variant-filled-error" on:click={signOut}>ログアウト</button>
  </div>
</div>
