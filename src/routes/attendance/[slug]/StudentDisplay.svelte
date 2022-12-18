<script lang="ts">
    import type { Student } from "$lib/types";
    export let student : Student;
    export let checked: boolean | undefined;
</script>

<label class="inline-flex items-center">
    <input type="checkbox" class="form-checkbox" disabled bind:checked={checked} />
    <span class="ml-2">{student.name}</span>
</label>