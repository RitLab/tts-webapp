<script>
   import { flip } from 'svelte/animate';
    import { dndzone } from 'svelte-dnd-action';
    import {JoinMp3Files} from "../../repositories/tts.js";
    import {withTimeout} from "$lib/utils/utils.js";

    let files = [];
    let dragOver = false;
    let isUploading = false;
    let uploadStatus = '';
    let combinedAudioUrl = "";

    function handleFilesSelect(e) {
        const newFiles = Array.from(e.target.files || e.dataTransfer.files);
        const mp3Files = newFiles.filter(file => file.type === 'audio/mpeg');
        files = [...files, ...mp3Files.map((file, index) => ({ id: Date.now() + index, file }))];
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
        files = e.detail.items;
    }

    function handleDndFinalize(e) {
        files = e.detail.items;
    }

    function removeFile(id) {
        files = files.filter(file => file.id !== id);
    }

    async function uploadFiles() {
        if (files.length === 0) {
            uploadStatus = 'No files to upload.';
            return;
        }

        isUploading = true;
        uploadStatus = 'Uploading files...';

        let dataFiles = [];
        files.forEach((file) => {
            dataFiles.push(file.file);
        });

        withTimeout(() => {
            JoinMp3Files(
                dataFiles,
                (error) => {
                    console.error('Upload error:', error);
                    uploadStatus = 'Error uploading files. Please try again.';
                },
                (result) => {
                    uploadStatus = 'Files uploaded successfully!';
                    console.log('Upload result:', result);
                    combinedAudioUrl = result.data.url;
                }
            )
        }, 5000)
            .then(result => console.log("Upload successfully: " + result))
            .catch(error => console.error("Upload error: " + error));
        isUploading = false;
    }

    function resetAll() {
        files = [];
        dragOver = false;
        isUploading = false;
        uploadStatus = '';
        combinedAudioUrl = '';
    }
</script>

<svelte:head>
    <title>Arrange Audio Files - Text to Speech Converter</title>
</svelte:head>

<div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center text-black">Arrange Audio Files</h1>
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
                        accept=".mp3,audio/mpeg"
                        on:change={handleFilesSelect}
                />
                <label for="file-upload" class="cursor-pointer">
                    <div class="text-lg mb-2">Drag and drop MP3 files here</div>
                    <div class="text-sm text-gray-500">or click to select files</div>
                </label>
            </div>

            {#if files.length > 0}
                <div use:dndzone={{items: files}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
                    {#each files as {id, file} (id)}
                        <div animate:flip={{duration: 300}} class="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-2">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 cursor-move" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <span>{file.name}</span>
                            </div>
                            <button class="btn btn-ghost btn-circle btn-sm" on:click={() => removeFile(id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    {/each}
                </div>
                {#if files.length > 1}
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
                    </div>
                    {/if}
                {#if uploadStatus}
                    <div class="mt-4 text-center" class:text-green-600={uploadStatus.includes('successfully')} class:text-red-600={uploadStatus.includes('Error')}>
                        {uploadStatus}
                    </div>
                {/if}
            {:else}
                <p class="text-center text-black">No files uploaded yet.</p>
            {/if}
            {#if combinedAudioUrl}
                <div class="mt-6">
                    <h2 class="text-xl font-semibold mb-2">Combined Audio</h2>
                    <audio
                            controls
                            src={combinedAudioUrl}
                            class="w-full"
                    >
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <button
                        class="btn btn-outline btn-error w-full"
                        on:click={resetAll}
                >
                    Reset All
                </button>
            {/if}
        </div>
    </div>
</div>

<style>
    /* Add any component-specific styles here */
</style>

