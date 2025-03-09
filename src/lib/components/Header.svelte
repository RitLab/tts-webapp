<script>
    import { page } from '$app/state';
</script>

<header class="navbar bg-base-100 shadow-lg">
    <div class="navbar-start">
        <div class="flex items-center">
            <img src="/RIT.png" alt="Company Logo" class="w-10 h-10 mr-3" />
            <span class="text-xl font-bold">TTS App</span>
        </div>
    </div>
    <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
            <li><a href="/" class="btn btn-ghost" class:btn-active={page.url.pathname === '/'}>TTS</a></li>
            <li><a href="/arrange-audio" class="btn btn-ghost" class:btn-active={page.url.pathname === '/arrange-audio'}>Arrange Audio</a></li>
            <li class="dropdown dropdown-hover dropdown-bottom">
                <label tabindex="0" class="btn btn-ghost m-1">PDF Tools</label>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a href="/pdf-sorter" class:active={page.url.pathname === '/pdf-sorter'}>PDF Sorter</a></li>
                    <li><a href="/pdf-signer" class:active={page.url.pathname === '/pdf-signer'}>PDF Signer</a></li>
                    <li><a href="/verify-pdf" class:active={page.url.pathname === '/verify-pdf'}>Verify PDF</a></li>
                    <li><a href="/pdf-summarizer" class:active={page.url.pathname === '/pdf-summarizer'}>PDF Summarizer</a></li>
                </ul>
            </li>
            <li><a href="/about" class="btn btn-ghost" class:btn-active={page.url.pathname === '/about'}>About</a></li>
            <li><a href="/contact" class="btn btn-ghost" class:btn-active={page.url.pathname === '/contact'}>Contact</a></li>
        </ul>
    </div>
    <div class="navbar-end">
        <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href="/" class:active={page.url.pathname === '/'}>TTS</a></li>
                <li><a href="/arrange-audio" class:active={page.url.pathname === '/arrange-audio'}>Arrange Audio</a></li>
                <li>
                    <a>PDF Tools</a>
                    <ul class="p-2">
                        <li><a href="/pdf-sorter" class:active={page.url.pathname === '/pdf-sorter'}>PDF Sorter</a></li>
                        <li><a href="/pdf-signer" class:active={page.url.pathname === '/pdf-signer'}>PDF Signer</a></li>
                        <li><a href="/verify-pdf" class:active={page.url.pathname === '/verify-pdf'}>Verify PDF</a></li>
                        <li><a href="/pdf-summarizer" class:active={page.url.pathname === '/pdf-summarizer'}>PDF Summarizer</a></li>
                    </ul>
                </li>
                <li><a href="/about" class:active={page.url.pathname === '/about'}>About</a></li>
                <li><a href="/contact" class:active={page.url.pathname === '/contact'}>Contact</a></li>
            </ul>
        </div>
    </div>
</header>

<style>
    /* Custom styles to ensure consistent button height and dropdown positioning */
    :global(.navbar .btn) {
        @apply h-12 min-h-0;
    }

    :global(.dropdown .dropdown-content) {
        @apply top-12;
    }
</style>

