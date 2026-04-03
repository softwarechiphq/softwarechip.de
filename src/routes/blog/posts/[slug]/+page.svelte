<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDisplayDate(date: string): string {
		const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(date.trim());
		if (!match) {
			return date;
		}

		const day = Number(match[1]);
		const month = Number(match[2]);
		const year = Number(match[3]);
		return new Date(year, month - 1, day).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="space-y-12">
	<!-- Header -->
	<header
		class="max-w-4xl border-l-[4px] border-[#555555] py-2 pl-6 transition-colors duration-500 hover:border-[#c8ff00] md:pl-8"
	>
		<h1 class="font-slab mb-4 text-4xl text-[#e8e0d4] md:text-5xl">
			{data.title}
		</h1>
		<div class="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
			<time class="font-mono text-xs tracking-wider text-[#555555] uppercase">
				{formatDisplayDate(data.date)}
			</time>
			{#if data.tags.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each data.tags as tag (tag)}
						<span class="rounded bg-[#2a2a2a] px-2 py-1 font-mono text-xs text-[#555555]">
							#{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>
	</header>

	<!-- Post Content -->
	<article class="prose max-w-3xl prose-invert">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<div class="font-sans text-base leading-[1.8] text-[#e8e0d4] md:text-lg">{@html data.html}</div>
	</article>

	<!-- Back Link -->
	<div class="mt-16 border-t border-[#555555] pt-8">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href="/blog" class="font-mono text-sm text-[#555555] transition-colors hover:text-[#c8ff00]">
			← Back to Blog
		</a>
	</div>
</div>
