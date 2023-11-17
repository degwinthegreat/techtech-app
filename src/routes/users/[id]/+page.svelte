<script lang="ts">
  import { signOut } from '@auth/sveltekit/client';
  import noImage from '$lib/images/noImage.jpg'
  export let data
  const user = data.user
  const readonly = data.readonly

  const handleFileUpload = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			const getPresignedUrlResponse = await fetch('/api/upload', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fileName: file.name,
					fileType: file.type
				})
			});

			if (!getPresignedUrlResponse.ok) {
				console.error('Failed to get presigned URL');
			}

			const { presignedUrl, objectKey } = await getPresignedUrlResponse.json();
      const uploadToR2Response = await fetch(presignedUrl, {
				method: 'PUT',
				headers: {
					'Content-Type': file.type
				},
				body: file
			});

      console.log("event:", e)
      if (!uploadToR2Response.ok) {
        console.error('Failed to upload file to R2');
      }
		}
	};
</script>

<div class="overflow-hidden shadow rounded-lg">
  <div class="px-4 py-5 sm:px-6">
    <form method="POST">
      <label for="image" class="label px-4 py-5 sm:px-6">
        <span>📸プロフィール画像</span>
          <div>
            {#if user.image}
              <img class="h-auto max-w-full rounded-lg" src={user.image} alt="image">
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
        <textarea id="description" name="description" class="textarea" rows="4" placeholder="自己紹介を入力してください." readonly={readonly} value="{user.description}" />
      </label>
      <hr />
      <!-- TODO -->
      <!-- <label class="label px-4 py-5 sm:px-6">
        <span>🔖タグ</span>
        <InputChip bind:value={list} name="tags" transitions={true} placeholder="..." readonly={readonly}/>
      </label> -->
      <button class="btn variant-filled-success">更新</button>
    </form>
    <button class="btn variant-filled-error" on:click={signOut}>ログアウト</button>
  </div>
</div>
