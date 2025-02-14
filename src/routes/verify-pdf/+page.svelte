<script>
    import {VerifyPdfFile} from "../../repositories/pdf.js";
    import {withTimeout} from "$lib/utils/utils.js";

    let file;
    let verificationKey = '';
    let isVerifying = false;
    let verificationStatus = '';
    let fileInput; // Added: bind the file input element

    function handleFileSelect(event) {
        file = event.target.files[0];
    }

    async function verifyPdf() {
        if (!file) {
            verificationStatus = 'Please select a PDF file.';
            return;
        }

        if (!verificationKey.trim()) {
            verificationStatus = 'Please enter a verification key.';
            return;
        }

        isVerifying = true;
        verificationStatus = 'Verifying PDF...';

        withTimeout(() => {
            VerifyPdfFile(
                file,
                verificationKey,
                (error) => {
                    console.error('Verify error:', error);
                    verificationStatus = 'Error verifying PDF. Please try again.';
                },
                (result) => {
                    verificationStatus = 'PDF is valid!';
                    console.log('Verify result:', result);
                }
            )
        }, 5000).then(result => console.log('Verify result:', result)).catch((error) => {console.log('Verify error:', error)});
        isVerifying = false;
    }

    function resetAll() {
        file = null;
        verificationKey = '';
        verificationStatus = '';
        if (fileInput) { // Updated: reset the file input
            fileInput.value = '';
        }
    }
</script>

<svelte:head>
    <title>Verify PDF - Text to Speech Converter</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center text-black">Verify PDF</h1>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="mb-4">
                <label for="file-upload" class="block text-sm font-medium mb-2">Upload PDF</label>
                <input
                        bind:this={fileInput}
                        type="file"
                        id="file-upload"
                        accept=".pdf,application/pdf"
                        on:change={handleFileSelect}
                        class="file-input file-input-bordered w-full"
                />
            </div>

            <div class="mb-4">
                <label for="verification-key" class="block text-sm font-medium mb-2">Verification Key</label>
                <input
                        type="text"
                        id="verification-key"
                        bind:value={verificationKey}
                        placeholder="Enter verification key"
                        class="input input-bordered w-full"
                />
            </div>

            {#if file}
                <div class="mb-4">
                    <h2 class="text-lg font-semibold mb-2">Selected File</h2>
                    <p class="text-base-content/80">{file.name}</p>
                </div>
            {/if}

            <div class="mt-4 space-y-4">
                <button
                        class="btn btn-primary w-full"
                        on:click={verifyPdf}
                        disabled={isVerifying || !file}
                >
                    {#if isVerifying}
                        <span class="loading loading-spinner"></span>
                        Verifying...
                    {:else}
                        Verify PDF
                    {/if}
                </button>
                <button
                        class="btn btn-outline btn-error w-full"
                        on:click={resetAll}
                >
                    Reset All
                </button>
            </div>

            {#if verificationStatus}
                <div class="mt-4 text-center" class:text-success={verificationStatus.includes('valid')} class:text-error={verificationStatus.includes('not valid') || verificationStatus.includes('Error') || verificationStatus.includes('timed out')}>
                    {verificationStatus}
                </div>
            {/if}
        </div>
    </div>
</div>

