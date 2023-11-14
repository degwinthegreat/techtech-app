<script>
	import '../app.postcss';

	// Font Awesome
	import '@fortawesome/fontawesome-free/css/fontawesome.css';
	import '@fortawesome/fontawesome-free/css/brands.css';
	import '@fortawesome/fontawesome-free/css/solid.css';
	import { AppBar, AppShell, Avatar, LightSwitch } from '@skeletonlabs/skeleton'
	import { page } from '$app/stores'
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead"><a href="/">Tech Tech App</a></svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $page.data.session?.user}
					<a href="/users">ユーザー一覧</a>
					<a href={"/users/" + $page.data.session.user.id}>
						<Avatar
							src={$page.data.session.user.image}
							border="border-4 border-surface-300-600-token hover:!border-primary-500"
							cursor="cursor-pointer"
							width="w-12"
						/>
					</a>
				{:else}
					<a href="/sign_in" class="btn">ログイン</a>
				{/if}
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<main>
		<slot />
	</main>

	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<footer>
	</footer>
	<!-- (footer) -->
</AppShell>

<style>
</style>
