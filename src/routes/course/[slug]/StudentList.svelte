<script lang="ts">
    import type { Student } from '$lib/types';
    export let students : Student[];
</script>

<div class="flex flex-col gap-3 align-middle justify-around my-auto mx-4">
    {#each students as student}
        <div class="flex flex-col gap-2">
            <div class="text-l">{student.name}</div>
            <div class="text-sm italic font-light">{student.student_id}</div>
        </div>
    {/each}
</div>