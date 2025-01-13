<script>
    import Header from '$lib/components/Header.svelte';
    import '../app.css';
</script>

<div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 to-purple-500">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
        <div class="p-6">
            <slot />
        </div>
    </main>
    <footer class="footer footer-center p-4 bg-blue-600 text-white">
        <div>
            <p>Copyright © 2025 - All rights reserved by Ritlabs App</p>
        </div>
    </footer>
</div>
