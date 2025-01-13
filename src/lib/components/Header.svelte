<script>
    import { page } from '$app/state';
</script>

<header class="navbar bg-base-100 shadow-lg">
    <div class="navbar-start">
        <div class="flex items-center">
            <img src="/RIT.png" alt="RITLAB Logo" class="w-12 h-10 mr-3" />
            <span class="text-xl font-bold">Text to Speech</span>
        </div>
    </div>
    <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
            <li><a href="/" class="btn btn-ghost" class:btn-active={page.url.pathname === '/'}>Home</a></li>
            <li><a href="/about" class="btn btn-ghost" class:btn-active={page.url.pathname === '/about'}>About</a></li>
            <li><a href="/contact" class="btn btn-ghost" class:btn-active={page.url.pathname === '/contact'}>Contact</a></li>
        </ul>
    </div>
    <div class="navbar-end">
        <div class="dropdown dropdown-end">
            <label class="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href="/" class:active={page.url.pathname === '/'}>Home</a></li>
                <li><a href="/about" class:active={page.url.pathname === '/about'}>About</a></li>
                <li><a href="/contact" class:active={page.url.pathname === '/contact'}>Contact</a></li>
            </ul>
        </div>
    </div>
</header>

