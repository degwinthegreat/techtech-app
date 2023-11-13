<script lang="ts">
  // import { InputChip } from "@skeletonlabs/skeleton";?
  // let list: string[] = ['現役エンジニア', 'Ruby on Rails', '高知移住組'];
  export let data
  const user = data.user[0]
</script>

<div class="overflow-hidden shadow rounded-lg">
  <div class="px-4 py-5 sm:px-6">
    <label for="image" class="label px-4 py-5 sm:px-6">
      <span>📸プロフィール画像</span>
      	<div>
          <img class="h-auto max-w-full rounded-lg" src={user.image} alt="">
          <!-- <img class="h-auto max-w-full rounded-lg" src={tamamushiIcon} alt=""> -->
        </div>
      <input id="image" class="input" type="file" />
    </label>
    <hr />
    <label for="name" class="label px-4 py-5 sm:px-6">
      <span>💳表示名</span>
      <input id="name" class="input" type="text" placeholder="表示名" readonly={true} value={user.name} />
    </label>
    <hr />
    <label for="description" class="labe px-4 py-5 sm:px-6">
      <span>✏️自己紹介</span>
      <textarea id="description" class="textarea" rows="4" placeholder="自己紹介を入力してください." readonly={true} value="{user.description}" />
    </label>
    <hr />
    <!-- TODO -->
    <!-- <label class="label px-4 py-5 sm:px-6">
      <span>🔖タグ</span>
      <InputChip bind:value={list} name="tags" transitions={true} placeholder="..." readonly={true}/>
    </label> -->
  </div>
</div>
