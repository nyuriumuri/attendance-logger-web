<script lang="ts">
    import type {PageData} from './$types';
    import StudentDisplay from './StudentDisplay.svelte';
    import type {Student} from '$lib/types';
    import pb from '$lib/pb';
    import { onMount } from 'svelte';
    import * as mqtt from 'mqtt/dist/mqtt.min';
    import dayjs from 'dayjs';
    export let data: PageData;
    let students = data.students as Student[];
    const mqtt_url = 'ws://broker.emqx.io:8083/mqtt'
    let client: mqtt.MqttClient;

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
        const student = students.find(s => s.rfid == msg.msg);
        if (student) {
           if(!student.attended) {
               student.attended = true;
              pb.collection("attendance").update(data.id as string, {
                  attended_students: students.filter(s => s.attended).map(s => s.id)
              }).catch(err => console.log(err));
              students =[...students]
              console.log(students)
           }
        }
    })
    client.on('end', () => {
        console.log('disconnected')
    })
    })

    const killMQTT = () => {
        client.end();
    }

    const isClientConnected = () => {
        console.log(client.connected);
    }

    $: attended_students = students.filter(s => s.attended).map(s => s.id);
    const date = dayjs(data.date).format('dddd M/D/YYYY h:mm A');
    let logging = false;
    let reader_id = '1';
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
    
</script>

<div class="flex flex-row justify-center gap-10">
    <a href={`/course/${data.course?.id}`}>
        <h1 class="text-xl text-white hover:text-blue-400">{data.course?.name}</h1>
    </a>
    <h2 class="text-xl text-slate-200 italic">{date}</h2>
</div>
<div class="flex flex-row text-white items-center justify-center gap-4 mt-4">
    <label class="font-bold">
        Reader Id
        <input type="text" class="bg-slate-600 p-1 ml-4 font-normal rounded-lg" bind:value={reader_id} disabled={subscribed} /> 
    </label>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" on:click={subscribed?  stopLogging : startLogging }>{subscribed? "Stop Logging" : "Start Logging"}</button>
</div>
<div class="flex w-full items-center justify-center gap-4 my-4">
        {#each students as student}
                <StudentDisplay student={student} />
        {/each}
</div>