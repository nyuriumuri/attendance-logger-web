<script lang="ts">
	import { each } from 'svelte/internal';
    import pb from '$lib/pb';
    import type { PageData } from './$types';
	import { goto } from '$app/navigation';
    export let data: PageData;
    const createNewLog = async() => {
        console.log("Create new log");
        const record = await pb.collection("attendance").create({
            date: new Date(),
            course: data.course_id
        })
        await goto(`/attendance/${record.id}`);
    }
</script>

<div class="flex flex-row min-h-screen">
    <div class="flex flex-col gap-3 align-middle justify-around my-auto mx-4">
        {#each data.students as student}
            <div class="flex flex-col gap-2">
                <div class="text-l">{student.name}</div>
                <div class="text-sm italic font-light">{student.student_id}</div>
            </div>
        {/each}
    </div>

    <div class="grid grid-cols-2 mx-auto mt-12 gap-5">
        <div class="text-l">Date</div>
        <div class="text-sm italic font-light">Students</div>
        {#each data.attendance as attendance}
                <a href={`/attendance/${attendance.id}`}>   
                     <div class="text-l">{attendance.date}
                    </div>
                </a>
                <div class="text-sm italic font-light">{attendance.num_attended}</div>
        {/each}
    </div>
    <button on:click={createNewLog} class="mx-10 bg-slate-400 rounded-lg p-4 my-auto">Create New</button>
</div>