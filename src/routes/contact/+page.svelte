<script>
    let name = '';
    let email = '';
    let message = '';

    function handleSubmit() {
        // Handle form submission (e.g., send to an API)
        console.log('Form submitted:', { name, email, message });
        // Reset form fields
        name = '';
        email = '';
        message = '';
    }
</script>

<svelte:head>
    <title>Contact - Text to Speech Converter</title>
</svelte:head>

<div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center text-black">Contact Us</h1>
    <div class="card bg-white bg-opacity-90 shadow-xl">
        <div class="card-body">
            <form on:submit|preventDefault={handleSubmit}>
                <div class="form-control">
                    <label for="name" class="label">
                        <span class="label-text text-black">Name</span>
                    </label>
                    <input type="text" id="name" bind:value={name} placeholder="Your name" class="input input-bordered" required />
                </div>
                <div class="form-control">
                    <label for="email" class="label">
                        <span class="label-text text-black">Email</span>
                    </label>
                    <input type="email" id="email" bind:value={email} placeholder="Your email" class="input input-bordered" required />
                </div>
                <div class="form-control">
                    <label for="message" class="label">
                        <span class="label-text text-black">Message</span>
                    </label>
                    <textarea id="message" bind:value={message} placeholder="Your message" class="textarea textarea-bordered h-24" required></textarea>
                </div>
                <div class="form-control mt-6">
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </div>
            </form>
        </div>
    </div>
</div>

