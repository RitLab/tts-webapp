<script>
    import {flip} from 'svelte/animate';
    import {dndzone} from 'svelte-dnd-action';
    import {PDFDocument} from 'pdf-lib';
    import {JoinPdfFiles} from "../../repositories/tts.js";
    import {withTimeout} from "$lib/utils/utils.js";

    let pdfFiles = [];
    let dragOver = false;
    let isUploading = false;
    let uploadStatus = '';
    let combinedPdfUrl = "";

    async function handleFilesSelect(e) {
        const newFiles = Array.from(e.target.files || e.dataTransfer.files);
        const pdfs = newFiles.filter(file => file.type === 'application/pdf');

        for (let file of pdfs) {
            const id = Date.now() + pdfFiles.length;
            const preview = await generatePDFPreview(file);
            pdfFiles = [...pdfFiles, {id, file, preview}];
        }
    }

    async function generatePDFPreview(file) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pages = pdfDoc.getPages();

        if (pages.length > 0) {
            const newPdf = await PDFDocument.create();
            const [existingPage] = await newPdf.copyPages(pdfDoc, [0]);
            newPdf.addPage(existingPage).scale(0.5,0.5);
            return await newPdf.saveAsBase64({dataUri: true});
        }

        return null;
    }

    function handleDragOver(e) {
        e.preventDefault();
        dragOver = true;
    }

    function handleDragLeave() {
        dragOver = false;
    }

    function handleDrop(e) {
        e.preventDefault();
        dragOver = false;
        handleFilesSelect(e);
    }

    function handleDndConsider(e) {
        pdfFiles = e.detail.items;
    }

    function handleDndFinalize(e) {
        pdfFiles = e.detail.items;
    }

    function removeFile(id) {
        pdfFiles = pdfFiles.filter(file => file.id !== id);
    }

    async function uploadFiles() {
        if (pdfFiles.length === 0) {
            uploadStatus = 'No files to upload.';
            return;
        }

        isUploading = true;
        uploadStatus = 'Uploading files...';

        let dataFiles = [];
        pdfFiles.forEach((file) => {
            dataFiles.push(file.file);
        });

        withTimeout(() => {
            JoinPdfFiles(
                dataFiles,
                (error) => {
                    console.error('Upload error:', error);
                    uploadStatus = 'Error uploading files. Please try again.';
                },
                (result) => {
                    uploadStatus = 'Files uploaded successfully!';
                    console.log('Upload result:', result);
                    combinedPdfUrl = result.data.url;
                }
            )
        }, 5000).then(result => console.log('Upload result:', result)).catch((error) => {console.log('Upload error:', error)});
        isUploading = false;
    }

    function resetAll() {
        pdfFiles = [];
        dragOver = false;
        isUploading = false;
        uploadStatus = '';
        combinedPdfUrl = '';
    }
</script>

<svelte:head>
    <title>PDF Sorter - Text to Speech Converter</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">PDF Sorter</h1>
    <div class="card bg-white bg-opacity-90 shadow-xl">
        <div class="card-body">
            <div
                    class="border-dashed border-2 border-gray-300 rounded-lg p-8 text-center mb-4"
                    class:bg-blue-100={dragOver}
                    on:dragover={handleDragOver}
                    on:dragleave={handleDragLeave}
                    on:drop={handleDrop}
            >
                <input
                        type="file"
                        id="file-upload"
                        class="hidden"
                        multiple
                        accept=".pdf,application/pdf"
                        on:change={handleFilesSelect}
                />
                <label for="file-upload" class="cursor-pointer">
                    <div class="text-lg mb-2">Drag and drop PDF files here</div>
                    <div class="text-sm text-gray-500">or click to select files</div>
                </label>
            </div>

            {#if pdfFiles.length > 0}
                <div use:dndzone={{items: pdfFiles}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
                    {#each pdfFiles as {id, file, preview} (id)}
                        <div animate:flip={{duration: 300}}
                             class="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-2">
                            <div class="flex items-center w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 cursor-move" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                                <span class="mr-4 flex-grow">{file.name}</span>
                                {#if preview}
                                    <iframe src={preview || "/placeholder.svg"} title="PDF Preview"
                                            class="h-24 w-auto object-contain bg-white"> </iframe>
                                {:else}
                                    <div class="h-24 w-24 bg-gray-200 flex items-center justify-center text-gray-500">
                                        No preview
                                    </div>
                                {/if}
                            </div>
                            <button class="btn btn-ghost btn-circle btn-sm ml-2" on:click={() => removeFile(id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fill-rule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                    {/each}
                </div>
                <div class="mt-4 space-y-4">
                    <button
                            class="btn btn-primary w-full"
                            on:click={uploadFiles}
                            disabled={isUploading}
                    >
                        {#if isUploading}
                            <span class="loading loading-spinner"></span>
                            Uploading...
                        {:else}
                            Upload Files to API
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
                    <div class="mt-4 text-center" class:text-green-600={uploadStatus.includes('successfully')} class:text-red-600={uploadStatus.includes('Error')}>
                        {uploadStatus}
                    </div>
                {/if}
                {#if combinedPdfUrl}
                    <div class="mt-4 p-4 bg-green-100 rounded-lg">
                        <p class="text-green-800 mb-2">Your joined PDF is ready!</p>
                        <div class="flex items-center justify-between">
                            <a href={combinedPdfUrl} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline truncate flex-grow">
                                {combinedPdfUrl}
                            </a>
                            <a href={combinedPdfUrl} target="_blank" download="joined_pdf.pdf" class="btn btn-primary ml-4">
                                Download
                            </a>
                        </div>
                    </div>
                {/if}
            {:else}
                <p class="text-center text-gray-500">No files uploaded yet.</p>
            {/if}
        </div>
    </div>
</div>

