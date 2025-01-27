<script>
    import {insertSupportData} from "../../repositories/support.js";

    let name = '';
    let email = '';
    let message = '';
    let formSubmitted = false;
    let isLoading = false;
    let formError = '';

    async function handleSubmit() {
        formSubmitted = false;
        formError = '';

        if (!name || !email || !message) {
            formError = 'Please fill in all required fields.';
            return;
        }

        // Here you would typically send the form data to your backend
        // For this example, we'll just log it and show a success message
        console.log('Form submitted:', { name, email, message });

        insertSupportData(name, email, message, (err) => {
            formError = err;
            isLoading = false;
        },() =>{
            isLoading = false;

            // Reset form fields
            name = '';
            email = '';
            message = '';
            formSubmitted = true;
        });
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
                        <span class="label-text text-black">Name *</span>
                    </label>
                    <input
                            type="text"
                            id="name"
                            bind:value={name}
                            placeholder="Your name"
                            class="input input-bordered"
                            required
                    />
                </div>
                <div class="form-control mt-4">
                    <label for="email" class="label">
                        <span class="label-text text-black">Email *</span>
                    </label>
                    <input
                            type="email"
                            id="email"
                            bind:value={email}
                            placeholder="Your email"
                            class="input input-bordered"
                            required
                    />
                </div>
                <div class="form-control mt-4">
                    <label for="message" class="label">
                        <span class="label-text text-black">Message *</span>
                    </label>
                    <textarea
                            id="message"
                            bind:value={message}
                            placeholder="Your message"
                            class="textarea textarea-bordered h-24"
                            required
                    ></textarea>
                </div>
                {#if formError}
                    <div class="alert alert-error mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{formError}</span>
                    </div>
                {/if}
                {#if formSubmitted}
                    <div class="alert alert-success mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Your message has been sent successfully!</span>
                    </div>
                {/if}
                <div class="form-control mt-6">
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </div>
            </form>
        </div>
    </div>
</div>

