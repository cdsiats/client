<script>
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Bell from 'lucide-svelte/icons/bell';
</script>

<nav class="flex justify-between px-20 py-6">
	<a class="text-3xl font-bold" href="/student">I-<span class="text-green-500">hub</span></a>
	<ul class="flex items-center justify-center gap-6">
		<li>
			<a href="/student">Home</a>
		</li>
		<li>
			<a href="/student/partners">Partners</a>
		</li>
		<li>
			<a href="/student/learn">Learn</a>
		</li>
	</ul>
	<div class="flex gap-4">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button variant="outline" size="icon">
					<Bell size="16" />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Notifications</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<Avatar.Root>
			<Avatar.Fallback>CD</Avatar.Fallback>
		</Avatar.Root>
	</div>
</nav>
<slot />
