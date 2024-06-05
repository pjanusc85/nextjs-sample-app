
import Breadcrumbs from "./components/Breadcrumbs";
import MyButton from "./components/MyButton";
import Nav from "./components/Nav";
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation'; // Import useNavigation instead of useRouter
import { cookies } from 'next/headers'

export default function Home() {
  const items = [
    { label: 'Home', href: '/' },
  ];

  return (
    <>
      <Breadcrumbs items={items}/>
      <p>Lorem ipsum dolor sit amet, consectetur adipisci.</p>
      <MyButton/>
    </>
  );
}
