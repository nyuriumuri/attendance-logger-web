<script lang="ts">
    import type { Student } from "$lib/types";
    export let student : Student;
    const attendedStyle = " bg-green-400";
    const absentStyle = " bg-red-500";
    const commonStyle = "h4 text-white text-center p-4 rounded-lg m-2 font-bold flex justify-center items-center";
    $: style = student.attended ? commonStyle+attendedStyle : commonStyle+absentStyle;
</script>

<div class={style}>{student.name}</div>

