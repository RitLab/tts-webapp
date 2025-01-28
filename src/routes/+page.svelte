<script>
    import {createTTSFile} from "../repositories/tts.js";

    let text = '';
    let audioUrl = '';
    let isLoading = false;
    let error = '';
    const maxLength = 1000;
    let selectedLanguage = 'en';

    const languages = [
        {code: 'en', name: 'English'},
        {code: 'id', name: 'Indonesian'},
    ];

    $: remainingChars = maxLength - text.length;

    async function convertToSpeech() {
        isLoading = true;
        error = '';
        audioUrl = '';

        withTimeout(() => {
            createTTSFile(selectedLanguage, text, (err) => {
                error = err
            }, (result) => {
                console.log(result);
                audioUrl = result.data.url;
            })
        }, 5000)
            .then((result) => {console.log("API success: " + result)})
            .catch((err) => {console.log("API error: " + err)})

        isLoading = false;
    }
</script>

<svelte:head>
    <title>Text to Speech Converter</title>
</svelte:head>

<div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center text-black">Text to Speech Converter</h1>
    <div class="card bg-white bg-opacity-90 shadow-xl">
        <div class="card-body">
            <div class="form-control mb-4">
                <label for="language-select" class="label">
                    <span class="label-text text-black">Select Language</span>
                </label>
                <select
                        id="language-select"
                        bind:value={selectedLanguage}
                        class="select select-bordered w-full"
                >
                    {#each languages as language}
                        <option value={language.code}>{language.name}</option>
                    {/each}
                </select>
            </div>

            <div class="form-control mb-4">
                <label for="text-input" class="label">
                    <span class="label-text text-black">Enter text to convert to speech</span>
                </label>
                <textarea
                        id="text-input"
                        bind:value={text}
                        placeholder="Type your text here..."
                        maxlength={maxLength}
                        class="textarea textarea-bordered h-32"
                ></textarea>
                <label class="label">
                    <span class="label-text-alt text-black">{remainingChars} characters remaining</span>
                </label>
            </div>

            <button
                    on:click={convertToSpeech}
                    disabled={!text || isLoading}
                    class="btn btn-primary w-full"
            >
                {#if isLoading}
                    <span class="loading loading-spinner"></span>
                    Converting...
                {:else}
                    Convert to Speech
                {/if}
            </button>

            {#if error}
                <div class="alert alert-error mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>
            {/if}

            {#if audioUrl}
                <div class="mt-6">
                    <h2 class="text-xl font-semibold mb-2">Generated Speech ({selectedLanguage === 'en' ? 'English' : 'Indonesian'})</h2>
                    <audio
                            controls
                            src={audioUrl}
                            class="w-full"
                    >
                        Your browser does not support the audio element.
                    </audio>
                </div>
            {/if}
        </div>
    </div>
</div>

