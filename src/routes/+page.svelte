<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>
  
<div class="grid grid-cols-4">
	{#each data.courses as course}
		<div class="flex flex-row">
            <div class="flex flex-col">
                <h1 class='h1'>{course.code}</h1>
                <p>{course.name}</p>
            </div>
            <a href={'/course/'+course.id}>
                Go
            </a>
        </div>
	{/each}
</div>