import Link from "next/link";

type Hobby = {
  id: number;
  title: string;
};

export async function generateStaticParams() {
  const hobbies: Hobby[] = await fetch(
    "http://localhost:3000/api/hobbies/all"
  ).then((res) => res.json());
  return hobbies.map((hobby) => ({
    id: String(hobby.id),
  }));
}

export default async function HobbyPage({
  params,
}: {
  params: Promise<{ hobbyId: string }>;
}) {
  const id = (await params).hobbyId;
  const response = await fetch(`http://localhost:3000/api/hobbies/${id}`);
  const json: Hobby = await response.json();

  return (
    <div>
      <h1>Hobby Page : {json.title}</h1>
      <Link href={"/hobby/1"}>___1</Link>
      <Link href={"/hobby/2"}>___2</Link>
      <Link href={"/hobby/3"}>___3</Link>
    </div>
  );
}
