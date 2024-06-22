<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	export let data: PageData;
</script>

<div class="flex h-screen flex-row">
	<div class="bg-primary flex w-1/2 flex-col justify-center p-20 max-sm:hidden">
		<p class="text-primary-foreground flex flex-col gap-2 text-6xl font-bold">
			Welcome
			<br />
			Back!
		</p>
	</div>
	<div class="flex flex-col justify-center p-20 sm:w-1/2">
		<div class="flex flex-col gap-2">
			<p class="text-3xl font-bold">Login</p>
			<small class="text-muted-foreground"
				>Login with your account to get started or create one if you haven't yet.</small
			>
		</div>
		<form action="" class="mt-5 flex flex-col gap-6">
			<div class="flex flex-col gap-4">
				<Label>Email Address</Label>
				<Input type="email" required />
			</div>
			<div class="flex flex-col gap-4">
				<Label>Password</Label>
				<Input type="password" required />
			</div>
			<Button class="w-full" size="lg">Sign in</Button>
		</form>
		<Separator class="mt-5" orientation="horizontal" />

		<Button variant="outline" size="lg" class="mt-5 w-full">
			<div class="mr-2">
				<img width="24" height="24" src="./google_icon.svg" alt="Google Icon" />
			</div>
			<p>Sign up with Google</p>
		</Button>
	</div>
</div>
