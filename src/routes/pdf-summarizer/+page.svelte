<script>
    import {SummarizePdf} from "../../repositories/pdf.js";
    import {withTimeout} from "$lib/utils/utils.js";

    let file;
    let fileInput;
    let isSummarizing = false;
    let summaryStatus = '';
    let summaryResult = '';

    function handleFileSelect(event) {
        file = event.target.files[0];
        summaryResult = ''; // Clear previous summary when a new file is selected
    }

    async function summarizePdf() {
        if (!file) {
            summaryStatus = 'Please select a PDF file.';
            return;
        }

        isSummarizing = true;
        summaryStatus = 'Summarizing PDF...';
        summaryResult = '';

        withTimeout(() => {
            SummarizePdf(
                file,
                (error) => {
                    console.error('Upload error:', error);
                    summaryStatus = 'Error summarizing PDF. Please try again.';
                },
                (result) => {
                    summaryStatus = 'PDF summarized successfully!';
                    console.log('Upload result:', result);
                    summaryResult = result.data.output;
                }
            )
        }, 5000).then(result => console.log('Upload result:', result)).catch((error) => {console.log('Upload error:', error)});
        isSummarizing = false;
    }

    function resetAll() {
        file = null;
        summaryStatus = '';
        summaryResult = '';
        if (fileInput) {
            fileInput.value = '';
        }
    }
</script>

<svelte:head>
    <title>PDF Summarizer - Text to Speech Converter</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">PDF Summarizer</h1>
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

            {#if file}
                <div class="mb-4">
                    <h2 class="text-lg font-semibold mb-2">Selected File</h2>
                    <p class="text-base-content/80">{file.name}</p>
                </div>
            {/if}

            <div class="mt-4 space-y-4">
                <button
                        class="btn btn-primary w-full"
                        on:click={summarizePdf}
                        disabled={isSummarizing || !file}
                >
                    {#if isSummarizing}
                        <span class="loading loading-spinner"></span>
                        Summarizing...
                    {:else}
                        Summarize PDF
                    {/if}
                </button>
                <button
                        class="btn btn-outline btn-error w-full"
                        on:click={resetAll}
                >
                    Reset All
                </button>
            </div>

            {#if summaryStatus}
                <div class="mt-4 text-center" class:text-success={summaryStatus.includes('successfully')} class:text-error={summaryStatus.includes('Error') || summaryStatus.includes('timed out')}>
                    {summaryStatus}
                </div>
            {/if}

            {#if summaryResult}
                <div class="mt-6">
                    <h2 class="text-xl font-semibold mb-3">Summary</h2>
                    <div class="bg-base-200 p-4 rounded-lg">
                        <p class="whitespace-pre-line">{summaryResult}</p>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

