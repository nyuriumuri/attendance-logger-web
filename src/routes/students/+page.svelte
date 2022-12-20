<script lang="ts">
	import { each } from 'svelte/internal';
    import pb from '$lib/pb';
    import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
    import * as mqtt from 'mqtt/dist/mqtt.min';
    import { onMount } from 'svelte';
    export let data: PageData;
    let students = data.students;
    let modal_open = false;
    let new_student_name = "";
    let new_student_id = "";
    let new_student_rfid = "";

    const mqtt_url = 'ws://broker.emqx.io:8083/mqtt'
    let client: mqtt.MqttClient;
    let logging: boolean = false;
    onMount(() => {
        client = mqtt.connect(mqtt_url)
        client.on('connect', () => {
        console.log('connected')
    })
    client.on('message', (topic, message) => {
        if (!logging) return;
        console.log('message received', topic, message.toString())
        const msg = JSON.parse(message.toString());
        console.log(msg)
        new_student_rfid = msg.msg;
    })
       
    client.on('end', () => {
        console.log('disconnected')
    })
    })

    let reader_id = 'orange';
    let subscribed = false;
    const startLogging = () => {
        logging = true;
        client.subscribe('MKOSJVMJGJ/'+reader_id);
        subscribed = true;
    } 
    const stopLogging = () => {
        logging = false;
        client.unsubscribe('MKOSJVMJGJ/'+reader_id);
        subscribed = false;
    } 

  
    const createNewStudent = async() => {
        console.log("Create new student");
        try{
            // send an alert and return if any of the fields are empty
            if (new_student_name == "" || new_student_id == "" || new_student_rfid == ""){
                alert("Please fill out all fields");
                return;
            }
            const record = await pb.collection("student").create({
                name: new_student_name,
                student_id: new_student_id,
                rfid: new_student_rfid,
            })
            // turn record into student type
            const student = {
                id: record.id,
                name: record.name,
                student_id: record.student_id,
            }
            students = [student, ...students ];
            closeModal();
        }catch (e){
            console.log("Error creating new student");
            console.log(e);
        }
    }
    const closeModal = () => {
        modal_open = false;
        new_student_name = "";
        new_student_id = "";
    }
</script>

<div class="flex flex-col min-h-full  bg-gray-900">
    <!-- buton to show add new student form  -->
    <div class="flex items-center justify-center">
        <button  
            on:click={()=>modal_open=true}
            class="flex flex-col w-24 my-10 p-3 hover:bg-blue-500 bg-blue-900 rounded-lg align-middle text-left justify-center cursor-pointer">
            <div class="text-l font-bold text-slate-300 w-full flex h-full text-center align-middle justify-center items-center">
                <p>Add New</p>
            </div>
        </button>
    </div>
    <div class="grid grid-cols-2 mx-auto mt-12 gap-5 text-white">
        <div class="text-l">Name</div>
        <div class="text-sm italic font-light">Student ID</div>
        {#each students as student}
                
                     <div class="text-l">{student.name}
                    </div>
                
                <div class="text-sm italic font-light">{student.student_id}</div>
        {/each}
    </div>
</div>

<!-- 
    Modal for adding a new student
 -->
 {#if modal_open}
 <div  class="min-h-screen w-full fixed z-20 top-0" transition:fade >
    <div  on:click={closeModal} 
    on:keydown={(e) => { e.stopPropagation()
        if (e.key === 'Escape') {
            closeModal()
        }
     }
    } 
    class="w-full min-h-screen bg-slate-600 opacity-50 z-[19]"></div>
    <div class="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-slate-900 rounded-lg shadow-lg">
        <form on:submit|preventDefault class="flex flex-col items-center justify-center p-4">
            <div class="text-2xl font-bold text-slate-300">Add New Student</div>
            <div class="flex flex-row text-white items-center justify-center gap-4 mt-4">
                <label class="font-bold">
                    Reader Id
                    <input type="text" class="bg-slate-600 p-1 ml-4 font-normal rounded-lg" bind:value={reader_id} disabled={subscribed} /> 
                </label>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" on:click={subscribed?  stopLogging : startLogging }>{subscribed? "Stop Logging" : "Start Logging"}</button>
            </div>
            <div class="flex flex-col w-full mt-2 gap-2">
                <label class="text-slate-300 mx-2" for="student-id-input">ID</label>
                <input autofocus id="student-id-input" bind:value={new_student_id} class="bg-slate-800 text-slate-300 rounded-lg p-2" type="text" />
            
            </div>
            <div class="flex flex-col w-full mt-2 gap-2">
                <label class="text-slate-300 mx-2" for="student-rfid-input">RFID</label>
                <input id="student-rfid-input" bind:value={new_student_rfid} class="bg-slate-800 text-slate-300 rounded-lg p-2" type="text" />
            
            </div>
            <div class="flex flex-col w-full my-4 gap-2">
                <label class="text-slate-300 mx-2" for="student-name-input">Name</label>
                    <input id="student-name-input" bind:value={new_student_name} class="bg-slate-800 text-slate-300 rounded-lg p-2" type="text" />
            </div>
            <div class="flex flex-row w-full justify-end">
                <button type="submit" on:click={createNewStudent} class="bg-blue-900 hover:bg-blue-500 text-slate-300 rounded-lg p-2">Add Student</button>
            </div>
        </form>
    </div>
</div>

{/if}