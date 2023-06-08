<script>
	import '@picocss/pico/css/pico.min.css';
</script>

<header>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/offering">Offering</a></li>
			<li><a href="/answering">Answering</a></li>
		</ul>
	</nav>
</header>

<main>
	<slot />
</main>

<style>
	header,
	main {
		padding: 1rem 2rem;
		max-width: 30rem;
		margin: 0 auto;
	}

	main {
		padding-bottom: 20rem;
	}
</style>
