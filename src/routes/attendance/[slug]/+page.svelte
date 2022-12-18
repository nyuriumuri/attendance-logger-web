<script lang="ts">
    import type {PageData} from './$types';
    import StudentDisplay from './StudentDisplay.svelte';
    import type {Student} from '$lib/types';
    import pb from '$lib/pb';
    import { onMount } from 'svelte';
    import * as mqtt from 'mqtt/dist/mqtt.min';
    export let data: PageData;
    let students = data.students as Student[];
   
    const mqtt_url = 'ws://broker.emqx.io:8083/mqtt'
    let client: mqtt.MqttClient;

    onMount(() => {
        client = mqtt.connect(mqtt_url)
        client.on('connect', () => {
        console.log('connected')
        client.subscribe('MKOSJVMJGJ/1')
    })
    client.on('message', (topic, message) => {
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

    
</script>

<h1 class="text-xl">{data.course?.name}</h1>
<button on:click={killMQTT}>kill</button>
<button on:click={isClientConnected}>is connected</button>
<ul>
    {#each students as student}
        <li>
            <div class={`h4 ${attended_students.includes(student.id)? "text-blue-400" : "text-red-500" }`}>{student.name}</div>
        </li>
    {/each}
</ul>