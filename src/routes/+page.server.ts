import pb from '$lib/pb';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad} from './$types';
import type { Course } from '$lib/types';
 
export const load = (async ({ params }) => {
  // load all courses from pocketbase
 // you can also fetch all records at once via getFullList
const records = await pb.collection('course').getFullList(200 /* batch size */, {
  sort: '-created',
});

// map the records to a Course type
const courses: Course[] = records.map((record) => ({
  id: record.id,
  code: record.code,
  name: record.name,
}));

// return the courses as the page data
return {

    courses,

};
}) satisfies PageServerLoad;