<script>
    import {SignPdfFile} from "../../repositories/pdf.js";
    import {withTimeout} from "$lib/utils/utils.js";

    let file;
    let signatureKey = '';
    let isUploading = false;
    let uploadStatus = '';
    let signedPdfUrl = '';
    let fileInput; // Added: bind the file input element

    function handleFileSelect(event) {
        file = event.target.files[0];
    }

    async function uploadAndSignPdf() {
        if (!file) {
            uploadStatus = 'Please select a PDF file.';
            return;
        }

        if (!signatureKey.trim()) {
            uploadStatus = 'Please enter a signature key.';
            return;
        }

        isUploading = true;
        uploadStatus = 'Uploading and signing PDF...';
        signedPdfUrl = '';

        withTimeout(() => {
            SignPdfFile(
                file,
                signatureKey,
                (error) => {
                    console.error('Upload error:', error);
                    uploadStatus = 'Error uploading and signing PDF. Please try again.';
                },
                (result) => {
                    uploadStatus = 'PDF uploaded and signed successfully!';
                    console.log('Upload result:', result);
                    signedPdfUrl = result.data.url;
                }
            )
        }, 5000).then(result => console.log('Upload result:', result)).catch((error) => {console.log('Upload error:', error)});
        isUploading = false;
    }

    function resetAll() {
        file = null;
        signatureKey = '';
        uploadStatus = '';
        signedPdfUrl = '';
        if (fileInput) { // Updated: reset the file input
            fileInput.value = '';
        }
    }
</script>

<svelte:head>
    <title>PDF Signer - Text to Speech Converter</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center text-black">PDF Signer</h1>
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
                <label for="signature-key" class="block text-sm font-medium mb-2">Signature Key</label>
                <input
                        type="text"
                        id="signature-key"
                        bind:value={signatureKey}
                        placeholder="Enter signature key"
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
                        on:click={uploadAndSignPdf}
                        disabled={isUploading || !file}
                >
                    {#if isUploading}
                        <span class="loading loading-spinner"></span>
                        Uploading and Signing...
                    {:else}
                        Upload and Sign PDF
                    {/if}
                </button>
                <button
                        class="btn btn-outline btn-error w-full"
                        on:click={resetAll}
                >
                    Reset All
                </button>
            </div>

            {#if uploadStatus}
                <div class="mt-4 text-center" class:text-success={uploadStatus.includes('successfully')}
                     class:text-error={uploadStatus.includes('Error') || uploadStatus.includes('timed out')}>
                    {uploadStatus}
                </div>
            {/if}

            {#if signedPdfUrl}
                <div class="mt-4 p-4 bg-success/20 rounded-lg">
                    <p class="text-success mb-2">Your signed PDF is ready!</p>
                    <div class="flex items-center justify-between">
                        <a href={signedPdfUrl} target="_blank" rel="noopener noreferrer"
                           class="text-primary hover:underline truncate flex-grow">
                            {signedPdfUrl}
                        </a>
                        <a href={signedPdfUrl} download="signed_pdf.pdf" class="btn btn-primary btn-sm ml-4">
                            Download
                        </a>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

