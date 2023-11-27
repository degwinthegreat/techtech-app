<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
  import { signOut } from '@auth/sveltekit/client';
  import noImage from '$lib/images/noImage.jpg'
  export let data, form, fileName: string
  const user = data.user
  const readonly = data.readonly

  const handleFileUpload = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
      fileName = crypto.randomUUID() + '.' + file.name.split(".")[1];
			const getPresignedUrlResponse = await fetch('/api/upload', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fileName: fileName,
					fileType: file.type
				})
			});

			if (!getPresignedUrlResponse.ok) {
				console.error('Failed to get presigned URL');
			}

			const { presignedUrl } = await getPresignedUrlResponse.json();
      const uploadToR2Response = await fetch(presignedUrl, {
				method: 'PUT',
				headers: {
					'Content-Type': file.type
				},
				body: file
			});

      if (!uploadToR2Response.ok) {
        console.error('Failed to upload file to R2');
      }
		}
	};
</script>

<div class="overflow-hidden shadow rounded-lg">
  {#if form?.success}
    <aside class="alert variant-ghost">
        <div><i class="fa-solid fa-check"></i></div>
        <div class="alert-message">
            <p>更新しました！</p>
        </div>
    </aside>
  {/if}
  <div class="px-4 py-5 sm:px-6">
    <form method="POST" use:enhance={({ formData }) => {
      if (fileName) {
        formData.append('fileName', fileName)
      }
      return async ({result}) => {
        await applyAction(result)
      }
    }}>
      <label for="image" class="label px-4 py-5 sm:px-6">
        <span>📸プロフィール画像</span>
          <div>
            {#if user.image}
              {#if user.image.startsWith("https://")}
                <img class="h-auto max-w-full rounded-lg" src={user.image} alt="image">
              {:else}
                <img class="h-auto max-w-full rounded-lg" src={'https://pub-02e9c1cb43104a24af96fae27d2066ba.r2.dev/' + user.image} alt="image">
              {/if}
            {:else}
              <img class="h-auto max-w-full rounded-lg" src={noImage} alt="noimage">
            {/if}
          </div>
        <input id="image" name="image" class="input" type="file" readonly={readonly} on:change={handleFileUpload} />
      </label>
      <hr />
      <label for="name" class="label px-4 py-5 sm:px-6">
        <span>💳表示名</span>
        <input id="name" name="name" class="input" type="text" placeholder="表示名" readonly={readonly} value={user.name} />
      </label>
      <hr />
      <label for="description" class="labe px-4 py-5 sm:px-6">
        <span>✏️自己紹介</span>
        <textarea
          id="description"
          name="description"
          class="textarea"
          placeholder="自己紹介を入力してください."
          rows="10"
          readonly={readonly}
          value="{user.description}"
        />
      </label>
      <hr />
      <!-- TODO -->
      <!-- <label class="label px-4 py-5 sm:px-6">
        <span>🔖タグ</span>
        <InputChip bind:value={list} name="tags" transitions={true} placeholder="..." readonly={readonly}/>
      </label> -->

      {#if !readonly}
        <button class="btn variant-filled-success">更新</button>
      {/if}
    </form>
    {#if !readonly}
      <button class="btn variant-filled-error" on:click={signOut}>ログアウト</button>
    {/if}
  </div>
</div>
