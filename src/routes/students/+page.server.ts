import pb from '$lib/pb';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad} from './$types';
import type { Student } from '$lib/types';
 
export const load = (async ({ params }) => {
  // load all courses from pocketbase
 // you can also fetch all records at once via getFullList
const records = await pb.collection('student').getFullList(200 /* batch size */, {
  sort: 'student_id',
});

// map the records to a Course type
const students: Student[] = records.map((record) => ({
  id: record.id,
  student_id: record.student_id,
  name: record.name,
}));

// return the courses as the page data
return {

    students,

};
}) satisfies PageServerLoad;