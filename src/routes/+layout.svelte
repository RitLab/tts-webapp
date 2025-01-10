<script>
    import Header from '$lib/components/Header.svelte';
    import '../app.css';
</script>

<div class="min-h-screen flex flex-col bg-base-200">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
        <div class="bg-base-100 shadow-xl rounded-box p-6">
            <slot />
        </div>
    </main>
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
            <p>Copyright © 2025 - All rights reserved by TTS App</p>
        </div>
    </footer>
</div>

export const prerender = true;