<script lang="ts">
    import type { Course } from '$lib/types';
    export let course: Course;
</script>

<div class="flex items-center justify-center">
    <a href={'/course/'+course.id}>
        <div class="flex flex-col w-52 h-40 p-4 hover:bg-blue-800 bg-blue-500 rounded-lg align-middle text-left justify-center">
            <div class="text-xl font-bold text-slate-300">{course.code}</div>
            <p class=" text-slate-200">{course.name}</p>
        </div>
    </a>
</div>
