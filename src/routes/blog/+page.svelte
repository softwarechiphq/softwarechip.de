<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="space-y-16 md:space-y-24">
	<!-- Header -->
	<header
		class="max-w-4xl border-l-[4px] border-[#555555] py-2 pl-6 transition-colors duration-500 hover:border-[#c8ff00] md:pl-8"
	>
		<h1 class="font-slab mb-4 text-4xl text-[#e8e0d4] md:text-5xl">Blog</h1>
		<p class="font-mono text-sm tracking-wider text-[#555555] uppercase">
			[Writing on Software & Design]
		</p>
	</header>

	<!-- Blog Posts List -->
	<div class="max-w-3xl space-y-12">
		{#if data.posts.length === 0}
			<div class="font-sans text-[#555555]">
				<p>No posts yet. Check back soon.</p>
			</div>
		{:else}
			{#each data.posts as post (post.slug)}
				<article
					class="border-b border-[#555555] pb-12 transition-colors duration-300 hover:border-[#c8ff00]"
				>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href="/blog/posts/{post.slug}" class="group block">
						<h2
							class="font-slab mb-2 text-2xl text-[#e8e0d4] transition-colors group-hover:text-[#c8ff00] md:text-3xl"
						>
							{post.title}
						</h2>
					</a>
					<div class="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
						<time class="font-mono text-xs tracking-wider text-[#555555] uppercase">
							{new Date(post.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</time>
						{#if post.tags.length > 0}
							<div class="flex flex-wrap gap-2">
								{#each post.tags as tag (tag)}
									<span class="rounded bg-[#2a2a2a] px-2 py-1 font-mono text-xs text-[#555555]">
										#{tag}
									</span>
								{/each}
							</div>
						{/if}
					</div>
					<p class="font-sans text-base leading-relaxed text-[#a19e99]">
						{post.excerpt}
					</p>
				</article>
			{/each}
		{/if}
	</div>
</div>
