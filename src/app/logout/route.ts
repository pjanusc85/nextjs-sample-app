import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
    const cookieStore = cookies();
    cookieStore.delete('loggedIn');
    return redirect('/');
  }