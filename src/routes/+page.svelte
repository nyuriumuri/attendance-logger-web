<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    import CourseCard from './CourseCard.svelte';
    import pb from '$lib/pb';
    import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
    // variables to hold modal form data
    let course_code: string;
    let course_name: string;
    // modal state
    let modal_open: boolean = false;
    // function to add new course
    const addCourse = async () => {
        // create new course object
        const new_course = {
            code: course_code,
            name: course_name
        }
        // add new course to database
        pb.collection("course").create(new_course)
        .then( async (res) => {
            // get new course id
            const new_course_id = res.id;
            // go to new course page
            await goto(`/course/${new_course_id}`);
        }).catch(err => console.log(err));
        // close modal
        modal_open = false;
    }

    const closeModal = () =>{
        modal_open = false;
        course_code = "";
        course_name = "";
    }
</script>
  
<div class="flex justify-center items-start py-20 bg-gray-900 min-h-full">
    <div class="grid grid-cols-4 w-3/4 grid-flow-col auto-cols-min">
        <div class="flex items-center justify-center">
                <button  
                    on:click={()=>modal_open=true}
                    class="flex flex-col w-52 h-40 p-3 hover:bg-blue-500 bg-blue-900 rounded-lg align-middle text-left justify-center cursor-pointer">
                    <div class="text-xl font-bold text-slate-300 w-full flex h-full text-center align-middle justify-center items-center bg-none border-4 border-dashed border-slate-300">
                        <p>Add New</p>
                    </div>
                </button>
        </div>
        
        {#each data.courses as course}
            <CourseCard  course={course} />
        {/each}
    </div>
</div>


<!-- Modal to add new course
    Inputs:
        Course Code (text)
        Course Name (text)
    Button:
        Add Course (click)
-->
            


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
        <div class="flex flex-col items-center justify-center p-4">
            <div class="text-2xl font-bold text-slate-300">Add New Course</div>
            <div class="flex flex-col w-full mt-2 gap-2">
                <label class="text-slate-300 mx-2" for="course-code-input">Course Code</label>
                <input id="course-code-input" bind:value={course_code} class="bg-slate-800 text-slate-300 rounded-lg p-2" type="text" />
            
            </div>
            <div class="flex flex-col w-full my-4 gap-2">
                <label class="text-slate-300 mx-2" for="course-code-input">Course Name  </label>
                    <input id="course-name-input" bind:value={course_name} class="bg-slate-800 text-slate-300 rounded-lg p-2" type="text" />
            </div>
            <div class="flex flex-row w-full justify-end">
                <button on:click={addCourse} class="bg-blue-900 hover:bg-blue-500 text-slate-300 rounded-lg p-2">Add Course</button>
            </div>
        </div>
    </div>
</div>
{/if}