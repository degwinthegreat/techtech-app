<script>
	import '../app.postcss';
	import { AppBar, AppShell, Avatar, LightSwitch } from '@skeletonlabs/skeleton'
	import tamamushiIcon from '$lib/images/tamamushi_icon.jpg'
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">Tech Tech App</svelte:fragment>
			<svelte:fragment slot="trail">
				<Avatar
					src={tamamushiIcon}
					border="border-4 border-surface-300-600-token hover:!border-primary-500"
					cursor="cursor-pointer"
					width="w-12"
				/>
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
