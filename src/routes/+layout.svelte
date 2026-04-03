<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SoftwareChip</title>
</svelte:head>

<div
	class="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8 font-sans selection:bg-[#c8ff00] selection:text-[#1c1c1c] md:px-12 md:py-16"
>
	<nav class="mb-24 flex items-center justify-between border-b border-[#555555] pb-8">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href="/" class="group flex items-center gap-4">
			<img
				src="src\lib\assets\SoftwareChip.png"
				alt="SoftwareChip Logo"
				class="pixelated h-10 w-10"
				style="image-rendering: pixelated;"
			/>
			<span
				class="font-pixel text-[10px] tracking-widest text-[#e8e0d4] uppercase transition-colors group-hover:text-[#c8ff00] md:text-xs"
			>
				SoftwareChip
			</span>
		</a>
		<div
			class="flex items-center gap-6 font-mono text-sm tracking-wide text-[#555555] uppercase md:gap-10"
		>
			<a
				href="https://github.com/softwarechiphq"
				class="transition-colors hover:text-[#c8ff00]"
				target="_blank"
				rel="noopener">Github</a
			>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href="/about" class="transition-colors hover:text-[#c8ff00]">About</a>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href="/blog" class="transition-colors hover:text-[#c8ff00]">Blog</a>
		</div>
	</nav>

	<main class="flex-grow">
		{@render children()}
	</main>

	<footer
		class="mt-32 flex flex-col items-center border-t border-[#555555] pt-8 font-mono text-xs text-[#555555] md:flex-row md:justify-between"
	>
		<div class="mb-4 tracking-widest uppercase md:mb-0">softwarechip.de</div>
		<div class="px-4 text-center tracking-widest uppercase">
			&copy; {new Date().getFullYear()} SoftwareChip
		</div>
		<div class="mt-4 tracking-widest uppercase md:mt-0">Germany</div>
	</footer>
</div>
