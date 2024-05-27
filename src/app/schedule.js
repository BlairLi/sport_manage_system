import { getUsers } from '@/lib/db';
import { UsersTable } from './users-table';
import { Search } from './search';


export default async function Schedule({ searchParams }) {
    const search = searchParams.q ?? '';
    const offset = searchParams.offset ?? 0;
    const { users, newOffset } = await getUsers(search, Number(offset));

    return (
        <>
            <div className="section">
                <div className="title">Schedule</div>
            </div>
            <Search value={searchParams.q} />
            <UsersTable users={users} offset={newOffset} />
        </>
    )
}