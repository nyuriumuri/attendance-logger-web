<script lang="ts">
	import { each } from 'svelte/internal';
    import DownloadExcel from './DownloadExcel.svelte';
    import pb from '$lib/pb';
    import type { PageData } from './$types';
	import { goto } from '$app/navigation';
    import StudentList from './StudentList.svelte';
	import type { Student } from '$lib/types';
    import { fade } from 'svelte/transition';
    import dayjs from 'dayjs';
    export let data: PageData;
    const createNewLog = async() => {
        console.log("Create new log");
        const record = await pb.collection("attendance").create({
            date: new Date(),
            course: data.course_id
        })
        await goto(`/attendance/${record.id}`);
    }

    const buttonClass ="bg-blue-900 hover:bg-blue-500 text-slate-200 rounded-lg p-2"
    let modal_open = false;
    let new_student_id = "";
    const closeModal = () => {
        modal_open = false;
        new_student_id = "";
    }

    let students = data.students;
    const addStudent = async() => {
        console.log("Add student");
        try{
            // return if student already exists
            if(students.find(s => s.student_id == new_student_id)) {
                // send window alert
                alert("Student already exists");
                return
            };
            const student_record = await pb.collection('student').getFirstListItem(`student_id=${new_student_id}`);
            // const record = await pb.collection("course").get(data.course_id);
            await pb.collection("student").update(student_record.id, {
                courses: [...student_record.courses, data.course_id]
            })
            const student : Student = {
                id: student_record.id,
                student_id: student_record.student_id,
                name: student_record.name,
            };
            students = [...students, student];
            closeModal();
        }catch (e){
            alert("Invalid Student ID");
            console.log("Error adding student");
            console.log(e);
        }
    }

</script>

<div class="flex flex-row min-h-full text-white">

    <StudentList students={students} />
    <div class="flex flex-col w-3/4 justify-center">
        <div class="flex flex-row gap-4 mx-auto">
            <button on:click={createNewLog} class={buttonClass}>Start New Class</button>
            <button on:click={()=>modal_open=true} class={buttonClass}>Enroll New Student</button>
            <DownloadExcel classId={data.course_id}  />
        </div>
        <div class="grid grid-cols-2 mx-auto mt-12 gap-5">
            <div class="text-l">Date</div>
            <div class="text-sm italic font-light">Num Attended</div>
            {#each data.attendance as attendance}
                    <a href={`/attendance/${attendance.id}`}>
                         <div class="text-l hover:text-blue-400">{dayjs(attendance.date).format('dddd M/D/YYYY h:mm A')}
                        </div>
                    </a>
                    <div class="text-sm italic font-light">{attendance.num_attended}</div>
            {/each}
        </div>
    </div>
  
    
</div>

{#if modal_open}
<div class="min-h-screen w-full fixed z-20 top-0" transition:fade >
    <div  on:click={closeModal} 
    on:keydown={(e) => { e.stopPropagation()
        if (e.key === 'Escape') {
            closeModal()
        }
     }
    } 
    class="w-full min-h-screen bg-slate-600 opacity-50 z-[19]"></div>
    <div class="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-slate-900 rounded-lg shadow-lg">
        <form  on:submit|preventDefault class="flex flex-col items-center justify-center p-4">
            <div class="text-2xl font-bold text-slate-300">Add New Student</div>
            <div class="flex flex-col w-full mt-2 mb-4 gap-2">
                <label class="text-slate-300 mx-2" for="course-code-input">Student ID</label>
                <input autofocus id="course-code-input" bind:value={new_student_id} class="bg-slate-800 text-slate-300 rounded-lg p-2" type="text" />
            
            </div>

            <div class="flex flex-row w-full justify-end">
                <button type="submit" on:click={addStudent} class="bg-blue-900 hover:bg-blue-500 text-slate-300 rounded-lg p-2">Add Student</button>
            </div>
        </form>
    </div>
</div>
{/if}
