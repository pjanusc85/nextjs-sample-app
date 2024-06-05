import Breadcrumbs from "../components/Breadcrumbs";


export default function About() {


  const items = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ];

  return (
    <>
      <Breadcrumbs items={items}/>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</p>
    </>
  );
}
